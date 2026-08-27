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

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button onClick={handleLogout} className="dashboard-btn-logout">
                Sign Out
              </button>
            </div>
          </div>

          {/* STUDENT REGISTRATION & ACCOUNTS MANAGEMENT */}
          <StudentManagement />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
