import { db, storage } from '../firebase';
import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// ==========================================
// 1. STUDENTS MANAGEMENT SERVICE
// ==========================================

/**
 * Subscribe to real-time updates for Students collection
 * @param {Function} callback - Function called with updated students array
 * @returns {Function} Unsubscribe function
 */
export const subscribeStudents = (callback) => {
  try {
    const colRef = collection(db, 'students');
    return onSnapshot(colRef, (snapshot) => {
      const studentsList = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const history = (data.paymentsHistory && Array.isArray(data.paymentsHistory)) ? data.paymentsHistory.map((p, idx) => ({
          ...p,
          receiptNo: p.receiptNo || `REC-${data.registrationId || 'BSH'}-${idx + 1}`
        })) : [];

        studentsList.push({
          id: docSnap.id,
          ...data,
          paymentsHistory: history
        });
      });
      // Sort client-side by newest first (createdAt / signatureDate / registrationId descending)
      studentsList.sort((a, b) => {
        const getTs = (val) => {
          if (!val) return 0;
          const d = new Date(val);
          return isNaN(d.getTime()) ? 0 : d.getTime();
        };
        const timeA = getTs(a.createdAt) || getTs(a.signatureDate);
        const timeB = getTs(b.createdAt) || getTs(b.signatureDate);
        const diff = timeB - timeA;
        if (diff !== 0) return diff;
        return (b.registrationId || '').localeCompare(a.registrationId || '', undefined, { numeric: true, sensitivity: 'base' });
      });
      callback(studentsList);
    }, (error) => {
      console.warn('Firestore real-time students subscription warning:', error);
    });
  } catch (err) {
    console.warn('Failed to subscribe to students collection:', err);
    return () => {};
  }
};

/**
 * Add a new student to Firestore
 * @param {Object} studentData 
 * @returns {Promise<string>} Firestore document ID
 */
