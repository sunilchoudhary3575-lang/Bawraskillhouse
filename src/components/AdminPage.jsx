import React, { useState } from 'react';
import { useMedia, MEDIA_ITEMS } from '../context/MediaContext';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

export const AdminPage = () => {
  const { media, updateMedia, resetMedia } = useMedia();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Dashboard states
  const [activeTab, setActiveTab] = useState('Home Page');
  const [editValues, setEditValues] = useState({});
  const [videoDurations, setVideoDurations] = useState({});
  
  // Firestore document ID mapping state
  const [dbDocs, setDbDocs] = useState(() => {
    const initial = {};
    MEDIA_ITEMS.forEach(item => {
      const stored = localStorage.getItem(`firestore_doc_${item.key}`);
      if (stored) {
        initial[item.key] = stored;
      }
    });
    return initial;
  });

  const handleLoadedMetadata = (key, event) => {
    const duration = event.target.duration;
    if (duration && !isNaN(duration)) {
      const mins = Math.floor(duration / 60);
      const secs = Math.floor(duration % 60);
      const formatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      setVideoDurations(prev => ({ ...prev, [key]: formatted }));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin@123') {
      setIsLoggedIn(true);
      setLoginError('');
      // Populate inputs with current values
      const initialEdits = {};
      MEDIA_ITEMS.forEach(item => {
        initialEdits[item.key] = media[item.key] || '';
      });
      setEditValues(initialEdits);
    } else {
      setLoginError('Invalid admin username or password!');
    }
  };

  const handleUpdateData = async (key, updatedUrl) => {
    const docId = dbDocs[key];
    const item = MEDIA_ITEMS.find(i => i.key === key);
    const title = item ? item.label : key;
    const type = item ? item.type : 'image';

    try {
      if (docId) {
        const docRef = doc(db, 'mediaFiles', docId);
        await updateDoc(docRef, {
          title: title,
          url: updatedUrl,
          type: type,
          updatedAt: new Date().toISOString()
        });
      } else {
        const docRef = await addDoc(collection(db, 'mediaFiles'), {
          key: key,
          title: title,
          type: type,
          url: updatedUrl,
          uploadedAt: new Date().toISOString()
        });
        setDbDocs(prev => {
          localStorage.setItem(`firestore_doc_${key}`, docRef.id);
          return { ...prev, [key]: docRef.id };
        });
      }
    } catch (err) {
      console.error('Firestore update failed:', err);
    }
  };

  const handleUpdate = async (key) => {
    const newVal = editValues[key];
    try {
      await updateMedia(key, newVal);
      await handleUpdateData(key, newVal);
      alert(`Successfully updated and saved to Firestore: ${MEDIA_ITEMS.find(i => i.key === key).label}`);
    } catch (err) {
      alert(`Update failed: ${err.message}`);
    }
  };

  const handleFileUpload = async (key, file) => {
    try {
      console.log('Starting upload to Firebase Storage:', file.name);
      const storageRef = ref(storage, `media/${key}_${Date.now()}_${file.name}`);
      
      let uploadResult;
      try {
        uploadResult = await uploadBytes(storageRef, file);
      } catch (storageErr) {
        console.error('Firebase Storage upload failed:', storageErr);
        throw new Error(`Storage Upload failed: ${storageErr.message}. (Make sure Firebase Storage is enabled in Console and rules allow write access)`);
      }

      console.log('Retrieving download URL from Storage...');
      let downloadURL;
      try {
        downloadURL = await getDownloadURL(uploadResult.ref);
      } catch (urlErr) {
        console.error('Failed to get download URL:', urlErr);
        throw new Error(`Failed to get download URL: ${urlErr.message}`);
      }
      
      const item = MEDIA_ITEMS.find(i => i.key === key);
      const title = item ? item.label : key;
      const type = item ? item.type : (file.type.startsWith('image/') ? 'image' : 'video');

      console.log('Saving metadata to Firestore collections...');
      let docRef;
      try {
        docRef = await addDoc(collection(db, 'mediaFiles'), {
          key: key,
          title: title,
          type: type,
          url: downloadURL,
          uploadedAt: new Date().toISOString()
        });
      } catch (firestoreErr) {
        console.error('Firestore document save failed:', firestoreErr);
        throw new Error(`Firestore save failed: ${firestoreErr.message}. (Make sure Firestore Database is enabled and rules allow write access)`);
      }

      setDbDocs(prev => {
        localStorage.setItem(`firestore_doc_${key}`, docRef.id);
        return { ...prev, [key]: docRef.id };
      });

      await updateMedia(key, downloadURL);
      setEditValues(prev => ({
        ...prev,
        [key]: downloadURL
      }));
      alert(`Successfully uploaded file and saved to Firestore: ${file.name}`);
    } catch (err) {
      console.error('Upload process failed:', err);
      alert(err.message);
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to revert all photos and videos to default settings?')) {
      resetMedia();
      const resetEdits = {};
      MEDIA_ITEMS.forEach(item => {
        resetEdits[item.key] = item.default;
      });
      setEditValues(resetEdits);
      alert('All photos and videos have been reset to default values.');
    }
  };

  const handleInputChange = (key, value) => {
    setEditValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const sections = ['Home Page', 'About Page', 'Course Details', 'Student Testimonials'];
  const filteredItems = MEDIA_ITEMS.filter(item => item.section === activeTab);

  return (
    <div className={`admin-page-container ${isLoggedIn ? 'logged-in' : 'logged-out'}`}>
      {!isLoggedIn ? (
        /* ================= LIGHT LOGIN CARD ================= */
        <div className="login-card-bright">
          <div className="login-header-bright">
            <span className="login-badge-bright">🔒 Security Center</span>
            <h2>Admin Portal</h2>
            <p>Log in to configure website photos and videos.</p>
          </div>

          {loginError && (
            <div className="login-error-bright">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form-bright">
            <div className="login-form-group">
              <label>Username</label>
              <input
                type="text"
                required
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="login-form-group">
              <label>Password</label>
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="login-submit-btn-bright">
              Sign In to Panel
            </button>
          </form>
        </div>
      ) : (
        /* ================= LIGHT DASHBOARD INTERFACE ================= */
        <div className="dashboard-card-bright">
          <div className="dashboard-header-bright">
            <div className="dashboard-title-group">
              <h1>Media Manager Dashboard</h1>
              <p>Configure and update all photo and video URLs dynamically.</p>
            </div>
            <div className="dashboard-header-actions">
              <button onClick={handleResetAll} className="dashboard-btn-reset">
                Reset All to Defaults
              </button>
              <button onClick={handleLogout} className="dashboard-btn-logout">
                Sign Out
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="dashboard-tabs-bright">
            {sections.map(sec => (
              <button
                key={sec}
                onClick={() => setActiveTab(sec)}
                className={`dashboard-tab-btn-bright ${activeTab === sec ? 'active' : ''}`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Media Items Editor List */}
          <div className="media-list-bright">
            {filteredItems.map(item => {
              const currentVal = media[item.key] || '';
              const typedVal = editValues[item.key] || '';
              const isChanged = currentVal !== typedVal;

              return (
                <div key={item.key} className="media-card-bright">
                  <div className="media-card-header-bright">
                    <span className="media-card-label">{item.label}</span>
                    <span className={`media-card-type-tag ${item.type}`}>
                      {item.type}
                    </span>
                  </div>

                  <div className="media-card-layout-bright">
                    {/* Media Preview Box */}
                    <div className="preview-thumbnail-bright">
                      {item.type === 'image' ? (
                        <img 
                          src={currentVal} 
                          alt="preview" 
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = '<span class="no-preview-label">No Preview</span>';
                          }}
                        />
                      ) : (
                        <div className="video-preview-wrapper">
                          <video 
                            key={currentVal}
                            src={currentVal} 
                            muted
                            preload="metadata"
                            onLoadedMetadata={(e) => handleLoadedMetadata(item.key, e)}
                          />
                          <div className="video-play-overlay">
                            <span>▶</span>
                          </div>
                          {videoDurations[item.key] && (
                            <span className="video-duration" style={{ fontSize: '0.65rem', padding: '0.1rem 0.3rem', bottom: '5px', right: '5px' }}>
                              {videoDurations[item.key]}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Inputs & Actions */}
                    <div className="control-panel-bright">
                      <div className="input-row-bright">
                        <input
                          type="text"
                          value={typedVal}
                          onChange={(e) => handleInputChange(item.key, e.target.value)}
                          placeholder={item.type === 'image' ? 'https://example.com/image.jpg' : '/my_video.mp4'}
                        />
                        <button
                          onClick={() => handleUpdate(item.key)}
                          disabled={!isChanged}
                          className={`btn-update-link ${isChanged ? 'active' : ''}`}
                        >
                          Update Link
                        </button>
                      </div>

                      {/* Local File Uploader / Device Gallery */}
                      <div className="file-upload-row-bright">
                        <label className="btn-file-upload-bright">
                          {item.type === 'image' ? '🖼️ Choose Image File' : '🎥 Choose Video File'}
                          <input
                            type="file"
                            accept={item.type === 'image' ? 'image/*' : 'video/*'}
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                handleFileUpload(item.key, file);
                              }
                            }}
                          />
                        </label>
                        <span className="file-upload-desc-bright">
                          Select directly from device gallery or files
                        </span>
                      </div>
                      <div className="media-card-meta-bright">
                        <span>
                          <strong>Current:</strong> {currentVal.startsWith('data:') ? 'Local Default Asset' : currentVal}
                        </span>
                        <span>
                          <strong>Default:</strong> {item.default.startsWith('data:') ? 'Local Default Asset' : item.default}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
