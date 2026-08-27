import React, { useState, useEffect, useRef } from 'react';
import logoImg from '../assets/logo.png';
import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Course Prices matching exact website pricing
export const COURSE_OPTIONS = [
  { name: 'Graphic Designing', price: 20000, desc: 'Professional visual design, Photoshop & Illustrator (45 Days).', icon: '🎨' },
  { name: 'Video Editing', price: 20000, desc: 'Premiere Pro, After Effects, Reels & Ad editing (45 Days).', icon: '🎥' },
  { name: 'Cinematography & Film Making', price: 35000, desc: 'Camera, Drone, Lighting, Gimbal & Shoots (45 Days).', icon: '📹' },
  { name: 'Social Media Marketing', price: 35000, desc: 'Instagram, YouTube, Google Ads & Monetization (45 Days).', icon: '📱' },
  { name: 'Combo 1: Video Editing + Graphic Designing', price: 30000, desc: '🔥 Popular Combo (Saved ₹10,000) - Graphic + Video Suite.', icon: '🔥', isCombo: true },
  { name: 'Combo 2: Video Editing + Cinematography & Film Making', price: 45000, desc: '🎬 Master Filmmaker Combo (Saved ₹10,000) - Shoot to Edit Pack.', icon: '🎬', isCombo: true }
];

// Registration ID Generator Function (e.g. BSH-20260827001)
export const generateRegistrationId = (currentStudentsList = []) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  const seqNumber = String(currentStudentsList.length + 1).padStart(3, '0');
  return `BSH-${dateStr}${seqNumber}`;
};