export const addStudentToFirebase = async (studentData) => {
  try {
    const docRef = await addDoc(collection(db, 'students'), {
      ...studentData,
      createdAt: studentData.createdAt || new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    console.error('Error adding student to Firestore:', err);
    throw err;
  }
};

/**
 * Update an existing student in Firestore
 * @param {string} studentId 
 * @param {Object} updateData 
 */
export const updateStudentInFirebase = async (studentId, updateData) => {
  try {
    const studentRef = doc(db, 'students', studentId);
    await updateDoc(studentRef, {
      ...updateData,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error updating student in Firestore:', err);
    throw err;
  }
};

/**
 * Delete a student from Firestore
 * @param {string} studentId 
 */
export const deleteStudentFromFirebase = async (studentId) => {
  try {
    const studentRef = doc(db, 'students', studentId);
    await deleteDoc(studentRef);
  } catch (err) {
    console.error('Error deleting student from Firestore:', err);
    throw err;
  }
};

/**
 * Add a payment installment for a student in Firestore
 * @param {string} studentId 
 * @param {number} newPaidTotal 
 * @param {number} newPendingBalance 
 * @param {Array} updatedHistory 
 */
export const addPaymentInstallmentToFirebase = async (studentId, newPaidTotal, newPendingBalance, updatedHistory, adminInternalNotes) => {
  try {
    const studentRef = doc(db, 'students', studentId);
    const updateData = {
      paidAmount: newPaidTotal,
      pendingBalance: newPendingBalance,
      paymentsHistory: updatedHistory,
      updatedAt: new Date().toISOString()
    };
    if (adminInternalNotes !== undefined) {
      updateData.adminInternalNotes = adminInternalNotes;
    }
    await updateDoc(studentRef, updateData);
  } catch (err) {
    console.error('Error recording payment installment in Firestore:', err);
    throw err;
  }
};

// ==========================================
// 2. LEADS & ENQUIRIES MANAGEMENT SERVICE
// ==========================================

/**
 * Subscribe to real-time updates for Leads & Enquiries
 * @param {Function} callback - Callback receiving combined leads array
 * @returns {Function} Unsubscribe function
 */
export const subscribeLeads = (callback) => {
  try {
    const enrollmentsRef = collection(db, 'enrollments');
    const enquiriesRef = collection(db, 'enquiries');

    let enrollmentsList = [];
    let enquiriesList = [];

    const notify = () => {
      const combined = [...enrollmentsList, ...enquiriesList].sort((a, b) => {
        const timeA = new Date(a.submittedAt || 0).getTime();
        const timeB = new Date(b.submittedAt || 0).getTime();
        return timeB - timeA;
      });
      callback(combined);
    };

    const unsubEnrollments = onSnapshot(enrollmentsRef, (snap) => {
      enrollmentsList = snap.docs.map(docSnap => ({
        id: docSnap.id,
        collectionName: 'enrollments',
        type: 'Enrollment',
        status: docSnap.data().status || 'New',
        ...docSnap.data()
      }));
      notify();
    }, (err) => console.warn('Enrollments subscription warning:', err));

    const unsubEnquiries = onSnapshot(enquiriesRef, (snap) => {
      enquiriesList = snap.docs.map(docSnap => ({
        id: docSnap.id,
        collectionName: 'enquiries',
        type: 'Enquiry',
        status: docSnap.data().status || 'New',
        ...docSnap.data()
      }));
      notify();
    }, (err) => console.warn('Enquiries subscription warning:', err));

    return () => {
      unsubEnrollments();
      unsubEnquiries();
    };
  } catch (err) {
    console.warn('Failed to subscribe leads:', err);
    return () => {};
  }
};

/**
 * Update lead status in Firestore (e.g. 'New', 'Contacted', 'Enrolled', 'Closed')
 * @param {string} collectionName ('enrollments' | 'enquiries')
 * @param {string} leadId 
 * @param {string} newStatus 
 */
export const updateLeadStatusInFirebase = async (collectionName, leadId, newStatus) => {
  try {
    const leadRef = doc(db, collectionName, leadId);
    await updateDoc(leadRef, {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error updating lead status:', err);
    throw err;
  }
};

/**
 * Delete a lead from Firestore
 * @param {string} collectionName 
 * @param {string} leadId 
 */
export const deleteLeadFromFirebase = async (collectionName, leadId) => {
  try {
    const leadRef = doc(db, collectionName, leadId);
    await deleteDoc(leadRef);
  } catch (err) {
    console.error('Error deleting lead:', err);
    throw err;
  }
};

// ==========================================
// 3. ADMIN CUSTOM OPTIONS SERVICE
// ==========================================

/**
 * Subscribe to Admin Custom Options in Firestore
 * @param {Function} callback 
 * @returns {Function} Unsubscribe function
 */
export const subscribeAdminOptions = (callback) => {
  try {
    return onSnapshot(collection(db, 'adminCustomOptions'), (snap) => {
      const items = [];
      snap.forEach(docSnap => {
        items.push({
          firestoreDocId: docSnap.id,
          ...docSnap.data()
        });
      });
      callback(items);
    }, (err) => {
      console.warn('Admin custom options subscription notice:', err);
    });
  } catch (err) {
    console.warn('Failed to subscribe admin custom options:', err);
    return () => {};
  }
};

/**
 * Save custom option to Firestore
 * @param {Object} optionItem 
 */
export const saveAdminOptionToFirebase = async (optionItem) => {
  try {
    const docRef = doc(db, 'adminCustomOptions', optionItem.key);
    await setDoc(docRef, {
      ...optionItem,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error('Error saving custom option to Firestore:', err);
    throw err;
  }
};

/**
 * Delete custom option from Firestore
 * @param {string} key 
 */
export const deleteAdminOptionFromFirebase = async (key) => {
  try {
    const docRef = doc(db, 'adminCustomOptions', key);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Error deleting custom option from Firestore:', err);
    throw err;
  }
};

// ==========================================
// 4. SITE MEDIA & FILE STORAGE SERVICE
// ==========================================

/**
 * Upload file to Firebase Storage and return public download URL
 * @param {File} file 
 * @param {string} pathPrefix 
 * @returns {Promise<string>} Download URL
 */
export const uploadFileToFirebaseStorage = async (file, pathPrefix = 'admin_media') => {
  try {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storageRef = ref(storage, `${pathPrefix}/${Date.now()}_${cleanFileName}`);
    const uploadResult = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(uploadResult.ref);
    return downloadURL;
  } catch (err) {
    console.error('Firebase Storage upload error:', err);
    throw err;
  }
};

/**
 * Subscribe to Site Media settings in Firestore
 * @param {Function} callback 
 * @returns {Function} Unsubscribe function
 */
export const subscribeSiteMedia = (callback) => {
  try {
    return onSnapshot(doc(db, 'siteSettings', 'media'), (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data());
      }
    }, (err) => {
      console.warn('Site media subscription notice:', err);
    });
  } catch (err) {
    console.warn('Failed to subscribe site media:', err);
    return () => {};
  }
};

/**
 * Update media key-value in Firestore 'siteSettings/media' doc
 * @param {string} key 
 * @param {string} urlValue 
 */
export const updateSiteMediaInFirebase = async (key, urlValue) => {
  try {
    const docRef = doc(db, 'siteSettings', 'media');
    await setDoc(docRef, {
      [key]: urlValue,
      lastUpdated: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error('Error updating site media in Firestore:', err);
    throw err;
  }
};
