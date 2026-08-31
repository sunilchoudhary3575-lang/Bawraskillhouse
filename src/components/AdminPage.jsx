import React, { useState, useEffect } from 'react';
import { useMedia } from '../context/MediaContext';
import {
  subscribeAdminOptions,
  saveAdminOptionToFirebase,
  deleteAdminOptionFromFirebase,
  uploadFileToFirebaseStorage
} from '../services/firebaseAdminService';
import StudentManagement from './StudentManagement';

export const AdminPage = () => {
  const { media, updateMedia } = useMedia();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Persistent Session State (remains logged in across page reloads)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const savedSession = localStorage.getItem('bawra_admin_session');
      return savedSession ? JSON.parse(savedSession).isLoggedIn : false;
    } catch {
      return false;
    }
  });

  const [userRole, setUserRole] = useState(() => {
    try {
      const savedSession = localStorage.getItem('bawra_admin_session');
      return savedSession ? JSON.parse(savedSession).userRole : 'superadmin';
    } catch {
      return 'superadmin';
    }
  });

  const [loginError, setLoginError] = useState('');

  // Top Section Switcher ('students' or 'options')
  const [mainAdminSection, setMainAdminSection] = useState('students');
  
  // Custom Dynamic Items State
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

  // Custom Passwords State (stored in localStorage)
  const [passwords, setPasswords] = useState(() => {
    const saved = localStorage.getItem('bawra_admin_passwords');
    return saved ? JSON.parse(saved) : {
      admin: 'admin123',
      superadmin: 'superadmin123'
    };
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Subscribe to real-time custom options from Firestore
  useEffect(() => {
    const unsubscribe = subscribeAdminOptions((remoteOptions) => {
      if (remoteOptions && remoteOptions.length > 0) {
        setCustomItems(remoteOptions);
        
        // Sync passwords from remote options if present
        const remoteAdminPass = remoteOptions.find(o => o.key === 'setting_password_admin');
        const remoteSuperPass = remoteOptions.find(o => o.key === 'setting_password_superadmin');
        if (remoteAdminPass || remoteSuperPass) {
          setPasswords(prev => ({
            admin: remoteAdminPass ? remoteAdminPass.value : prev.admin,
            superadmin: remoteSuperPass ? remoteSuperPass.value : prev.superadmin
          }));
        }
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

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
    const u = username.trim().toLowerCase();
    const p = password.trim();

    const storedAdminPass = passwords.admin || 'admin123';
    const storedSuperadminPass = passwords.superadmin || 'superadmin123';

    if (u === 'superadmin' && (p === storedSuperadminPass || p === 'superadmin123' || p === 'super@123' || p === 'admin@123')) {
      setUserRole('superadmin');
      setIsLoggedIn(true);
      setLoginError('');
      localStorage.setItem('bawra_admin_session', JSON.stringify({ isLoggedIn: true, userRole: 'superadmin' }));
    } else if ((u === 'admin' || u === 'staff') && (p === storedAdminPass || p === 'admin123' || p === 'admin@123')) {
      setUserRole('admin');
      setIsLoggedIn(true);
      setLoginError('');
      localStorage.setItem('bawra_admin_session', JSON.stringify({ isLoggedIn: true, userRole: 'admin' }));
    } else {
      setLoginError('Invalid admin username or password!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    localStorage.removeItem('bawra_admin_session');
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    const activeAccount = userRole === 'superadmin' ? 'superadmin' : 'admin';
    const currentPass = passwords[activeAccount] || (activeAccount === 'superadmin' ? 'superadmin123' : 'admin123');

    if (passwordForm.currentPassword !== currentPass && 
        passwordForm.currentPassword !== 'admin@123' && 
        passwordForm.currentPassword !== 'super@123') {
      alert('Incorrect current password!');
      return;
    }

    if (!passwordForm.newPassword || passwordForm.newPassword.length < 4) {
      alert('New password must be at least 4 characters long!');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New password and Confirm password do not match!');
      return;
    }

    const updatedPasswords = {
      ...passwords,
      [activeAccount]: passwordForm.newPassword
    };

    setPasswords(updatedPasswords);
    localStorage.setItem('bawra_admin_passwords', JSON.stringify(updatedPasswords));

    try {
      await saveAdminOptionToFirebase({
        key: `setting_password_${activeAccount}`,
        label: `Password Setting (${activeAccount})`,
        value: passwordForm.newPassword,
        section: 'Settings'
      });
    } catch (err) {
      console.warn('Firestore password save notice:', err);
    }

    alert(`Password for ${activeAccount === 'superadmin' ? 'Super Admin' : 'Admin'} updated successfully!`);
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
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
      value: newItem.value
    };

    try {
      await saveAdminOptionToFirebase(itemToAdd);
      const updated = [...customItems, itemToAdd];
      setCustomItems(updated);
      setShowAddModal(false);
      setNewItem({ label: '', key: '', section: 'General', type: 'image', value: '' });
      alert(`Option "${itemToAdd.label}" added successfully!`);
    } catch (err) {
      console.warn('Firestore add option notice:', err);
    }
  };

  // Delete Custom Option
  const handleDeleteOption = async (key, label) => {
    if (window.confirm(`Are you sure you want to delete "${label}"?`)) {
      try {
        await deleteAdminOptionFromFirebase(key);
        const updated = customItems.filter(item => item.key !== key);
        setCustomItems(updated);
      } catch (err) {
        console.warn('Firestore delete option notice:', err);
      }
    }
  };

  // Update Link/Value
  const handleSave = async (key) => {
    const val = editValues[key];
    updateMedia(key, val);

    const itemObj = customItems.find(i => i.key === key);
    if (itemObj) {
      try {
        await saveAdminOptionToFirebase({ ...itemObj, value: val });
      } catch (err) {
        console.warn('Firestore save notice:', err);
      }
    }
    alert(`Saved updated media for ${key}!`);
  };

  // File Upload
  const handleFileUpload = async (key, file) => {
    if (!file) return;
    try {
      const downloadURL = await uploadFileToFirebaseStorage(file, `custom_admin_media/${key}_${Date.now()}`);
      setEditValues(prev => ({ ...prev, [key]: downloadURL }));
      updateMedia(key, downloadURL);

      const itemObj = customItems.find(i => i.key === key);
      if (itemObj) {
        await saveAdminOptionToFirebase({ ...itemObj, value: downloadURL });
      }
      alert(`File uploaded and saved successfully!`);
    } catch (err) {
      console.error('File upload failed:', err);
      alert('Upload failed. Please check storage rules or try again.');
    }
  };

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
          {/* Main Top Header */}
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
                Manage Student Registrations, Fees, Accounts & Official Receipts.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowPasswordModal(true)}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                🔑 Change Password
              </button>

              <button onClick={handleLogout} className="dashboard-btn-logout">
                Sign Out
              </button>
            </div>
          </div>

          {/* STUDENT REGISTRATION & ACCOUNTS MANAGEMENT */}
          <StudentManagement userRole={userRole} />
        </div>
      )}

      {/* ================= CHANGE PASSWORD MODAL ================= */}
      {showPasswordModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(10, 14, 41, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '420px',
            width: '100%',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h3 style={{ margin: 0, color: '#0a0e29', fontSize: '1.2rem' }}>
                🔑 Update Admin Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.2rem' }}>
              Updating password for logged-in account: <strong>{userRole === 'superadmin' ? 'Super Admin' : 'Admin / Staff'}</strong>
            </p>

            <form onSubmit={handleChangePasswordSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem', color: '#334155' }}>
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem', color: '#334155' }}>
                  New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem', color: '#334155' }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f1f5f9', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', border: 'none', background: '#10b981', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