export const StudentManagement = () => {
  const [activeSubTab, setActiveSubTab] = useState('list'); // 'list', 'new', 'view_form', 'view_student'
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('bawra_registered_students');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const printRef = useRef(null);

  // New Registration Form Data
  const getInitialFormState = (currentStudents = students) => ({
    fullName: '',
    guardianName: '',
    dob: '',
    gender: 'Male',
    mobile: '',
    whatsapp: '',
    email: '',
    address: '',
    profession: '',
    qualification: '',
    courses: ['Graphic Designing'], // Default selected course
    decTrueInfo: true,
    decFeeTerms: true,
    decFollowRules: true,
    signature: '',
    signatureDate: new Date().toISOString().split('T')[0],
    registrationId: generateRegistrationId(currentStudents),
    batchAssigned: 'Morning Batch (10 AM - 1 PM)',
    admissionConfirmed: 'Yes',
    totalFee: 20000,
    paidAmount: 5000,
    paymentMode: 'Cash',
    paymentNotes: 'Initial registration deposit'
  });

  const [formData, setFormData] = useState(() => getInitialFormState([]));

  // New Payment Installment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentInput, setPaymentInput] = useState({ amount: '', mode: 'UPI', notes: '' });

  // Save to localStorage & Firestore
  useEffect(() => {
    localStorage.setItem('bawra_registered_students', JSON.stringify(students));
  }, [students]);

  // Load from Firestore on mount if available
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'students'));
        if (!querySnapshot.empty) {
          const list = [];
          querySnapshot.forEach(docSnap => {
            list.push({ id: docSnap.id, ...docSnap.data() });
          });
          setStudents(list);
        }
      } catch (err) {
        console.warn('Firestore fetch notice (using local storage):', err);
      }
    };
    fetchStudents();
  }, []);

  // Word Counter Helper for Address
  const countWords = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Mobile / WhatsApp 10-Digit Lock Handler
  const handlePhoneChange = (field, value) => {
    const numericOnly = value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, [field]: numericOnly }));
  };

  // Address 50-Words Lock Handler
  const handleAddressChange = (value) => {
    const words = value.trim().split(/\s+/).filter(Boolean);
    if (words.length <= 50) {
      setFormData(prev => ({ ...prev, address: value }));
    } else {
      // Truncate to first 50 words
      const truncated = words.slice(0, 50).join(' ');
      setFormData(prev => ({ ...prev, address: truncated }));
    }
  };

  // Course Toggle & Auto Total Fee Calculation Handler
  const handleCourseToggle = (courseName) => {
    setFormData(prev => {
      const exists = prev.courses.includes(courseName);
      const updatedCourses = exists
        ? prev.courses.filter(c => c !== courseName)
        : [...prev.courses, courseName];

      // Calculate total fee based on selected courses/combos
      const newTotalFee = updatedCourses.reduce((sum, name) => {
        const found = COURSE_OPTIONS.find(c => c.name === name);
        return sum + (found ? found.price : 0);
      }, 0);

      return {
        ...prev,
        courses: updatedCourses,
        totalFee: newTotalFee
      };
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      alert('Please enter student full name');
      return;
    }

    if (formData.mobile.length < 10) {
      alert('Mobile number must be exactly 10 digits!');
      return;
    }

    const totalFeeNum = parseFloat(formData.totalFee) || 0;
    const paidNum = parseFloat(formData.paidAmount) || 0;
    const pendingBalance = totalFeeNum - paidNum;

    const newStudent = {
      id: `std_${Date.now()}`,
      ...formData,
      totalFee: totalFeeNum,
      paidAmount: paidNum,
      pendingBalance: pendingBalance,
      createdAt: new Date().toISOString(),
      paymentsHistory: paidNum > 0 ? [
        {
          id: `pay_${Date.now()}`,
          date: new Date().toLocaleDateString(),
          amount: paidNum,
          mode: formData.paymentMode,
          notes: formData.paymentNotes || 'Registration Deposit'
        }
      ] : []
    };

    try {
      const docRef = await addDoc(collection(db, 'students'), newStudent);
      newStudent.id = docRef.id;
    } catch (err) {
      console.warn('Firestore student save notice:', err);
    }

    const updated = [newStudent, ...students];
    setStudents(updated);
    setSelectedStudent(newStudent);
    setActiveSubTab('view_form');
    alert(`Student "${newStudent.fullName}" registered successfully! Total Fee: ₹${totalFeeNum.toLocaleString()}`);
  };

  // Add new payment installment
  const handleAddPayment = async () => {
    const amountNum = parseFloat(paymentInput.amount);
    if (!amountNum || amountNum <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }

    if (!selectedStudent) return;

    const newPaidTotal = (selectedStudent.paidAmount || 0) + amountNum;
    const newPending = (selectedStudent.totalFee || 0) - newPaidTotal;

    const newPaymentEntry = {
      id: `pay_${Date.now()}`,
      date: new Date().toLocaleDateString(),
      amount: amountNum,
      mode: paymentInput.mode,
      notes: paymentInput.notes || 'Installment Payment'
    };

    const updatedStudent = {
      ...selectedStudent,
      paidAmount: newPaidTotal,
      pendingBalance: newPending,
      paymentsHistory: [...(selectedStudent.paymentsHistory || []), newPaymentEntry]
    };

    // Update in state & storage
    const updatedList = students.map(s => s.id === selectedStudent.id ? updatedStudent : s);
    setStudents(updatedList);
    setSelectedStudent(updatedStudent);

    // Update Firestore if available
    try {
      const docRef = doc(db, 'students', selectedStudent.id);
      await updateDoc(docRef, {
        paidAmount: newPaidTotal,
        pendingBalance: newPending,
        paymentsHistory: updatedStudent.paymentsHistory
      });
    } catch (err) {
      console.warn('Firestore payment update notice:', err);
    }

    setShowPaymentModal(false);
    setPaymentInput({ amount: '', mode: 'UPI', notes: '' });
    alert(`Payment of ₹${amountNum} recorded successfully!`);
  };

  const handleDeleteStudent = async (studentId, studentName) => {
    if (window.confirm(`Are you sure you want to delete student "${studentName}"?`)) {
      const updated = students.filter(s => s.id !== studentId);
      setStudents(updated);
      if (selectedStudent && selectedStudent.id === studentId) {
        setSelectedStudent(null);
        setActiveSubTab('list');
      }
      try {
        await deleteDoc(doc(db, 'students', studentId));
      } catch (err) {}
      alert(`Deleted record for ${studentName}`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredStudents = students.filter(s => {
    const q = searchTerm.toLowerCase();
    return (
      (s.fullName || '').toLowerCase().includes(q) ||
      (s.registrationId || '').toLowerCase().includes(q) ||
      (s.mobile || '').includes(q)
    );
  });

  return (
    <div className="student-management-container" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top Controls Bar */}
      <div className="no-print student-nav-top-bar" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        padding: '0.5rem 0 1rem 0',
        marginBottom: '1.5rem',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="student-subtab-group" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveSubTab('list')}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              border: activeSubTab === 'list' ? 'none' : '1px solid #cbd5e1',
              backgroundColor: activeSubTab === 'list' ? '#0a0e29' : '#ffffff',
              color: activeSubTab === 'list' ? '#ffffff' : '#334155',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            📋 Student Directory ({students.length})
          </button>
          <button
            onClick={() => {
              setFormData(getInitialFormState(students));
              setActiveSubTab('new');
            }}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              border: activeSubTab === 'new' ? 'none' : '1px solid #cbd5e1',
              backgroundColor: activeSubTab === 'new' ? '#ff9a00' : '#ffffff',
              color: activeSubTab === 'new' ? '#0a0e29' : '#334155',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            ➕ New Registration Form
          </button>
        </div>

        {selectedStudent && (activeSubTab === 'view_form' || activeSubTab === 'view_student' || activeSubTab === 'view_invoice') && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveSubTab('view_form')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: activeSubTab === 'view_form' ? 'none' : '1px solid #cbd5e1',
                background: activeSubTab === 'view_form' ? '#2563eb' : '#f1f5f9',
                color: activeSubTab === 'view_form' ? '#fff' : '#0f172a',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              📄 View Registration Form
            </button>
            <button
              onClick={() => setActiveSubTab('view_invoice')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: activeSubTab === 'view_invoice' ? 'none' : '1px solid #cbd5e1',
                background: activeSubTab === 'view_invoice' ? '#e11d48' : '#f1f5f9',
                color: activeSubTab === 'view_invoice' ? '#fff' : '#0f172a',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🧾 View Money Receipt
            </button>
            <button
              onClick={() => setActiveSubTab('view_student')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: activeSubTab === 'view_student' ? 'none' : '1px solid #cbd5e1',
                background: activeSubTab === 'view_student' ? '#2563eb' : '#f1f5f9',
                color: activeSubTab === 'view_student' ? '#fff' : '#0f172a',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              💳 Fee & Account Profile
            </button>
            {(activeSubTab === 'view_form' || activeSubTab === 'view_invoice') && (
              <button
                onClick={handlePrint}
                style={{
                  padding: '0.5rem 1.2rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                🖨️ Print / Save PDF
              </button>
            )}
          </div>
        )}
      </div>

      {/* ================= 1. STUDENT DIRECTORY LIST ================= */}
      {activeSubTab === 'list' && (
        <div className="no-print">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="🔍 Search student by name, ID, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                width: '320px',
                fontSize: '0.9rem'
              }}
            />
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Showing {filteredStudents.length} registered students
            </span>
          </div>

          {filteredStudents.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '2px dashed #e2e8f0'
            }}>
              <h3>No Students Found</h3>
              <p style={{ color: '#64748b' }}>Click "New Registration Form" to register your first student.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#0a0e29', color: '#fff' }}>
                    <th style={{ padding: '0.8rem 0.6rem', textAlign: 'center', width: '60px' }}>Sr. No.</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Reg ID</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Student Name</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Phone</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Course(s)</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Total Fee</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Paid</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Pending</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.8rem 1rem', textAlign: 'right', whiteSpace: 'nowrap', minWidth: '240px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((std, idx) => {
                    const totalFee = std.totalFee || 0;
                    const paid = std.paidAmount || 0;
                    const pending = totalFee - paid;
                    const isFullyPaid = pending <= 0;

                    return (
                      <tr key={std.id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                        <td style={{ padding: '0.8rem 0.6rem', textAlign: 'center', fontWeight: 'bold', color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '0.8rem 1rem', fontWeight: 'bold', color: '#2563eb' }}>{std.registrationId}</td>
                        <td style={{ padding: '0.8rem 1rem', fontWeight: '600' }}>{std.fullName}</td>
                        <td style={{ padding: '0.8rem 1rem' }}>{std.mobile}</td>
                        <td style={{ padding: '0.8rem 1rem' }}>
                          {(std.courses || []).join(', ') || 'General'}
                        </td>
                        <td style={{ padding: '0.8rem 1rem' }}>₹{totalFee.toLocaleString()}</td>
                        <td style={{ padding: '0.8rem 1rem', color: '#16a34a', fontWeight: '600' }}>₹{paid.toLocaleString()}</td>
                        <td style={{ padding: '0.8rem 1rem', color: pending > 0 ? '#dc2626' : '#64748b', fontWeight: 'bold' }}>
                          ₹{pending > 0 ? pending.toLocaleString() : '0'}
                        </td>
                        <td style={{ padding: '0.8rem 1rem' }}>
                          <span style={{
                            padding: '0.2rem 0.6rem',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            backgroundColor: isFullyPaid ? '#dcfce7' : '#fef3c7',
                            color: isFullyPaid ? '#15803d' : '#b45309'
                          }}>
                            {isFullyPaid ? 'Fully Paid' : 'Pending'}
                          </span>
                        </td>
                        <td style={{ padding: '0.8rem 1rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: '#f1f5f9',
                            padding: '0.25rem 0.45rem',
                            borderRadius: '30px',
                            border: '1px solid #cbd5e1'
                          }}>
                            <button
                              onClick={() => {
                                setSelectedStudent(std);
                                setActiveSubTab('view_form');
                              }}
                              style={{
                                padding: '0.35rem 0.75rem',
                                borderRadius: '20px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                color: '#ffffff',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontSize: '0.78rem',
                                boxShadow: '0 2px 6px rgba(37, 99, 235, 0.2)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              📄 Form
                            </button>
                            <button
                              onClick={() => {
                                setSelectedStudent(std);
                                setActiveSubTab('view_invoice');
                              }}
                              style={{
                                padding: '0.35rem 0.75rem',
                                borderRadius: '20px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #e11d48, #be123c)',
                                color: '#ffffff',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontSize: '0.78rem',
                                boxShadow: '0 2px 6px rgba(225, 29, 72, 0.2)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              🧾 Receipt
                            </button>
                            <button
                              onClick={() => {
                                setSelectedStudent(std);
                                setActiveSubTab('view_student');
                              }}
                              style={{
                                padding: '0.35rem 0.75rem',
                                borderRadius: '20px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #0a0e29, #1e293b)',
                                color: '#ffffff',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontSize: '0.78rem',
                                boxShadow: '0 2px 6px rgba(10, 14, 41, 0.2)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              💳 Account
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(std.id, std.fullName)}
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                border: '1px solid #fca5a5',
                                background: '#fee2e2',
                                color: '#ef4444',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 0
                              }}
                              title="Delete Student"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ================= 2. NEW REGISTRATION FORM INPUT ================= */}
      {activeSubTab === 'new' && (
        <div className="no-print" style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '2px solid #0a0e29', paddingBottom: '0.5rem', color: '#0a0e29' }}>
            📝 Fill Student Registration Details
          </h2>

          <form onSubmit={handleRegisterSubmit}>
            {/* Section 1 */}
            <h3 style={{ background: '#0a0e29', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '1rem', marginBottom: '1rem' }}>
              1. STUDENT INFORMATION
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Father's / Guardian's Name</label>
                <input
                  type="text"
                  placeholder="Enter guardian name"
                  value={formData.guardianName}
                  onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              {/* Mobile Number Lock (Max 10 Digits) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Mobile Number * (10 Digits Lock)</label>
                  <span style={{ fontSize: '0.75rem', color: formData.mobile.length === 10 ? '#16a34a' : '#64748b' }}>
                    {formData.mobile.length}/10 digits
                  </span>
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={formData.mobile}
                  onChange={e => handlePhoneChange('mobile', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: '6px',
                    border: formData.mobile.length === 10 ? '2px solid #16a34a' : '1px solid #cbd5e1'
                  }}
                />
              </div>

              {/* WhatsApp Number Lock (Max 10 Digits) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>WhatsApp Number (10 Digits Lock)</label>
                  <span style={{ fontSize: '0.75rem', color: formData.whatsapp.length === 10 ? '#16a34a' : '#64748b' }}>
                    {formData.whatsapp.length}/10 digits
                  </span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="10-digit WhatsApp number"
                  value={formData.whatsapp}
                  onChange={e => handlePhoneChange('whatsapp', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: '6px',
                    border: formData.whatsapp.length === 10 ? '2px solid #16a34a' : '1px solid #cbd5e1'
                  }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={e => setFormData({ ...formData, dob: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Gender</label>
                <select
                  value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              {/* Complete Address Lock (Max 50 Words) */}
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Complete Address (Max 50 Words Lock)</label>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: countWords(formData.address) >= 50 ? '#dc2626' : '#2563eb'
                  }}>
                    {countWords(formData.address)} / 50 words max
                  </span>
                </div>
                <textarea
                  rows="2"
                  placeholder="Enter complete address (Maximum 50 words allowed)"
                  value={formData.address}
                  onChange={e => handleAddressChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: '6px',
                    border: countWords(formData.address) >= 50 ? '2px solid #dc2626' : '1px solid #cbd5e1'
                  }}
                ></textarea>
              </div>
            </div>

            {/* Section 2 */}
            <h3 style={{ background: '#e11d48', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '1rem', marginBottom: '1rem' }}>
              2. EDUCATIONAL / PROFESSIONAL INFORMATION
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>School / College / Profession</label>
                <input
                  type="text"
                  placeholder="Enter school, college or profession"
                  value={formData.profession}
                  onChange={e => setFormData({ ...formData, profession: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Qualification</label>
                <input
                  type="text"
                  placeholder="Enter qualification"
                  value={formData.qualification}
                  onChange={e => setFormData({ ...formData, qualification: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            {/* Section 3: Course Selection & Combo Offers with Auto Fee Calculation */}
            <h3 style={{ background: '#f97316', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '1rem', marginBottom: '0.5rem' }}>
              3. COURSE SELECTION (Auto Calculates Total Fee)
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
              Select single courses or combo offers. Total Course Fee will automatically recalculate!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {COURSE_OPTIONS.map(c => {
                const isChecked = formData.courses.includes(c.name);
                return (
                  <label
                    key={c.name}
                    style={{
                      display: 'flex',
                      gap: '0.8rem',
                      alignItems: 'flex-start',
                      padding: '0.9rem',
                      border: isChecked ? '2px solid #f97316' : '1px solid #cbd5e1',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: c.isCombo 
                        ? (isChecked ? '#fef3c7' : '#fffbeb') 
                        : (isChecked ? '#fff7ed' : '#ffffff'),
                      position: 'relative'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCourseToggle(c.name)}
                      style={{ marginTop: '3px' }}
                    />
                    <div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>
                          {c.icon} {c.name.includes('& Film Making') ? (
                            <>
                              {c.name.split('& Film Making')[0]}
                              <span style={{ whiteSpace: 'nowrap' }}>& Film Making</span>
                            </>
                          ) : c.name}
                        </strong>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#475569', display: 'block', margin: '2px 0' }}>{c.desc}</span>
                      <span style={{
                        fontSize: '0.85rem',
                        fontWeight: '800',
                        color: c.isCombo ? '#b45309' : '#16a34a',
                        display: 'inline-block',
                        marginTop: '4px'
                      }}>
                        Fee: ₹{c.price.toLocaleString()}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Section 4 & Fees */}
            <h3 style={{ background: '#6b21a8', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '1rem', marginBottom: '1rem' }}>
              4. FEE DETAILS & OFFICE USE
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#15803d' }}>
                  Total Course Fee (Auto Calculated: ₹)
                </label>
                <input
                  type="number"
                  value={formData.totalFee}
                  onChange={e => setFormData({ ...formData, totalFee: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '2px solid #16a34a', fontWeight: 'bold', fontSize: '1rem' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Amount Paid Now (₹)</label>
                <input
                  type="number"
                  value={formData.paidAmount}
                  onChange={e => setFormData({ ...formData, paidAmount: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Registration ID</label>
                <input
                  type="text"
                  value={formData.registrationId}
                  onChange={e => setFormData({ ...formData, registrationId: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.9rem',
                backgroundColor: '#0a0e29',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              ✨ Generate Official Registration Form
            </button>
          </form>
        </div>
      )}

      {/* ================= 3. GENERATED REGISTRATION FORM (PRINTABLE) ================= */}
      {activeSubTab === 'view_form' && selectedStudent && (
        <div>
          <div className="printable-registration-form" ref={printRef}>
            <style>{`
              @page {
                size: A4 portrait;
                margin: 4mm 6mm;
              }

              @media print {
                html, body {
                  height: 100%;
                  margin: 0 !important;
                  padding: 0 !important;
                  background: #ffffff !important;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
                body * {
                  visibility: hidden;
                }
                .printable-registration-form, .printable-registration-form * {
                  visibility: visible;
                }
                .printable-registration-form {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  margin: 0;
                  padding: 0;
                  box-shadow: none !important;
                }
                .form-page-container {
                  box-shadow: none !important;
                  border: none !important;
                  border-radius: 0 !important;
                  padding: 10px 18px !important;
                  transform: scale(0.95);
                  transform-origin: top center;
                  page-break-inside: avoid;
                  break-inside: avoid;
                }
                .no-print {
                  display: none !important;
                }
              }

              .form-page-container {
                max-width: 800px;
                margin: 0 auto;
                background: #ffffff;
                padding: 18px 24px;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
                position: relative;
                color: #1e293b;
                font-family: 'Inter', sans-serif;
                overflow: hidden;
                box-sizing: border-box;
              }

              /* Header Branding Shapes */
              .top-corner-accent {
                position: absolute;
                top: 0;
                right: 0;
                width: 220px;
                height: 55px;
                background: linear-gradient(135deg, #0a0e29 45%, #e11d48 45%, #e11d48 70%, #ff9a00 70%);
                clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 0);
              }

              .form-header-box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 8px;
                padding-bottom: 4px;
              }

              .form-logo-img {
                height: 42px;
                object-fit: contain;
              }

              .main-form-title {
                text-align: center;
                color: #e11d48;
                font-size: 1.15rem;
                font-weight: 800;
                letter-spacing: 1px;
                margin: 6px 0 12px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
              }

              .main-form-title::before, .main-form-title::after {
                content: '';
                flex: 1;
                height: 2px;
                background: #e11d48;
              }

              .sec-heading {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #ffffff;
                padding: 4px 10px;
                border-radius: 5px;
                font-size: 0.78rem;
                font-weight: 700;
                letter-spacing: 0.4px;
                margin-bottom: 8px;
              }

              .sec-num-badge {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #ffffff;
                color: #0a0e29;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.7rem;
                font-weight: 800;
              }

              .underline-row {
                display: flex;
                align-items: baseline;
                gap: 6px;
                margin-bottom: 6px;
                font-size: 0.8rem;
              }

              .underline-label {
                font-weight: 600;
                color: #0f172a;
                white-space: nowrap;
              }

              .underline-val {
                flex: 1;
                border-bottom: 1.5px solid #0f172a;
                padding-bottom: 1px;
                font-weight: 500;
                color: #000000;
                min-height: 16px;
              }

              .grid-2col {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px 14px;
              }

              .form-section-box {
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                padding: 8px 12px 6px 12px;
                margin-bottom: 9px;
                position: relative;
              }

              .course-check-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 4px 12px;
              }

              .course-check-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 0.78rem;
                font-weight: 600;
                padding: 2px 0;
              }

              .checkbox-box {
                width: 15px;
                height: 15px;
                border: 1.5px solid #0f172a;
                border-radius: 3px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 0.7rem;
                font-weight: bold;
              }
            `}</style>

            <div className="form-page-container">
              {/* Header Corner Accent */}
              <div className="top-corner-accent"></div>

              {/* Logo Header */}
              <div className="form-header-box">
                <img src={logoImg} alt="Bawra Skill House Logo" className="form-logo-img" />
              </div>

              <div className="main-form-title">
                STUDENT REGISTRATION FORM
              </div>

              {/* SECTION 1 */}
              <div className="form-section-box">
                <div className="sec-heading" style={{ background: '#0a0e29' }}>
                  <span className="sec-num-badge">1</span>
                  STUDENT INFORMATION
                </div>

                <div className="grid-2col">
                  <div className="underline-row">
                    <span className="underline-label">Full Name:</span>
                    <span className="underline-val">{selectedStudent.fullName}</span>
                  </div>
                  <div className="underline-row">
                    <span className="underline-label">Father's / Guardian's Name:</span>
                    <span className="underline-val">{selectedStudent.guardianName || '—'}</span>
                  </div>
                </div>

                <div className="grid-2col">
                  <div className="underline-row">
                    <span className="underline-label">Date of Birth:</span>
                    <span className="underline-val">{selectedStudent.dob || '—'}</span>
                  </div>
                  <div className="underline-row">
                    <span className="underline-label">Gender:</span>
                    <span style={{ display: 'flex', gap: '15px', alignItems: 'center', fontSize: '0.85rem' }}>
                      <label><input type="radio" checked={selectedStudent.gender === 'Male'} readOnly /> Male</label>
                      <label><input type="radio" checked={selectedStudent.gender === 'Female'} readOnly /> Female</label>
                      <label><input type="radio" checked={selectedStudent.gender === 'Other'} readOnly /> Other</label>
                    </span>
                  </div>
                </div>

                <div className="grid-2col">
                  <div className="underline-row">
                    <span className="underline-label">Mobile Number:</span>
                    <span className="underline-val">{selectedStudent.mobile}</span>
                  </div>
                  <div className="underline-row">
                    <span className="underline-label">WhatsApp Number:</span>
                    <span className="underline-val">{selectedStudent.whatsapp || selectedStudent.mobile}</span>
                  </div>
                </div>

                <div className="underline-row">
                  <span className="underline-label">Email Address:</span>
                  <span className="underline-val">{selectedStudent.email || '—'}</span>
                </div>

                <div className="underline-row">
                  <span className="underline-label">Address:</span>
                  <span className="underline-val">{selectedStudent.address || '—'}</span>
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="form-section-box">
                <div className="sec-heading" style={{ background: '#e11d48' }}>
                  <span className="sec-num-badge" style={{ color: '#e11d48' }}>2</span>
                  EDUCATIONAL / PROFESSIONAL INFORMATION
                </div>

                <div className="grid-2col">
                  <div className="underline-row">
                    <span className="underline-label">School / College / Profession:</span>
                    <span className="underline-val">{selectedStudent.profession || '—'}</span>
                  </div>
                  <div className="underline-row">
                    <span className="underline-label">Qualification:</span>
                    <span className="underline-val">{selectedStudent.qualification || '—'}</span>
                  </div>
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="form-section-box">
                <div className="sec-heading" style={{ background: '#f97316' }}>
                  <span className="sec-num-badge" style={{ color: '#f97316' }}>3</span>
                  COURSE SELECTION
                </div>

                <div className="course-check-grid">
                  {COURSE_OPTIONS.map(item => {
                    const isSelected = (selectedStudent.courses || []).includes(item.name);
                    const formattedName = item.name.includes('& Film Making') ? (
                      <>
                        {item.name.split('& Film Making')[0]}
                        <span style={{ whiteSpace: 'nowrap' }}>& Film Making</span>
                      </>
                    ) : item.name;

                    return (
                      <div key={item.name} className="course-check-item">
                        <span>{item.icon} {formattedName}</span>
                        <div className="checkbox-box">
                          {isSelected ? '✓' : ''}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 4 */}
              <div className="form-section-box">
                <div className="sec-heading" style={{ background: '#6b21a8' }}>
                  <span className="sec-num-badge" style={{ color: '#6b21a8' }}>4</span>
                  DECLARATION
                </div>

                <div style={{ fontSize: '0.78rem', color: '#334155', lineHeight: '1.4', marginBottom: '15px' }}>
                  <p style={{ margin: '3px 0' }}>☑ I hereby confirm that the information provided above is true and correct.</p>
                  <p style={{ margin: '3px 0' }}>☑ I agree to pay the course fee as per the payment terms mentioned by the institute.</p>
                  <p style={{ margin: '3px 0' }}>☑ I agree to follow the rules and regulations of Bawra Skill House.</p>
                </div>

                <div className="grid-2col" style={{ marginTop: '15px' }}>
                  <div className="underline-row">
                    <span className="underline-label">Student Signature:</span>
                    <span className="underline-val">{selectedStudent.fullName}</span>
                  </div>
                  <div className="underline-row">
                    <span className="underline-label">Date:</span>
                    <span className="underline-val">{selectedStudent.signatureDate || new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* SECTION 5 */}
              <div className="form-section-box" style={{ borderColor: '#0284c7' }}>
                <div className="sec-heading" style={{ background: '#0284c7' }}>
                  <span className="sec-num-badge" style={{ color: '#0284c7' }}>5</span>
                  OFFICE USE ONLY
                </div>

                <div className="grid-2col">
                  <div className="underline-row">
                    <span className="underline-label">Registration ID:</span>
                    <span className="underline-val" style={{ fontWeight: 'bold', color: '#0284c7' }}>{selectedStudent.registrationId}</span>
                  </div>
                  <div className="underline-row">
                    <span className="underline-label">Batch Assigned:</span>
                    <span className="underline-val">{selectedStudent.batchAssigned || 'Regular Batch'}</span>
                  </div>
                </div>

                <div className="underline-row">
                  <span className="underline-label">Admission Confirmed:</span>
                  <span style={{ display: 'flex', gap: '20px', alignItems: 'center', marginLeft: '10px' }}>
                    <label style={{ fontSize: '0.85rem' }}><input type="radio" checked readOnly /> Yes</label>
                    <label style={{ fontSize: '0.85rem' }}><input type="radio" disabled /> No</label>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. STUDENT FEE & ACCOUNT PROFILE ================= */}
      {activeSubTab === 'view_student' && selectedStudent && (
        <div className="no-print" style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ margin: 0, color: '#0a0e29' }}>{selectedStudent.fullName}</h2>
              <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Registration ID: <strong>{selectedStudent.registrationId}</strong> | Phone: {selectedStudent.mobile}
              </span>
            </div>
            <button
              onClick={() => setShowPaymentModal(true)}
              style={{
                backgroundColor: '#10b981',
                color: '#fff',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              💵 Record New Fee Payment
            </button>
          </div>

          {/* Fee Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #0a0e29' }}>
              <span style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 'bold' }}>TOTAL COURSE FEE</span>
              <h3 style={{ fontSize: '1.6rem', margin: '0.4rem 0 0 0', color: '#0a0e29' }}>₹{(selectedStudent.totalFee || 0).toLocaleString()}</h3>
            </div>

            <div style={{ background: '#f0fdf4', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #16a34a' }}>
              <span style={{ color: '#15803d', fontSize: '0.8rem', fontWeight: 'bold' }}>AMOUNT PAID (JAMA)</span>
              <h3 style={{ fontSize: '1.6rem', margin: '0.4rem 0 0 0', color: '#16a34a' }}>₹{(selectedStudent.paidAmount || 0).toLocaleString()}</h3>
            </div>

            <div style={{ background: '#fef2f2', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #dc2626' }}>
              <span style={{ color: '#b91c1c', fontSize: '0.8rem', fontWeight: 'bold' }}>REMAINING BALANCE (BAKAYA)</span>
              <h3 style={{ fontSize: '1.6rem', margin: '0.4rem 0 0 0', color: '#dc2626' }}>₹{((selectedStudent.totalFee || 0) - (selectedStudent.paidAmount || 0)).toLocaleString()}</h3>
            </div>
          </div>

          {/* Payment Log History */}
          <h3 style={{ marginBottom: '1rem', color: '#0a0e29' }}>📜 Payment History Logs</h3>
          {(selectedStudent.paymentsHistory || []).length === 0 ? (
            <p style={{ color: '#64748b' }}>No payments recorded yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                  <th style={{ padding: '0.6rem 1rem', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '0.6rem 1rem', textAlign: 'left' }}>Amount Paid</th>
                  <th style={{ padding: '0.6rem 1rem', textAlign: 'left' }}>Payment Mode</th>
                  <th style={{ padding: '0.6rem 1rem', textAlign: 'left' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudent.paymentsHistory.map(pay => (
                  <tr key={pay.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.7rem 1rem' }}>{pay.date}</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#16a34a', fontWeight: 'bold' }}>₹{pay.amount.toLocaleString()}</td>
                    <td style={{ padding: '0.7rem 1rem' }}>{pay.mode}</td>
                    <td style={{ padding: '0.7rem 1rem', color: '#64748b' }}>{pay.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Money Receipt Generator Action */}
          <div style={{
            marginTop: '2rem',
            padding: '1.2rem',
            background: '#fff1f2',
            borderRadius: '10px',
            border: '1px solid #fecdd3',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between'
          }}>
            <div>
              <strong style={{ color: '#be123c', fontSize: '1rem' }}>🧾 Official Money Receipt Generator</strong>
              <p style={{ color: '#9f1239', margin: '0.2rem 0 0 0', fontSize: '0.85rem' }}>
                Generate & Print exact official Bawra Skill House Money Receipt for this student.
              </p>
            </div>
            <button
              onClick={() => setActiveSubTab('view_invoice')}
              style={{
                background: '#e11d48',
                color: '#ffffff',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(225, 29, 72, 0.25)'
              }}
            >
              🧾 Generate Money Receipt
            </button>
          </div>
        </div>
      )}

      {/* ================= 5. GENERATED MONEY RECEIPT (PRINTABLE) ================= */}
      {activeSubTab === 'view_invoice' && selectedStudent && (
        <div>
          <div className="printable-money-receipt" ref={printRef}>
            <style>{`
              @page {
                size: A4 portrait;
                margin: 5mm;
              }

              @media print {
                html, body {
                  height: 100%;
                  margin: 0 !important;
                  padding: 0 !important;
                  background: #ffffff !important;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
                body * {
                  visibility: hidden;
                }
                .printable-money-receipt, .printable-money-receipt * {
                  visibility: visible;
                }
                .printable-money-receipt {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  margin: 0;
                  padding: 0;
                  box-shadow: none !important;
                }
                .receipt-page-container {
                  box-shadow: none !important;
                  border: 1.5px solid #000000 !important;
                  border-radius: 0 !important;
                  padding: 0 !important;
                  transform: scale(0.98);
                  transform-origin: top center;
                  page-break-inside: avoid;
                  break-inside: avoid;
                }
                .no-print {
                  display: none !important;
                }
              }

              .receipt-page-container {
                max-width: 840px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 8px;
                border: 1.5px solid #222222;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                position: relative;
                color: #000000;
                font-family: Arial, sans-serif;
                overflow: hidden;
                box-sizing: border-box;
              }

              .receipt-top-banner {
                height: 30px;
                background: linear-gradient(135deg, #2f4492 0%, #2f4492 37%, #ffffff 37%, #ffffff 38%, #e20074 38%, #e20074 100%);
                width: 100%;
              }

              .receipt-header-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 28px 12px 28px;
              }

              .receipt-logo {
                height: 56px;
                object-fit: contain;
              }

              .receipt-sub-bar {
                background: #2f4492;
                color: #ffffff;
                padding: 8px 28px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: bold;
                font-size: 0.98rem;
                letter-spacing: 1px;
                font-family: Arial, sans-serif;
              }

              .receipt-body-grid {
                padding: 26px 32px 10px 32px;
                display: grid;
                grid-template-columns: 1.05fr 0.95fr;
                gap: 16px 40px;
              }

              .receipt-field-row {
                display: flex;
                align-items: flex-end;
                font-size: 0.95rem;
                font-weight: bold;
                color: #000000;
                margin-bottom: 18px;
                height: 26px;
              }

              .receipt-field-label {
                white-space: nowrap;
                margin-right: 6px;
                font-weight: 700;
                line-height: 1.2;
                margin-bottom: 2px;
              }

              .receipt-field-dots-container {
                flex: 1;
                border-bottom: 2px dotted #000000;
                display: flex;
                align-items: flex-end;
                height: 100%;
                padding-bottom: 1px;
              }

              .receipt-field-val-text {
                font-weight: 800;
                color: #000000;
                padding: 0 4px;
                white-space: nowrap;
                line-height: 1.1;
              }

              .receipt-footer-signatures {
                padding: 20px 32px 30px 32px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                font-size: 0.95rem;
                font-weight: bold;
                color: #000000;
              }
            `}</style>

            <div className="receipt-page-container">
              {/* Exact Top Diagonal Color Banner */}
              <div className="receipt-top-banner"></div>

              {/* Top Header Branding Row */}
              <div className="receipt-header-row">
                {/* Left Logo */}
                <div>
                  <img src={logoImg} alt="Bawra Skill House Logo" className="receipt-logo" />
                </div>

                {/* Center Title & Contact */}
                <div style={{ textAlign: 'center' }}>
                  <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', color: '#000000', letterSpacing: '1px', fontFamily: 'Arial, sans-serif' }}>
                    MONEY RECEIPT
                  </h1>
                  <p style={{ margin: '3px 0 0 0', fontSize: '0.58rem', fontWeight: 'bold', color: '#111111', letterSpacing: '-0.1px' }}>
                    +91 63777 90409, +91 99506 83442 | contact@bawraskillhouse.com
                  </p>
                </div>

                {/* Right Address */}
                <div style={{ textAlign: 'right', fontSize: '0.74rem', fontWeight: 'bold', color: '#000000', lineHeight: '1.35' }}>
                  <div>18/ 719, Opposite Chand Vilas</div>
                  <div>Namkeen, Sector 18, CHB,</div>
                  <div>Jodhpur, Rajasthan 342008</div>
                </div>
              </div>

              {/* BILL NO and DATE Row */}
              <div style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                padding: '12px 32px 10px 32px',
                background: '#ffffff',
                fontSize: '1.05rem',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: 'Arial, sans-serif'
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <span style={{ marginRight: '5px', fontWeight: 'bold', fontSize: '0.78rem' }}>BILL NO.</span>
                  <span style={{ fontWeight: '800', color: '#000000', borderBottom: '1.5px solid #000000', padding: '0 3px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                    {selectedStudent.registrationId}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', marginLeft: 'auto' }}>
                  <span style={{ marginRight: '5px', fontWeight: 'bold', fontSize: '0.78rem' }}>DATE.</span>
                  <span style={{ fontWeight: '800', color: '#000000', borderBottom: '1.5px solid #000000', padding: '0 3px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                    {selectedStudent.signatureDate || new Date().toLocaleDateString('en-GB')}
                  </span>
                </div>
              </div>

              {/* Purple Horizontal Strip Below BILL NO & DATE */}
              <div style={{
                height: '7px',
                background: '#581c87',
                width: '100%'
              }}></div>

              {/* 2-Column Dotted Fields (Single level continuous dotted line) */}
              <div className="receipt-body-grid">
                {/* Left Column */}
                <div>
                  <div className="receipt-field-row">
                    <span className="receipt-field-label">Name</span>
                    <div className="receipt-field-dots-container">
                      <span className="receipt-field-val-text">{selectedStudent.fullName}</span>
                    </div>
                  </div>

                  <div className="receipt-field-row">
                    <span className="receipt-field-label">Amount Paid</span>
                    <div className="receipt-field-dots-container">
                      <span className="receipt-field-val-text">₹{(selectedStudent.paidAmount || 0).toLocaleString()}/-</span>
                    </div>
                  </div>

                  <div className="receipt-field-row">
                    <span className="receipt-field-label">Paid To</span>
                    <div className="receipt-field-dots-container">
                      <span className="receipt-field-val-text">Bawra Skill House</span>
                    </div>
                  </div>

                  <div className="receipt-field-row" style={{ height: 'auto', minHeight: '26px', alignItems: 'flex-start' }}>
                    <span className="receipt-field-label" style={{ marginTop: '2px' }}>Address</span>
                    <div className="receipt-field-dots-container" style={{ borderBottom: 'none' }}>
                      <span className="receipt-field-val-text" style={{
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        lineHeight: '1.45',
                        borderBottom: '2px dotted #000000',
                        display: 'inline',
                        paddingBottom: '1px'
                      }}>
                        {selectedStudent.address || '—'}
                      </span>
                    </div>
                  </div>

                  <div className="receipt-field-row" style={{ marginTop: '-4px' }}>
                    <div className="receipt-field-dots-container"></div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="receipt-field-row" style={{ height: 'auto', minHeight: '26px', alignItems: 'flex-start' }}>
                    <span className="receipt-field-label" style={{ marginTop: '2px' }}>Course</span>
                    <div className="receipt-field-dots-container" style={{ borderBottom: 'none' }}>
                      <span className="receipt-field-val-text" style={{
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        lineHeight: '1.45',
                        borderBottom: '2px dotted #000000',
                        display: 'inline',
                        paddingBottom: '1px'
                      }}>
                        {(selectedStudent.courses || []).join(', ') || 'General'}
                      </span>
                    </div>
                  </div>

                  <div className="receipt-field-row">
                    <span className="receipt-field-label">Due Amount</span>
                    <div className="receipt-field-dots-container">
                      <span className="receipt-field-val-text">₹{((selectedStudent.totalFee || 0) - (selectedStudent.paidAmount || 0)).toLocaleString()}/-</span>
                    </div>
                  </div>

                  <div className="receipt-field-row">
                    <span className="receipt-field-label">Student Phone No</span>
                    <div className="receipt-field-dots-container">
                      <span className="receipt-field-val-text">{selectedStudent.mobile}</span>
                    </div>
                  </div>

                  <div className="receipt-field-row">
                    <span className="receipt-field-label">Father’s Name</span>
                    <div className="receipt-field-dots-container">
                      <span className="receipt-field-val-text">{selectedStudent.guardianName || '—'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Signatures Row */}
              <div className="receipt-footer-signatures">
                <div className="receipt-field-row" style={{ width: '45%', marginBottom: 0 }}>
                  <span className="receipt-field-label">Received By</span>
                  <div className="receipt-field-dots-container"></div>
                </div>

                <div className="receipt-field-row" style={{ width: '48%', marginBottom: 0 }}>
                  <span className="receipt-field-label">Authorized Signature</span>
                  <div className="receipt-field-dots-container"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Installment Modal */}
      {showPaymentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '400px' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#0a0e29' }}>💵 Record Fee Payment</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                Payment Amount (₹) *
              </label>
              <input
                type="number"
                placeholder="e.g. 5000"
                value={paymentInput.amount}
                onChange={e => setPaymentInput({ ...paymentInput, amount: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                Payment Mode
              </label>
              <select
                value={paymentInput.mode}
                onChange={e => setPaymentInput({ ...paymentInput, mode: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="UPI">UPI / Google Pay / PhonePe</option>
                <option value="Cash">Cash</option>
                <option value="NetBanking">NetBanking / Bank Transfer</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                Notes / Receipt Reference
              </label>
              <input
                type="text"
                placeholder="e.g. 2nd Installment deposit"
                value={paymentInput.notes}
                onChange={e => setPaymentInput({ ...paymentInput, notes: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowPaymentModal(false)}
                style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f1f5f9', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddPayment}
                style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', background: '#10b981', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
