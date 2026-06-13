import React, { useState } from 'react';
import { useMedia, MEDIA_ITEMS } from '../context/MediaContext';

export const AdminPage = () => {
  const { media, updateMedia, resetMedia } = useMedia();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Dashboard states
  const [activeTab, setActiveTab] = useState('Home Page');
  const [editValues, setEditValues] = useState({});

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

  const handleUpdate = (key) => {
    const newVal = editValues[key];
    updateMedia(key, newVal);
    alert(`Successfully updated: ${MEDIA_ITEMS.find(i => i.key === key).label}`);
  };

  const handleFileUpload = async (key, file) => {
    try {
      const objectUrl = await updateMedia(key, file);
      setEditValues(prev => ({
        ...prev,
        [key]: objectUrl
      }));
      alert(`Successfully uploaded file: ${file.name}`);
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
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

  const sections = ['Home Page', 'About Page', 'Course Details', 'Student Testimonials', 'Portfolio Gallery'];
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
                            src={currentVal} 
                            muted
                            preload="metadata"
                          />
                          <div className="video-play-overlay">
                            <span>▶</span>
                          </div>
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
