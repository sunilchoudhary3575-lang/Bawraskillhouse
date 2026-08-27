import React, { useState, useEffect } from 'react';
import { useMedia } from '../context/MediaContext';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import StudentManagement from './StudentManagement';

export const AdminPage = () => {
  const { media, updateMedia } = useMedia();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Top Section Switcher ('students' or 'options')
  const [mainAdminSection, setMainAdminSection] = useState('students');
  
  // Custom Dynamic Items State (Starts completely empty)
  const [customItems, setCustomItems] = useState(() => {
    const saved = localStorage.getItem('bawra_custom_admin_options');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('All');
  const [editValues, setEditValues] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);

  // New Option Form State
  const [newItem, setNewItem] = useState({
    label: '',
    key: '',
    section: 'General',
    type: 'image',
    value: ''
  });

  // Sync editValues with items
  useEffect(() => {
    const initialEdits = {};
    customItems.forEach(item => {
      initialEdits[item.key] = media[item.key] || item.value || '';
    });
    setEditValues(initialEdits);
    localStorage.setItem('bawra_custom_admin_options', JSON.stringify(customItems));
  }, [customItems, media]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin@123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid admin username or password!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  // Add New Custom Option
  const handleAddNewOption = async (e) => {
    e.preventDefault();
    if (!newItem.label.trim()) {
      alert('Please enter an option label');
      return;
    }

    const generatedKey = newItem.key.trim() 
      ? newItem.key.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_')
      : newItem.label.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');

    if (customItems.some(item => item.key === generatedKey)) {
      alert('An option with this key already exists. Please choose a unique name/key.');
      return;
    }

    const itemToAdd = {
      key: generatedKey,
      label: newItem.label.trim(),
      section: newItem.section.trim() || 'General',
      type: newItem.type,
      value: newItem.value.trim(),
      createdAt: new Date().toISOString()
    };

    const updated = [...customItems, itemToAdd];
    setCustomItems(updated);
    if (newItem.value.trim()) {
      await updateMedia(generatedKey, newItem.value.trim());
    }

    try {
      await addDoc(collection(db, 'adminCustomOptions'), itemToAdd);
    } catch (err) {
      console.warn('Firestore optional save notice:', err);
    }

    setNewItem({ label: '', key: '', section: 'General', type: 'image', value: '' });
    setShowAddModal(false);
    alert(`Successfully added new option: "${itemToAdd.label}"`);
  };

  // Delete Custom Option
  const handleDeleteOption = (key, label) => {
    if (window.confirm(`Are you sure you want to delete "${label}"?`)) {
      const updated = customItems.filter(item => item.key !== key);
      setCustomItems(updated);
      alert(`Deleted option "${label}"`);
    }
  };

  // Update Link/Value
  const handleUpdate = async (key) => {
    const newVal = editValues[key] || '';
    const item = customItems.find(i => i.key === key);
    try {
      await updateMedia(key, newVal);
      const updated = customItems.map(i => i.key === key ? { ...i, value: newVal } : i);
      setCustomItems(updated);
      alert(`Successfully updated value for "${item ? item.label : key}"`);
    } catch (err) {
      alert(`Update failed: ${err.message}`);
    }
  };

  // File Upload
  const handleFileUpload = async (key, file) => {
    try {
      const storageRef = ref(storage, `custom_admin/${key}_${Date.now()}_${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      await updateMedia(key, downloadURL);
      setEditValues(prev => ({ ...prev, [key]: downloadURL }));
      
      const updated = customItems.map(i => i.key === key ? { ...i, value: downloadURL } : i);
      setCustomItems(updated);
      alert(`File uploaded successfully for "${key}"`);
    } catch (err) {
      console.error('File upload error:', err);
      alert(`Upload failed: ${err.message}`);
    }
  };

  const sections = ['All', ...Array.from(new Set(customItems.map(i => i.section)))];
  const filteredItems = activeTab === 'All' 
    ? customItems 
    : customItems.filter(item => item.section === activeTab);

  return (
    <div className={`admin-page-container ${isLoggedIn ? 'logged-in' : 'logged-out'}`}>
      {!isLoggedIn ? (
        /* ================= LIGHT LOGIN CARD ================= */
        <div className="login-card-bright">
          <div className="login-header-bright">
            <span className="login-badge-bright">🔒 Security Center</span>
            <h2>Admin Portal</h2>
            <p>Log in to access Bawra Skill House Admin Panel.</p>
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
          {/* Main Top Header & Navigation Switcher */}
          <div className="no-print admin-main-header-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '2px solid #e2e8f0'
          }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', color: '#0a0e29', margin: '0 0 0.2rem 0' }}>
                Bawra Skill House Admin Panel
              </h1>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                Manage Student Registrations, Fees, Accounts, and Website Media Options.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button
                onClick={() => setMainAdminSection('students')}
                style={{
                  padding: '0.7rem 1.3rem',
                  borderRadius: '30px',
                  border: mainAdminSection === 'students' ? 'none' : '1px solid #cbd5e1',
                  backgroundColor: mainAdminSection === 'students' ? '#0a0e29' : '#ffffff',
                  color: mainAdminSection === 'students' ? '#ffffff' : '#334155',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: mainAdminSection === 'students' ? '0 4px 15px rgba(10, 14, 41, 0.2)' : 'none'
                }}
              >
                🎓 Student Registration & Accounts
              </button>

              <button
                onClick={() => setMainAdminSection('options')}
                style={{
                  padding: '0.7rem 1.3rem',
                  borderRadius: '30px',
                  border: mainAdminSection === 'options' ? 'none' : '1px solid #cbd5e1',
                  backgroundColor: mainAdminSection === 'options' ? '#0a0e29' : '#ffffff',
                  color: mainAdminSection === 'options' ? '#ffffff' : '#334155',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: mainAdminSection === 'options' ? '0 4px 15px rgba(10, 14, 41, 0.2)' : 'none'
                }}
              >
                ⚙️ Custom Website Options
              </button>

              <button onClick={handleLogout} className="dashboard-btn-logout">
                Sign Out
              </button>
            </div>
          </div>

          {/* MAIN SECTION 1: STUDENT MANAGEMENT */}
          {mainAdminSection === 'students' && (
            <StudentManagement />
          )}

          {/* MAIN SECTION 2: DYNAMIC WEBSITE OPTIONS */}
          {mainAdminSection === 'options' && (
            <div>
              <div className="dashboard-header-bright" style={{ margin: '1rem 0' }}>
                <div className="dashboard-title-group">
                  <h2>Admin Options Dashboard</h2>
                  <p>Custom options and media configuration.</p>
                </div>
                <div className="dashboard-header-actions">
                  <button 
                    onClick={() => setShowAddModal(true)} 
                    className="dashboard-btn-reset" 
                    style={{ backgroundColor: '#10b981', color: '#ffffff', fontWeight: 'bold' }}
                  >
                    ➕ Add New Option
                  </button>
                </div>
              </div>

              {/* Clean Tabs if items exist */}
              {customItems.length > 0 && (
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
              )}

              {/* Media Items / Empty Template View */}
              {customItems.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  background: '#f8fafc',
                  borderRadius: '16px',
                  border: '2px dashed #cbd5e1',
                  margin: '2rem 0'
                }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>✨</div>
                  <h2 style={{ color: '#1e293b', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    Admin Panel Options are Empty
                  </h2>
                  <p style={{ color: '#64748b', maxWidth: '450px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
                    Saare purane options remove ho chuke hain. Naya option add karne ke liye niche button par click karein.
                  </p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    style={{
                      backgroundColor: '#ff9a00',
                      color: '#0a0e29',
                      border: 'none',
                      padding: '0.8rem 1.8rem',
                      borderRadius: '30px',
                      fontWeight: '700',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(255, 154, 0, 0.3)'
                    }}
                  >
                    ➕ Add First Option
                  </button>
                </div>
              ) : (
                <div className="media-list-bright">
                  {filteredItems.map(item => {
                    const currentVal = editValues[item.key] || '';

                    return (
                      <div key={item.key} className="media-card-bright">
                        <div className="media-card-header-bright" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div>
                            <span className="media-card-label">{item.label}</span>
                            <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '0.5rem' }}>
                              (Key: <code>{item.key}</code> | Section: {item.section})
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span className={`media-card-type-tag ${item.type}`}>
                              {item.type}
                            </span>
                            <button
                              onClick={() => handleDeleteOption(item.key, item.label)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#ef4444',
                                cursor: 'pointer',
                                fontSize: '1rem'
                              }}
                              title="Delete option"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>

                        <div className="media-card-layout-bright">
                          {(item.type === 'image' || item.type === 'video') && (
                            <div className="preview-thumbnail-bright">
                              {item.type === 'image' ? (
                                <img 
                                  src={currentVal} 
                                  alt="preview" 
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <video src={currentVal} controls style={{ width: '100%', height: '100%' }} />
                              )}
                            </div>
                          )}

                          <div className="control-panel-bright" style={{ width: '100%' }}>
                            <div className="input-row-bright">
                              <input
                                type="text"
                                value={currentVal}
                                onChange={(e) => setEditValues(prev => ({ ...prev, [item.key]: e.target.value }))}
                                placeholder={item.type === 'image' ? 'Image URL...' : item.type === 'video' ? 'Video URL...' : 'Enter value...'}
                              />
                              <button
                                onClick={() => handleUpdate(item.key)}
                                className="btn-update-link active"
                              >
                                Save
                              </button>
                            </div>

                            {(item.type === 'image' || item.type === 'video') && (
                              <div className="file-upload-row-bright" style={{ marginTop: '0.5rem' }}>
                                <label className="btn-file-upload-bright">
                                  {item.type === 'image' ? '🖼️ Choose Image File' : '🎥 Choose Video File'}
                                  <input
                                    type="file"
                                    accept={item.type === 'image' ? 'image/*' : 'video/*'}
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                      if (e.target.files[0]) {
                                        handleFileUpload(item.key, e.target.files[0]);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Modal for Adding New Custom Option */}
              {showAddModal && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  zIndex: 9999
                }}>
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '2rem',
                    width: '90%',
                    maxWidth: '500px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                  }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>➕ Add New Option</h3>
                    <form onSubmit={handleAddNewOption}>
                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.3rem' }}>
                          Option Title / Label *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Hero Banner Photo"
                          value={newItem.label}
                          onChange={(e) => setNewItem(prev => ({ ...prev, label: e.target.value }))}
                          style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        />
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.3rem' }}>
                          Key / ID (Optional - auto-generated if left blank)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. hero_banner_photo"
                          value={newItem.key}
                          onChange={(e) => setNewItem(prev => ({ ...prev, key: e.target.value }))}
                          style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        />
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.3rem' }}>
                          Section / Category
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Home Page, Courses, General"
                          value={newItem.section}
                          onChange={(e) => setNewItem(prev => ({ ...prev, section: e.target.value }))}
                          style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        />
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.3rem' }}>
                          Option Type
                        </label>
                        <select
                          value={newItem.type}
                          onChange={(e) => setNewItem(prev => ({ ...prev, type: e.target.value }))}
                          style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        >
                          <option value="image">Image (Photo)</option>
                          <option value="video">Video</option>
                          <option value="text">Text Field</option>
                          <option value="link">URL / Link</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.3rem' }}>
                          Initial Value / URL (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="https://..."
                          value={newItem.value}
                          onChange={(e) => setNewItem(prev => ({ ...prev, value: e.target.value }))}
                          style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => setShowAddModal(false)}
                          style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f1f5f9', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', background: '#ff9a00', color: '#0a0e29', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                          Save Option
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
