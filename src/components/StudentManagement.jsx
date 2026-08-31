import React, { useState, useEffect, useRef } from 'react';
import logoImg from '../assets/logo.png';
import signatureImg from '../assets/authorized_signature.png';
import {
  subscribeStudents,
  addStudentToFirebase,
  updateStudentInFirebase,
  deleteStudentFromFirebase,
  addPaymentInstallmentToFirebase
} from '../services/firebaseAdminService';

// Course Prices matching exact website pricing with duration in days
export const COURSE_OPTIONS = [
  { name: 'Graphic Designing', price: 20000, desc: 'Professional visual design, Photoshop & Illustrator (45 Days / 1.5 Months).', icon: '🎨', days: 45 },
  { name: 'Video Editing', price: 20000, desc: 'Premiere Pro, After Effects, Reels & Ad editing (45 Days / 1.5 Months).', icon: '🎥', days: 45 },
  { name: 'Cinematography & Film Making', price: 35000, desc: 'Camera, Drone, Lighting, Gimbal & Shoots (60 Days / 2 Months).', icon: '📹', days: 60 },
  { name: 'Social Media Marketing', price: 35000, desc: 'Instagram, YouTube, Google Ads & Monetization (60 Days / 2 Months).', icon: '📱', days: 60 },
  { name: 'Combo 1: Video Editing + Graphic Designing', price: 30000, desc: '🔥 Popular Combo (Saved ₹10,000) - Graphic + Video Suite (90 Days / 3 Months).', icon: '🔥', isCombo: true, days: 90 },
  { name: 'Combo 2: Video Editing + Cinematography & Film Making', price: 45000, desc: '🎬 Master Filmmaker Combo (Saved ₹10,000) - Shoot to Edit Pack (120 Days / 4 Months).', icon: '🎬', isCombo: true, days: 120 }
];

