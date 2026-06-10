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
    <div className="admin-page-container" style={{
      width: '100%',
      minHeight: '85vh',
      backgroundColor: '#f3f4f6', // Bright background
      color: '#1f2937', // High contrast text
      padding: '4rem 1.5rem',
      fontFamily: 'var(--font-body)',
      display: 'flex',
      alignItems: isLoggedIn ? 'flex-start' : 'center',
      justifyContent: 'center'
    }}>
      {!isLoggedIn ? (
        /* ================= LIGHT LOGIN CARD ================= */
        <div className="login-card-bright" style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.01)',
          padding: '2.5rem',
          border: '1px solid #e5e7eb',
          textAlign: 'left'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.35rem 0.85rem',
              backgroundColor: 'rgba(255, 154, 0, 0.1)',
              color: '#d97706',
              borderRadius: '50px',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem'
            }}>
              🔒 Security Center
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#111827', margin: '0 0 0.5rem' }}>Admin Portal</h2>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>Log in to configure website photos and videos.</p>
          </div>

          {loginError && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fca5a5',
              color: '#991b1b',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              textAlign: 'center',
              fontWeight: 600
            }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Username</label>
              <input
                type="text"
                required
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#f9fafb',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  color: '#111827',
                  padding: '0.75rem 1rem',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff9a00'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Password</label>
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#f9fafb',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  color: '#111827',
                  padding: '0.75rem 1rem',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff9a00'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <button 
              type="submit" 
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #ff416c 0%, #ff8a00 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50px',
                padding: '0.9rem',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 65, 108, 0.2)',
                transition: 'transform 0.2s',
                marginTop: '0.5rem'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Sign In to Panel
            </button>
          </form>
        </div>
      ) : (
        /* ================= LIGHT DASHBOARD INTERFACE ================= */
        <div className="dashboard-card-bright" style={{
          width: '100%',
          maxWidth: '1100px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
          padding: '2.5rem',
          border: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '70vh'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid #f3f4f6',
            paddingBottom: '1.25rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#111827', margin: '0 0 0.25rem' }}>Media Manager Dashboard</h1>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>Configure and update all photo and video URLs dynamically.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={handleResetAll}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  color: '#374151',
                  borderRadius: '30px',
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
              >
                Reset All to Defaults
              </button>
              <button 
                onClick={handleLogout}
                style={{
                  backgroundColor: '#ef4444',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '30px',
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            marginBottom: '1.5rem',
            borderBottom: '1px solid #f3f4f6',
            scrollbarWidth: 'none'
          }}>
            {sections.map(sec => (
              <button
                key={sec}
                onClick={() => setActiveTab(sec)}
                style={{
                  padding: '0.6rem 1.25rem',
                  backgroundColor: activeTab === sec ? '#fffbeb' : 'transparent',
                  border: activeTab === sec ? '1px solid #f59e0b' : '1px solid #e5e7eb',
                  color: activeTab === sec ? '#d97706' : '#4b5563',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Media Items Editor Grid */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            flex: 1
          }}>
            {filteredItems.map(item => {
              const currentVal = media[item.key] || '';
              const typedVal = editValues[item.key] || '';
              const isChanged = currentVal !== typedVal;

              return (
                <div 
                  key={item.key}
                  style={{
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#111827' }}>{item.label}</span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      backgroundColor: item.type === 'video' ? '#fce7f3' : '#fef3c7',
                      color: item.type === 'video' ? '#db2777' : '#d97706',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px'
                    }}>
                      {item.type}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Media Preview Box */}
                    <div style={{
                      width: '120px',
                      height: '90px',
                      backgroundColor: '#111827',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid #d1d5db',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      {item.type === 'image' ? (
                        <img 
                          src={currentVal} 
                          alt="preview" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = '<span style="font-size:11px;color:#9ca3af;font-weight:700">No Preview</span>';
                          }}
                        />
                      ) : (
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                          <video 
                            src={currentVal} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            muted
                            preload="metadata"
                          />
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                            <span style={{ color: '#fff', fontSize: '1.5rem' }}>▶</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Inputs & Actions */}
                    <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <input
                          type="text"
                          value={typedVal}
                          onChange={(e) => handleInputChange(item.key, e.target.value)}
                          placeholder={item.type === 'image' ? 'https://example.com/image.jpg' : '/my_video.mp4'}
                          style={{
                            flex: 1,
                            backgroundColor: '#ffffff',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            color: '#111827',
                            padding: '0.65rem 0.85rem',
                            fontSize: '0.9rem',
                            outline: 'none',
                            fontFamily: 'monospace'
                          }}
                        />
                        <button
                          onClick={() => handleUpdate(item.key)}
                          disabled={!isChanged}
                          style={{
                            backgroundColor: isChanged ? '#ff9a00' : '#e5e7eb',
                            color: isChanged ? '#ffffff' : '#9ca3af',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.65rem 1.25rem',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            cursor: isChanged ? 'pointer' : 'not-allowed',
                            whiteSpace: 'nowrap',
                            boxShadow: isChanged ? '0 2px 6px rgba(255, 154, 0, 0.2)' : 'none',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (isChanged) e.target.style.backgroundColor = '#e08800';
                          }}
                          onMouseLeave={(e) => {
                            if (isChanged) e.target.style.backgroundColor = '#ff9a00';
                          }}
                        >
                          Update Link
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          <strong>Current:</strong> {currentVal.startsWith('data:') ? 'Local Default Asset' : currentVal}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
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