// Helper to auto-calculate Batch End Date based on selected courses
export const calculateBatchEndDate = (startDateStr, selectedCourses = []) => {
  if (!startDateStr) return '';
  const start = parseDate(startDateStr) || new Date();
  
  let maxDays = 45; // Default 45 days
  if (selectedCourses && selectedCourses.length > 0) {
    selectedCourses.forEach(cName => {
      const match = COURSE_OPTIONS.find(c => c.name === cName);
      if (match && match.days && match.days > maxDays) {
        maxDays = match.days;
      }
    });
  }

  const end = new Date(start);
  end.setDate(end.getDate() + maxDays);

  const y = end.getFullYear();
  const m = String(end.getMonth() + 1).padStart(2, '0');
  const d = String(end.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// Robust Date Parsing Helper Function
export const parseDate = (dateVal) => {
  if (!dateVal) return null;
  if (dateVal instanceof Date) return isNaN(dateVal.getTime()) ? null : dateVal;

  let parsed = new Date(dateVal);
  if (!isNaN(parsed.getTime())) return parsed;

  if (typeof dateVal === 'string') {
    const parts = dateVal.trim().split(/[/.-]/);
    if (parts.length === 3) {
      const p1 = parseInt(parts[0], 10);
      const p2 = parseInt(parts[1], 10);
      const p3 = parseInt(parts[2], 10);

      if (p3 > 1000) {
        parsed = new Date(p3, p2 - 1, p1);
        if (!isNaN(parsed.getTime())) return parsed;
      } else if (p1 > 1000) {
        parsed = new Date(p1, p2 - 1, p3);
        if (!isNaN(parsed.getTime())) return parsed;
      }
    }
  }

  return null;
};

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

export const StudentManagement = ({ userRole = 'superadmin' }) => {
  const [activeSubTab, setActiveSubTab] = useState('list'); // 'list', 'new', 'view_form', 'view_student'
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('bawra_registered_students');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilterType, setDateFilterType] = useState('all'); // 'all', 'today', '7days', '30days', 'this_month', 'custom'
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [accountsDateFilterType, setAccountsDateFilterType] = useState('all'); // 'all', 'today', '7days', '30days', 'this_month', 'custom'
  const [accountsCustomStartDate, setAccountsCustomStartDate] = useState('');
  const [accountsCustomEndDate, setAccountsCustomEndDate] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const printRef = useRef(null);

  // New Registration Form Data
  const getInitialFormState = (currentStudents = students) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const initialCourses = ['Graphic Designing'];
    const initialEndDate = calculateBatchEndDate(todayStr, initialCourses);

    return {
      fullName: '',
      guardianName: '',
      dob: '',
      gender: 'Male',
      mobile: '',
      fatherMobile: '',
      email: '',
      address: '',
      city: '',
      courses: initialCourses,
      decTrueInfo: true,
      decFeeTerms: true,
      decFollowRules: true,
      signature: '',
      signatureDate: todayStr,
      registrationId: generateRegistrationId(currentStudents),
      batchAssigned: 'Morning Batch (10 AM - 1 PM)',
      batchStartDate: todayStr,
      batchEndDate: initialEndDate,
      admissionConfirmed: 'Yes',
      totalFee: 20000,
      discountAmount: 0,
      paidAmount: 5000,
      paymentMode: 'Cash',
      receivedBy: 'Bawra Skill House',
      paymentNotes: 'Initial registration deposit',
      adminInternalNotes: ''
    };
  };

  const [formData, setFormData] = useState(() => getInitialFormState([]));

  // New Payment Installment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentInput, setPaymentInput] = useState({ amount: '', mode: 'UPI', notes: '', receivedBy: 'Bawra Skill House' });

  // Save to localStorage as backup
  useEffect(() => {
    localStorage.setItem('bawra_registered_students', JSON.stringify(students));
  }, [students]);

  // Subscribe to Firestore Real-Time Updates for Students
  useEffect(() => {
    const unsubStudents = subscribeStudents((remoteStudents) => {
      setStudents(remoteStudents);
    });

    return () => {
      if (unsubStudents) unsubStudents();
    };
  }, []);

  // Auto-select latest student if available and none selected
  useEffect(() => {
    if (!selectedStudent && students && students.length > 0) {
      setSelectedStudent(students[0]);
    }
  }, [students]);

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

  // Course Toggle & Auto Total Fee Calculation & Auto Batch End Date Handler
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

      // Auto-calculate expected Batch End Date based on course duration
      const newEndDate = calculateBatchEndDate(prev.batchStartDate || prev.signatureDate, updatedCourses);

      return {
        ...prev,
        courses: updatedCourses,
        totalFee: newTotalFee,
        batchEndDate: newEndDate
      };
    });
  };

  const handleBatchStartDateChange = (newStartDateStr) => {
    setFormData(prev => ({
      ...prev,
      batchStartDate: newStartDateStr,
      batchEndDate: calculateBatchEndDate(newStartDateStr, prev.courses)
    }));
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
    const discountNum = parseFloat(formData.discountAmount) || 0;
    const finalFee = Math.max(0, totalFeeNum - discountNum);
    const paidNum = parseFloat(formData.paidAmount) || 0;
    const pendingBalance = finalFee - paidNum;

    const newStudent = {
      ...formData,
      totalFee: totalFeeNum,
      discountAmount: discountNum,
      finalFee: finalFee,
      paidAmount: paidNum,
      pendingBalance: pendingBalance,
      adminInternalNotes: formData.adminInternalNotes || '',
      createdAt: new Date().toISOString(),
      paymentsHistory: paidNum > 0 ? [
        {
          id: `pay_${Date.now()}`,
          date: new Date().toLocaleDateString(),
          amount: paidNum,
          mode: formData.paymentMode,
          receivedBy: formData.receivedBy || 'Bawra Skill House',
          notes: formData.paymentNotes || 'Registration Deposit'
        }
      ] : []
    };

    try {
      const docId = await addStudentToFirebase(newStudent);
      newStudent.id = docId;
      console.log('✅ Firestore student write successful! Doc ID:', docId);
    } catch (err) {
      console.error('❌ Firestore student save failed:', err);
      alert(`⚠️ Firestore Sync Warning: ${err.message}\n(Student saved in local browser storage)`);
      newStudent.id = `std_${Date.now()}`;
    }

    const updated = [newStudent, ...students.filter(s => s.id !== newStudent.id)];
    setStudents(updated);
    setSelectedStudent(newStudent);
    setActiveSubTab('view_form');
    
    // Auto-trigger browser print / save PDF window
    setTimeout(() => {
      window.print();
    }, 400);
  };

  // Add new payment installment
  const handleAddPayment = async () => {
    const amountNum = parseFloat(paymentInput.amount);
    if (!amountNum || amountNum <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }

    if (!selectedStudent) return;

    const discountNum = parseFloat(selectedStudent.discountAmount) || 0;
    const effectiveTotal = (selectedStudent.totalFee || 0) - discountNum;
    const newPaidTotal = (selectedStudent.paidAmount || 0) + amountNum;
    const newPending = effectiveTotal - newPaidTotal;

    const newPaymentEntry = {
      id: `pay_${Date.now()}`,
      date: new Date().toLocaleDateString(),
      amount: amountNum,
      mode: paymentInput.mode,
      notes: paymentInput.notes || 'Installment Payment'
    };

    const updatedHistory = [...(selectedStudent.paymentsHistory || []), newPaymentEntry];

    const updatedStudent = {
      ...selectedStudent,
      paidAmount: newPaidTotal,
      pendingBalance: newPending,
      paymentsHistory: updatedHistory
    };

    // Update in state
    const updatedList = students.map(s => s.id === selectedStudent.id ? updatedStudent : s);
    setStudents(updatedList);
    setSelectedStudent(updatedStudent);

    // Update Firebase Firestore
    try {
      await addPaymentInstallmentToFirebase(selectedStudent.id, newPaidTotal, newPending, updatedHistory);
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
        await deleteStudentFromFirebase(studentId);
      } catch (err) {
        console.warn('Firestore delete notice:', err);
      }
      alert(`Deleted record for ${studentName}`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredStudents = students.filter(s => {
    // 1. Text & Course search filter
    const q = searchTerm.toLowerCase().trim();
    if (q) {
      const coursesStr = (Array.isArray(s.courses) ? s.courses.join(' ') : (s.courses || '')).toLowerCase();
      const matchesSearch = (
        (s.fullName || '').toLowerCase().includes(q) ||
        (s.registrationId || '').toLowerCase().includes(q) ||
        (s.mobile || '').includes(q) ||
        coursesStr.includes(q)
      );
      if (!matchesSearch) return false;
    }

    // 2. Date Range Filter
    if (dateFilterType === 'all') return true;

    const dateVal = s.createdAt || s.signatureDate;
    const studentDate = parseDate(dateVal);
    if (!studentDate) return false;

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (dateFilterType === 'today') {
      return studentDate >= todayStart;
    }

    if (dateFilterType === '7days') {
      const sevenDaysAgo = new Date(todayStart);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return studentDate >= sevenDaysAgo;
    }

    if (dateFilterType === '30days') {
      const thirtyDaysAgo = new Date(todayStart);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return studentDate >= thirtyDaysAgo;
    }

    if (dateFilterType === 'this_month') {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      return studentDate >= monthStart;
    }

    if (dateFilterType === 'custom') {
      if (customStartDate) {
        const start = parseDate(customStartDate);
        if (start) {
          start.setHours(0, 0, 0, 0);
          if (studentDate < start) return false;
        }
      }
      if (customEndDate) {
        const end = parseDate(customEndDate);
        if (end) {
          end.setHours(23, 59, 59, 999);
          if (studentDate > end) return false;
        }
      }
      return true;
    }

    return true;
  });

  // Financial & Master Accounts Calculation
  const totalGrossFee = students.reduce((sum, s) => sum + (s.totalFee || 0), 0);
  const totalDiscount = students.reduce((sum, s) => sum + (s.discountAmount || 0), 0);
  const totalNetFee = Math.max(0, totalGrossFee - totalDiscount);
  const totalCollected = students.reduce((sum, s) => sum + (s.paidAmount || 0), 0);
  const totalPending = Math.max(0, totalNetFee - totalCollected);

  let cashCollected = 0;
  let onlineCollected = 0;
  let bankCollected = 0;

  const allTransactions = [];
  students.forEach(s => {
    if (s.paymentsHistory && s.paymentsHistory.length > 0) {
      s.paymentsHistory.forEach(p => {
        const amt = parseFloat(p.amount) || 0;
        const mode = (p.mode || 'Cash').toLowerCase();
        if (mode.includes('cash')) cashCollected += amt;
        else if (mode.includes('online') || mode.includes('upi')) onlineCollected += amt;
        else bankCollected += amt;

        const txDate = parseDate(p.date) || parseDate(s.createdAt) || parseDate(s.signatureDate) || new Date();

        allTransactions.push({
          id: p.id || `p_${Math.random()}`,
          date: p.date || s.signatureDate || 'N/A',
          rawDate: txDate,
          studentId: s.id,
          studentName: s.fullName,
          registrationId: s.registrationId,
          amount: amt,
          mode: p.mode || 'Cash',
          receivedBy: p.receivedBy || s.receivedBy || 'Bawra Skill House',
          notes: p.notes || 'Fee Installment'
        });
      });
    } else if (s.paidAmount > 0) {
      const amt = parseFloat(s.paidAmount) || 0;
      const mode = (s.paymentMode || 'Cash').toLowerCase();
      if (mode.includes('cash')) cashCollected += amt;
      else if (mode.includes('online') || mode.includes('upi')) onlineCollected += amt;
      else bankCollected += amt;

      const txDate = parseDate(s.createdAt) || parseDate(s.signatureDate) || new Date();

      allTransactions.push({
        id: `init_${s.id}`,
        date: s.signatureDate || (s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')),
        rawDate: txDate,
        studentId: s.id,
        studentName: s.fullName,
        registrationId: s.registrationId,
        amount: amt,
        mode: s.paymentMode || 'Cash',
        receivedBy: s.receivedBy || 'Bawra Skill House',
        notes: 'Initial Registration Deposit'
      });
    }
  });

  allTransactions.sort((a, b) => b.rawDate - a.rawDate);

  // Filter transactions by selected Date Range Filter in Accounts
  const filteredTransactions = allTransactions.filter(tx => {
    if (accountsDateFilterType === 'all') return true;

    const txDate = tx.rawDate;
    if (!txDate || isNaN(txDate.getTime())) return false;

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (accountsDateFilterType === 'today') {
      return txDate >= todayStart;
    }

    if (accountsDateFilterType === '7days') {
      const sevenDaysAgo = new Date(todayStart);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return txDate >= sevenDaysAgo;
    }

    if (accountsDateFilterType === '30days') {
      const thirtyDaysAgo = new Date(todayStart);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return txDate >= thirtyDaysAgo;
    }

    if (accountsDateFilterType === 'this_month') {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      return txDate >= monthStart;
    }

    if (accountsDateFilterType === 'custom') {
      if (accountsCustomStartDate) {
        const start = parseDate(accountsCustomStartDate);
        if (start) {
          start.setHours(0, 0, 0, 0);
          if (txDate < start) return false;
        }
      }
      if (accountsCustomEndDate) {
        const end = parseDate(accountsCustomEndDate);
        if (end) {
          end.setHours(23, 59, 59, 999);
          if (txDate > end) return false;
        }
      }
      return true;
    }

    return true;
  });

  const filteredCollectedTotal = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  let filteredCash = 0;
  let filteredOnline = 0;
  let filteredBank = 0;

  filteredTransactions.forEach(tx => {
    const mode = (tx.mode || 'Cash').toLowerCase();
    if (mode.includes('cash')) filteredCash += tx.amount;
    else if (mode.includes('online') || mode.includes('upi')) filteredOnline += tx.amount;
    else filteredBank += tx.amount;
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
          {userRole === 'superadmin' && (
            <button
              onClick={() => setActiveSubTab('accounts')}
              style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                border: activeSubTab === 'accounts' ? 'none' : '1px solid #cbd5e1',
                backgroundColor: activeSubTab === 'accounts' ? '#10b981' : '#ffffff',
                color: activeSubTab === 'accounts' ? '#ffffff' : '#334155',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              💰 Total Bills & Accounts
            </button>
          )}
        </div>

        {selectedStudent && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', marginRight: '0.2rem' }}>
              Selected: <strong style={{ color: '#0a0e29' }}>{selectedStudent.fullName}</strong>
            </span>
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
                background: activeSubTab === 'view_student' ? '#0a0e29' : '#f1f5f9',
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
          <div style={{
            display: 'flex',
            justify: 'space-between',
            marginBottom: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <input
              type="text"
              placeholder="🔍 Search by name, ID, phone, or course..."
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

            {/* Corner Calendar & Custom Date Range Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginLeft: 'auto' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#475569' }}>
                📅 Filter Date:
              </span>

              <select
                value={dateFilterType}
                onChange={(e) => setDateFilterType(e.target.value)}
                style={{
                  padding: '0.55rem 0.9rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#0f172a',
                  cursor: 'pointer'
                }}
              >
                <option value="all">📅 All Time</option>
                <option value="today">⚡ Today</option>
                <option value="7days">🗓️ Last 7 Days</option>
                <option value="30days">🗓️ Last 30 Days</option>
                <option value="this_month">📊 This Month</option>
                <option value="custom">⚙️ Custom Date Range...</option>
              </select>

              {dateFilterType === 'custom' && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: '#f8fafc',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1'
                }}>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    title="From Date"
                    style={{ padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                  />
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>to</span>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    title="To Date"
                    style={{ padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                  />
                </div>
              )}

              <span style={{ fontSize: '0.85rem', color: '#64748b', marginLeft: '0.4rem' }}>
                Showing <strong>{filteredStudents.length}</strong> students
              </span>
            </div>
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
                    <th style={{ padding: '0.8rem 1rem', textAlign: 'center', width: '80px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((std, idx) => {
                    const totalFee = std.totalFee || 0;
                    const discount = std.discountAmount || 0;
                    const netFee = std.finalFee !== undefined ? std.finalFee : Math.max(0, totalFee - discount);
                    const paid = std.paidAmount || 0;
                    const pending = netFee - paid;
                    const isFullyPaid = pending <= 0;
                    const isSelected = selectedStudent?.id === std.id;

                    return (
                      <tr
                        key={std.id}
                        onClick={() => setSelectedStudent(std)}
                        style={{
                          borderBottom: '1px solid #cbd5e1',
                          borderLeft: isSelected ? '5px solid #2563eb' : '5px solid transparent',
                          backgroundColor: isSelected ? '#dbeafe' : (idx % 2 === 0 ? '#ffffff' : '#f8fafc'),
                          boxShadow: isSelected ? 'inset 0 0 0 1px #93c5fd' : 'none',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <td style={{ padding: '0.8rem 0.6rem', textAlign: 'center', fontWeight: 'bold', color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '0.8rem 1rem', fontWeight: 'bold', color: '#2563eb' }}>{std.registrationId}</td>
                        <td style={{ padding: '0.8rem 1rem', fontWeight: '600' }}>{std.fullName}</td>
                        <td style={{ padding: '0.8rem 1rem' }}>
                          <div style={{ fontWeight: '600' }}>{std.mobile}</div>
                          {(std.fatherMobile || std.whatsapp) && (
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                              Father: {std.fatherMobile || std.whatsapp}
                            </div>
                          )}
                          {std.city && (
                            <div style={{ fontSize: '0.75rem', color: '#0369a1', fontWeight: 'bold' }}>
                              📍 {std.city}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '0.8rem 1rem' }}>
                          {(std.courses || []).join(', ') || 'General'}
                        </td>
                        <td style={{ padding: '0.8rem 1rem' }}>
                          ₹{totalFee.toLocaleString()}
                          {discount > 0 && <div style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 'bold' }}>-₹{discount.toLocaleString()} Off</div>}
                        </td>
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
                        <td style={{ padding: '0.8rem 1rem', textAlign: 'center' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteStudent(std.id, std.fullName);
                            }}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              border: '1px solid #fca5a5',
                              background: '#fee2e2',
                              color: '#ef4444',
                              cursor: 'pointer',
                              fontSize: '0.85rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 0
                            }}
                            title="Delete Student"
                          >
                            🗑️
                          </button>
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

              {/* Father's Mobile No. Lock (Max 10 Digits) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Father's / Parent's Mobile No.</label>
                  <span style={{ fontSize: '0.75rem', color: (formData.fatherMobile || '').length === 10 ? '#16a34a' : '#64748b' }}>
                    {(formData.fatherMobile || '').length}/10 digits
                  </span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="10-digit Father's mobile number"
                  value={formData.fatherMobile || ''}
                  onChange={e => handlePhoneChange('fatherMobile', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: '6px',
                    border: (formData.fatherMobile || '').length === 10 ? '2px solid #16a34a' : '1px solid #cbd5e1'
                  }}
                />
              </div>

              {/* City / District */}
              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>City / District</label>
                <input
                  type="text"
                  placeholder="Enter city (e.g. Sirsa)"
                  value={formData.city || ''}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
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

            {/* Section 2: Course Selection & Combo Offers with Auto Fee Calculation */}
            <h3 style={{ background: '#f97316', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '1rem', marginBottom: '0.5rem' }}>
              2. COURSE SELECTION (Auto Calculates Fee & End Date)
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
              Select single courses or combo offers. Total Course Fee and Expected Batch Completion Date automatically recalculate!
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

            {/* Section 3 & Fees */}
            <h3 style={{ background: '#6b21a8', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '1rem', marginBottom: '1rem' }}>
              3. FEE DETAILS & BATCH TIMINGS
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#15803d' }}>
                  Total Course Fee (Auto Calculated: ₹)
                </label>
                <input
                  type="number"
                  value={formData.totalFee}
                  onChange={e => setFormData({ ...formData, totalFee: parseFloat(e.target.value) || 0 })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '2px solid #16a34a', fontWeight: 'bold', fontSize: '1rem' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#d97706' }}>
                  Discount (in Rupees ₹)
                </label>
                <input
                  type="number"
                  placeholder="Discount in ₹ (e.g. 2000)"
                  value={formData.discountAmount || ''}
                  onChange={e => setFormData({ ...formData, discountAmount: parseFloat(e.target.value) || 0 })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '2px solid #f59e0b', fontWeight: 'bold', fontSize: '1rem' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#2563eb' }}>
                  Final Payable Fee (₹)
                </label>
                <input
                  type="number"
                  readOnly
                  value={Math.max(0, (formData.totalFee || 0) - (formData.discountAmount || 0))}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '2px solid #2563eb', fontWeight: 'bold', fontSize: '1rem', backgroundColor: '#eff6ff' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Amount Paid Now (₹)</label>
                <input
                  type="number"
                  value={formData.paidAmount}
                  onChange={e => setFormData({ ...formData, paidAmount: parseFloat(e.target.value) || 0 })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Paid Through (Payment Mode)</label>
                <select
                  value={formData.paymentMode}
                  onChange={e => setFormData({ ...formData, paymentMode: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="Cash">Cash</option>
                  <option value="Online / UPI">Online / UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Received By (Staff / Counsellor)</label>
                <input
                  type="text"
                  placeholder="Enter receiver name"
                  value={formData.receivedBy}
                  onChange={e => setFormData({ ...formData, receivedBy: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            {/* Batch Info & Dates Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem' }}>Registration ID</label>
                <input
                  type="text"
                  value={formData.registrationId}
                  onChange={e => setFormData({ ...formData, registrationId: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem', color: '#0284c7' }}>
                  🎓 Batch Assigned
                </label>
                <input
                  type="text"
                  placeholder="e.g. Morning 10 AM - 1 PM"
                  value={formData.batchAssigned || ''}
                  onChange={e => setFormData({ ...formData, batchAssigned: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1.5px solid #0284c7', fontWeight: '600', color: '#0369a1' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem', color: '#16a34a' }}>
                  📅 Batch Start Date
                </label>
                <input
                  type="date"
                  value={formData.batchStartDate || ''}
                  onChange={e => handleBatchStartDateChange(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1.5px solid #16a34a', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', fontSize: '0.85rem', color: '#e11d48' }}>
                  🏁 Batch End Date
                </label>
                <input
                  type="date"
                  value={formData.batchEndDate || ''}
                  onChange={e => setFormData({ ...formData, batchEndDate: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1.5px solid #e11d48', fontWeight: 'bold', backgroundColor: '#fff1f2', color: '#9f1239' }}
                />
              </div>
            </div>

            {userRole === 'superadmin' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: '600', fontSize: '0.85rem', color: '#6b21a8' }}>
                  🔒 Internal Admin Notes (Private Office Use)
                </label>
                <input
                  type="text"
                  placeholder="Enter private office note..."
                  value={formData.adminInternalNotes || ''}
                  onChange={e => setFormData({ ...formData, adminInternalNotes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: '6px',
                    border: '1.5px dashed #8b5cf6',
                    backgroundColor: '#f5f3ff',
                    color: '#4c1d95',
                    fontWeight: '500'
                  }}
                />
              </div>
            )}

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

      {/* ================= 3. TOTAL BILLS & ACCOUNTS FINANCIAL DASHBOARD ================= */}
      {activeSubTab === 'accounts' && (
        <div>
          {/* Header & Controls Bar */}
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: 0, color: '#0a0e29', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                💰 Financial Accounts & Master Ledger
              </h2>
              <p style={{ margin: '0.2rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                Complete breakdown of course fees, discounts, collections, pending dues, and payment history logs.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              style={{
                padding: '0.65rem 1.3rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#10b981',
                color: '#ffffff',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              🖨️ Print Financial Statement
            </button>
          </div>

          {/* Calendar & Date Range Filter Toolbar */}
          <div className="no-print" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            marginBottom: '1.5rem',
            background: '#f8fafc',
            padding: '0.8rem 1.2rem',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              📅 Financial Period Filter:
            </span>

            <select
              value={accountsDateFilterType}
              onChange={(e) => setAccountsDateFilterType(e.target.value)}
              style={{
                padding: '0.55rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: '600',
                color: '#0f172a',
                cursor: 'pointer'
              }}
            >
              <option value="all">📅 All Time Total</option>
              <option value="today">⚡ Today's Collections</option>
              <option value="7days">🗓️ Last 7 Days</option>
              <option value="30days">🗓️ Last 30 Days</option>
              <option value="this_month">📊 This Month</option>
              <option value="custom">⚙️ Custom Date Range...</option>
            </select>

            {accountsDateFilterType === 'custom' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#ffffff',
                padding: '0.35rem 0.7rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>From:</span>
                <input
                  type="date"
                  value={accountsCustomStartDate}
                  onChange={(e) => setAccountsCustomStartDate(e.target.value)}
                  style={{ padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
                />
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>To:</span>
                <input
                  type="date"
                  value={accountsCustomEndDate}
                  onChange={(e) => setAccountsCustomEndDate(e.target.value)}
                  style={{ padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
                />
              </div>
            )}

            <div style={{ marginLeft: 'auto', fontSize: '0.9rem', color: '#15803d', fontWeight: 'bold' }}>
              Period Collection: ₹{filteredCollectedTotal.toLocaleString()} ({filteredTransactions.length} Payments)
            </div>
          </div>

          {/* Key Financial Cards (4 Cards Grid) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #0a0e29', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <span style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '800' }}>TOTAL COURSE FEES (GROSS)</span>
              <h3 style={{ fontSize: '1.6rem', margin: '0.4rem 0 0 0', color: '#0a0e29' }}>₹{totalGrossFee.toLocaleString()}</h3>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>For {students.length} registered students</span>
            </div>

            <div style={{ background: '#fffbeb', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #f59e0b', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <span style={{ color: '#b45309', fontSize: '0.8rem', fontWeight: '800' }}>TOTAL DISCOUNT GIVEN</span>
              <h3 style={{ fontSize: '1.6rem', margin: '0.4rem 0 0 0', color: '#d97706' }}>₹{totalDiscount.toLocaleString()}</h3>
              <span style={{ fontSize: '0.78rem', color: '#b45309' }}>Net Payable Fee: ₹{totalNetFee.toLocaleString()}</span>
            </div>

            <div style={{ background: '#f0fdf4', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #16a34a', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <span style={{ color: '#15803d', fontSize: '0.8rem', fontWeight: '800' }}>
                {accountsDateFilterType === 'all' ? 'TOTAL AMOUNT COLLECTED (JAMA)' : 'PERIOD AMOUNT COLLECTED'}
              </span>
              <h3 style={{ fontSize: '1.6rem', margin: '0.4rem 0 0 0', color: '#16a34a' }}>
                ₹{filteredCollectedTotal.toLocaleString()}
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#15803d' }}>
                {accountsDateFilterType === 'all' ? 'Total payments received to date' : 'Collections in selected period'}
              </span>
            </div>

            <div style={{ background: '#fef2f2', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #dc2626', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <span style={{ color: '#b91c1c', fontSize: '0.8rem', fontWeight: '800' }}>REMAINING DUES (PENDING)</span>
              <h3 style={{ fontSize: '1.6rem', margin: '0.4rem 0 0 0', color: '#dc2626' }}>₹{totalPending.toLocaleString()}</h3>
              <span style={{ fontSize: '0.78rem', color: '#b91c1c' }}>Total pending balance across all students</span>
            </div>
          </div>

          {/* Payment Modes Collection Breakdown (3 Cards Grid) */}
          <h3 style={{ margin: '1.5rem 0 1rem 0', color: '#0a0e29', fontSize: '1.1rem' }}>
            💳 Payment Method Breakdown {accountsDateFilterType !== 'all' && '(Filtered Period)'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem', marginBottom: '2rem' }}>
            <div style={{ background: '#ffffff', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.3rem' }}>💵</span>
                <span style={{ fontWeight: 'bold', color: '#334155' }}>Cash Collections</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', margin: 0, color: '#059669' }}>₹{filteredCash.toLocaleString()}</h3>
            </div>

            <div style={{ background: '#ffffff', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.3rem' }}>📱</span>
                <span style={{ fontWeight: 'bold', color: '#334155' }}>Online / UPI Collections</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', margin: 0, color: '#2563eb' }}>₹{filteredOnline.toLocaleString()}</h3>
            </div>

            <div style={{ background: '#ffffff', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.3rem' }}>🏦</span>
                <span style={{ fontWeight: 'bold', color: '#334155' }}>Bank / Cheque Collections</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', margin: 0, color: '#7c3aed' }}>₹{filteredBank.toLocaleString()}</h3>
            </div>
          </div>

          {/* Master Payment Transactions & Ledger Table */}
          <h3 style={{ margin: '1.5rem 0 1rem 0', color: '#0a0e29', fontSize: '1.1rem' }}>
            📜 Master Payment Transactions Log ({filteredTransactions.length} Transactions)
          </h3>

          {filteredTransactions.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
              <p style={{ color: '#64748b' }}>No transaction history found for the selected date range filter.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#0a0e29', color: '#fff' }}>
                    <th style={{ padding: '0.8rem 0.6rem', textAlign: 'center', width: '50px' }}>#</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Date</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Reg ID</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Student Name</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Amount Paid</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Mode</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Received By</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Remarks / Notes</th>
                    <th style={{ padding: '0.8rem 1rem', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx, idx) => (
                    <tr key={tx.id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                      <td style={{ padding: '0.8rem 0.6rem', textAlign: 'center', fontWeight: 'bold', color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ padding: '0.8rem 1rem', fontWeight: '600', color: '#475569' }}>{tx.date}</td>
                      <td style={{ padding: '0.8rem 1rem', fontWeight: 'bold', color: '#2563eb' }}>{tx.registrationId}</td>
                      <td style={{ padding: '0.8rem 1rem', fontWeight: 'bold', color: '#0f172a' }}>{tx.studentName}</td>
                      <td style={{ padding: '0.8rem 1rem', color: '#16a34a', fontWeight: '800', fontSize: '0.95rem' }}>
                        ₹{tx.amount.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.8rem 1rem' }}>
                        <span style={{
                          padding: '0.2rem 0.6rem',
                          borderRadius: '12px',
                          fontSize: '0.78rem',
                          fontWeight: 'bold',
                          backgroundColor: tx.mode.includes('Cash') ? '#ecfdf5' : '#eff6ff',
                          color: tx.mode.includes('Cash') ? '#047857' : '#1d4ed8'
                        }}>
                          {tx.mode}
                        </span>
                      </td>
                      <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>{tx.receivedBy}</td>
                      <td style={{ padding: '0.8rem 1rem', color: '#64748b', fontSize: '0.85rem' }}>{tx.notes}</td>
                      <td style={{ padding: '0.8rem 1rem', textAlign: 'center' }}>
                        <button
                          onClick={() => {
                            const foundStudent = students.find(s => s.id === tx.studentId);
                            if (foundStudent) {
                              setSelectedStudent(foundStudent);
                              setActiveSubTab('view_student');
                            }
                          }}
                          style={{
                            padding: '0.35rem 0.75rem',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            background: '#f8fafc',
                            color: '#0f172a',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            fontWeight: '600'
                          }}
                        >
                          💳 View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ================= 4. GENERATED REGISTRATION FORM (PRINTABLE) ================= */}
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
                    <span className="underline-label">Father's Mobile No.:</span>
                    <span className="underline-val">{selectedStudent.fatherMobile || selectedStudent.whatsapp || '—'}</span>
                  </div>
                </div>

                <div className="grid-2col">
                  <div className="underline-row">
                    <span className="underline-label">Email Address:</span>
                    <span className="underline-val">{selectedStudent.email || '—'}</span>
                  </div>
                  <div className="underline-row">
                    <span className="underline-label">City / District:</span>
                    <span className="underline-val" style={{ fontWeight: 'bold' }}>{selectedStudent.city || '—'}</span>
                  </div>
                </div>

                <div className="underline-row">
                  <span className="underline-label">Address:</span>
                  <span className="underline-val">{selectedStudent.address || '—'}</span>
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="form-section-box">
                <div className="sec-heading" style={{ background: '#f97316' }}>
                  <span className="sec-num-badge" style={{ color: '#f97316' }}>2</span>
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

              {/* SECTION 3 */}
              <div className="form-section-box">
                <div className="sec-heading" style={{ background: '#6b21a8' }}>
                  <span className="sec-num-badge" style={{ color: '#6b21a8' }}>3</span>
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
                    <span className="underline-val"></span>
                  </div>
                  <div className="underline-row">
                    <span className="underline-label">Date:</span>
                    <span className="underline-val">{selectedStudent.signatureDate || new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* SECTION 4 */}
              <div className="form-section-box" style={{ borderColor: '#0284c7' }}>
                <div className="sec-heading" style={{ background: '#0284c7' }}>
                  <span className="sec-num-badge" style={{ color: '#0284c7' }}>4</span>
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

                <div className="grid-2col">
                  <div className="underline-row">
                    <span className="underline-label">Batch Start Date:</span>
                    <span className="underline-val">{selectedStudent.batchStartDate || selectedStudent.signatureDate || '—'}</span>
                  </div>
                  <div className="underline-row">
                    <span className="underline-label">Batch End Date:</span>
                    <span className="underline-val" style={{ color: '#e11d48', fontWeight: 'bold' }}>{selectedStudent.batchEndDate || '—'}</span>
                  </div>
                </div>

                <div className="grid-2col">
                  <div className="underline-row">
                    <span className="underline-label">Total Course Fee:</span>
                    <span className="underline-val">₹{(selectedStudent.totalFee || 0).toLocaleString()}</span>
                  </div>
                  <div className="underline-row">
                    <span className="underline-label">Discount Offered:</span>
                    <span className="underline-val" style={{ color: '#d97706', fontWeight: 'bold' }}>
                      {selectedStudent.discountAmount ? `₹${selectedStudent.discountAmount.toLocaleString()}` : 'None'}
                    </span>
                  </div>
                </div>

                <div className="grid-2col">
                  <div className="underline-row">
                    <span className="underline-label">Amount Paid:</span>
                    <span className="underline-val" style={{ color: '#16a34a', fontWeight: 'bold' }}>₹{(selectedStudent.paidAmount || 0).toLocaleString()}</span>
                  </div>
                  <div className="underline-row">
                    <span className="underline-label">Remaining Balance:</span>
                    <span className="underline-val" style={{ color: '#dc2626', fontWeight: 'bold' }}>
                      ₹{Math.max(0, ((selectedStudent.totalFee || 0) - (selectedStudent.discountAmount || 0)) - (selectedStudent.paidAmount || 0)).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="underline-row" style={{ marginTop: '8px' }}>
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
              <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '0.3rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span>ID: <strong style={{ color: '#2563eb' }}>{selectedStudent.registrationId}</strong></span>
                <span>• Phone: <strong>{selectedStudent.mobile}</strong></span>
                {(selectedStudent.fatherMobile || selectedStudent.whatsapp) && (
                  <span>• Father's: <strong>{selectedStudent.fatherMobile || selectedStudent.whatsapp}</strong></span>
                )}
                {selectedStudent.city && <span>• City: <strong style={{ color: '#0369a1' }}>📍 {selectedStudent.city}</strong></span>}
                <span>• Batch: <strong>{selectedStudent.batchAssigned || 'Regular'}</strong></span>
                {selectedStudent.batchStartDate && <span>• Start: <strong>{selectedStudent.batchStartDate}</strong></span>}
                {selectedStudent.batchEndDate && <span>• End: <strong style={{ color: '#e11d48' }}>{selectedStudent.batchEndDate}</strong></span>}
              </div>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #0a0e29' }}>
              <span style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 'bold' }}>TOTAL COURSE FEE</span>
              <h3 style={{ fontSize: '1.5rem', margin: '0.4rem 0 0 0', color: '#0a0e29' }}>₹{(selectedStudent.totalFee || 0).toLocaleString()}</h3>
            </div>

            <div style={{ background: '#fffbeb', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #f59e0b' }}>
              <span style={{ color: '#b45309', fontSize: '0.8rem', fontWeight: 'bold' }}>DISCOUNT OFFERED</span>
              <h3 style={{ fontSize: '1.5rem', margin: '0.4rem 0 0 0', color: '#d97706' }}>₹{(selectedStudent.discountAmount || 0).toLocaleString()}</h3>
            </div>

            <div style={{ background: '#f0fdf4', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #16a34a' }}>
              <span style={{ color: '#15803d', fontSize: '0.8rem', fontWeight: 'bold' }}>AMOUNT PAID (JAMA)</span>
              <h3 style={{ fontSize: '1.5rem', margin: '0.4rem 0 0 0', color: '#16a34a' }}>₹{(selectedStudent.paidAmount || 0).toLocaleString()}</h3>
            </div>

            <div style={{ background: '#fef2f2', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #dc2626' }}>
              <span style={{ color: '#b91c1c', fontSize: '0.8rem', fontWeight: 'bold' }}>REMAINING BALANCE (BAKAYA)</span>
              <h3 style={{ fontSize: '1.5rem', margin: '0.4rem 0 0 0', color: '#dc2626' }}>
                ₹{Math.max(0, ((selectedStudent.totalFee || 0) - (selectedStudent.discountAmount || 0)) - (selectedStudent.paidAmount || 0)).toLocaleString()}
              </h3>
            </div>
          </div>

          {/* Private Internal Admin Notes Box (Super Admin Only) */}
          {userRole === 'superadmin' && (
            <div style={{
              marginBottom: '2rem',
              padding: '1.2rem',
              background: '#f5f3ff',
              borderRadius: '10px',
              border: '1.5px dashed #8b5cf6'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#6b21a8', fontSize: '0.95rem' }}>
                  🔒 Private Internal Office Notes (Super Admin Only - Hidden from Student Print)
                </strong>
              </div>
              <textarea
                rows="2"
                placeholder="Enter private internal office notes..."
                value={selectedStudent.adminInternalNotes || ''}
                onChange={async (e) => {
                  const updatedNotes = e.target.value;
                  const updatedStudent = { ...selectedStudent, adminInternalNotes: updatedNotes };
                  setSelectedStudent(updatedStudent);
                  const updatedList = students.map(s => s.id === selectedStudent.id ? updatedStudent : s);
                  setStudents(updatedList);
                  try {
                    await updateStudentInFirebase(selectedStudent.id, { adminInternalNotes: updatedNotes });
                  } catch (err) {
                    console.warn('Firestore update notes notice:', err);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '6px',
                  border: '1px solid #ddd6fe',
                  backgroundColor: '#ffffff',
                  color: '#4c1d95',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              ></textarea>
            </div>
          )}

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
                    <span className="receipt-field-label">Paid Through</span>
                    <div className="receipt-field-dots-container">
                      <span className="receipt-field-val-text">
                        {selectedStudent.paymentMode || (selectedStudent.paymentsHistory && selectedStudent.paymentsHistory[selectedStudent.paymentsHistory.length - 1]?.mode) || 'Cash'}
                      </span>
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

                  {selectedStudent.discountAmount > 0 && (
                    <div className="receipt-field-row">
                      <span className="receipt-field-label">Discount</span>
                      <div className="receipt-field-dots-container">
                        <span className="receipt-field-val-text">₹{(selectedStudent.discountAmount).toLocaleString()}/-</span>
                      </div>
                    </div>
                  )}

                  <div className="receipt-field-row">
                    <span className="receipt-field-label">Due Amount</span>
                    <div className="receipt-field-dots-container">
                      <span className="receipt-field-val-text">
                        ₹{Math.max(0, ((selectedStudent.totalFee || 0) - (selectedStudent.discountAmount || 0)) - (selectedStudent.paidAmount || 0)).toLocaleString()}/-
                      </span>
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
                  <div className="receipt-field-dots-container">
                    <span className="receipt-field-val-text">
                      {selectedStudent.receivedBy || (selectedStudent.paymentsHistory && selectedStudent.paymentsHistory[selectedStudent.paymentsHistory.length - 1]?.receivedBy) || 'Bawra Skill House'}
                    </span>
                  </div>
                </div>

                <div className="receipt-field-row" style={{ width: '48%', marginBottom: 0, position: 'relative' }}>
                  <span className="receipt-field-label">Authorized Signature</span>
                  <div className="receipt-field-dots-container" style={{ position: 'relative', overflow: 'visible' }}>
                    <img
                      src={signatureImg}
                      alt="Authorized Signature"
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '45px',
                        height: '45px',
                        objectFit: 'contain',
                        mixBlendMode: 'multiply'
                      }}
                    />
                  </div>
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
