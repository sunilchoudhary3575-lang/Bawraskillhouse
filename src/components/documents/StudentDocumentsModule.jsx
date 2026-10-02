import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import StudentIDCardTemplate from './StudentIDCardTemplate';
import CertificateTemplate from './CertificateTemplate';
import { saveCertificateMetadataInFirebase } from '../../services/firebaseAdminService';
import './documents.css';

/**
 * Preview Container for Certificate Canvas
 * Renders full-width responsive SVG vector certificate.
 */
const CertificatePreviewContainer = ({ children }) => {
  return (
    <div style={{ width: '100%', maxWidth: '1050px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
      {children}
    </div>
  );
};

/**
 * Main Student Documents Module Component
 * Handles Student ID Cards & Course Completion Certificates for Bawra Skill House Admin Panel.
 */
export const StudentDocumentsModule = ({
  students = [],
  selectedStudent = null,
  setSelectedStudent = () => {}
}) => {
  // Document Type State: 'id_card' | 'certificate'
  const [docType, setDocType] = useState('certificate');

  // ID Card Sub-view: 'both' | 'front' | 'back'
  const [idSide, setIdSide] = useState('both');

  // ID Card Print Mode: 'single' | 'batch'
  const [idPrintMode, setIdPrintMode] = useState('single');

  // Selected Student IDs for Batch ID Card Printing
  const [selectedBatchIds, setSelectedBatchIds] = useState([]);

  // Auto-initialize batch selected IDs when students list changes
  useEffect(() => {
    if (Array.isArray(students) && students.length > 0 && selectedBatchIds.length === 0) {
      setSelectedBatchIds(students.map(s => s.id));
    }
  }, [students]);

  // Toggle single student check in batch mode
  const handleToggleBatchStudent = (stdId) => {
    setSelectedBatchIds(prev =>
      prev.includes(stdId) ? prev.filter(id => id !== stdId) : [...prev, stdId]
    );
  };

  // Select all / Deselect all in batch mode
  const handleSelectAllBatch = () => {
    if (selectedBatchIds.length === students.length) {
      setSelectedBatchIds([]);
    } else {
      setSelectedBatchIds(students.map(s => s.id));
    }
  };

  // Helper chunk array into groups of 3 (for 3 cards per A4 Portrait page)
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  // Sync document body print orientation class (Landscape for Cert, Portrait for ID Card)
  useEffect(() => {
    if (docType === 'certificate') {
      document.body.classList.add('doc-print-landscape');
      document.body.classList.remove('doc-print-portrait');
    } else {
      document.body.classList.add('doc-print-portrait');
      document.body.classList.remove('doc-print-landscape');
    }
    return () => {
      document.body.classList.remove('doc-print-landscape', 'doc-print-portrait');
    };
  }, [docType]);

  // Certificate Unique Identifier Generator
  const generateCertNo = (std) => {
    const today = new Date();
    const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    const seq = std ? String(std.registrationId || std.id || '101').slice(-3) : '001';
    return `BSH-CERT-${dateStr}-${seq}`;
  };

  // Certificate Form Options State
  const [certForm, setCertForm] = useState({
    certificateNumber: generateCertNo(selectedStudent),
    courseName: '',
    duration: '45 DAYS',
    issueDate: new Date().toLocaleDateString('en-GB'),
    allowCourseEdit: false
  });

  // ID Card Options State
  const [idOptions, setIdOptions] = useState({
    studentId: '',
    batch: ''
  });

  // Sync form when selected student changes
  useEffect(() => {
    if (selectedStudent) {
      const defaultCourse = Array.isArray(selectedStudent.courses) && selectedStudent.courses.length > 0
        ? selectedStudent.courses.join(' + ')
        : (typeof selectedStudent.courses === 'string' ? selectedStudent.courses : 'VIDEO EDITING + GRAPHIC DESIGNING');

      let defaultRegId = selectedStudent.registrationId || selectedStudent.studentId || '0033';
      const digitsMatch = String(defaultRegId).match(/\d+$/);
      if (digitsMatch) {
        const numStr = digitsMatch[0];
        defaultRegId = numStr.length >= 4 ? numStr.slice(-4) : numStr.padStart(4, '0');
      }

      setCertForm(prev => ({
        ...prev,
        certificateNumber: generateCertNo(selectedStudent),
        courseName: defaultCourse,
        issueDate: selectedStudent.signatureDate
          ? selectedStudent.signatureDate.split('-').reverse().join('/')
          : new Date().toLocaleDateString('en-GB')
      }));

      setIdOptions(prev => ({
        ...prev,
        studentId: defaultRegId
      }));
    }
  }, [selectedStudent]);

  // Search input state inside document module
  const [searchQuery, setSearchQuery] = useState('');

  // Handle student change from dropdown
  const handleStudentSelect = (e) => {
    const studentId = e.target.value;
    const found = students.find(s => s.id === studentId);
    if (found) {
      setSelectedStudent(found);
    }
  };

  // Filtered students for dropdown
  const filteredStudents = searchQuery.trim()
    ? students.filter(s =>
        (s.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.registrationId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.mobile || '').includes(searchQuery)
      )
    : students;

  const hasPhoto = Boolean(selectedStudent?.studentPhotoUrl || selectedStudent?.studentPhoto);

  // Direct PDF File Download Handler (saves file directly without opening print dialog)
  const handleDownloadPDF = async () => {
    if (!selectedStudent) {
      alert('Please select a student first!');
      return;
    }

    if (docType === 'id_card' && !hasPhoto) {
      alert('⚠️ Photo Required for ID Card!\n\nStudent photograph is missing. Please edit student profile and upload a photo before downloading the ID Card.');
      return;
    }

    const docElementId = docType === 'id_card'
      ? `id-card-front-${selectedStudent.id}`
      : `certificate-doc-${selectedStudent.id}`;

    const targetEl = document.getElementById(docElementId) || document.querySelector('.bsh-certificate');

    if (!targetEl) {
      alert('Document preview element not found.');
      return;
    }

    const cleanName = (selectedStudent.fullName || 'Student').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = docType === 'id_card'
      ? `${cleanName}_ID_Card.pdf`
      : `${cleanName}_Course_Certificate.pdf`;

    const opt = {
      margin: 0,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2.5, useCORS: true, logging: false },
      jsPDF: {
        unit: 'mm',
        format: docType === 'id_card' ? [100, 160] : 'a4',
        orientation: docType === 'id_card' ? 'portrait' : 'landscape'
      }
    };

    try {
      await html2pdf().set(opt).from(targetEl).save();
    } catch (err) {
      console.warn('Direct PDF download fallback to print:', err);
      handlePrintDocument();
    }
  };

  // Generate & Store Certificate Metadata in Firestore + Direct PDF Download
  const handleGenerateCertificate = async () => {
    if (!selectedStudent) {
      alert('Please select a student first!');
      return;
    }

    const certMeta = {
      studentId: selectedStudent.id,
      studentName: selectedStudent.fullName,
      registrationId: selectedStudent.registrationId,
      certificateNumber: certForm.certificateNumber,
      courseName: certForm.courseName,
      duration: certForm.duration,
      issueDate: certForm.issueDate,
      generatedAt: new Date().toISOString(),
      generatedBy: 'Admin Portal'
    };

    try {
      await saveCertificateMetadataInFirebase(certMeta);
    } catch (err) {
      console.warn('Metadata save notice:', err);
    }

    // Direct PDF File Download without opening print window
    await handleDownloadPDF();
  };

  // Print Document Handler (triggers native browser print dialog with @media print CSS)
  const handlePrintDocument = async () => {
    if (!selectedStudent) {
      alert('Please select a student to print documents!');
      return;
    }

    if (docType === 'id_card' && !hasPhoto) {
      alert('⚠️ Photo Required for ID Card!\n\nStudent photograph is missing. Please edit student details and upload a photo before printing or downloading the Student ID Card.');
      return;
    }

    if (docType === 'certificate') {
      const certMeta = {
        studentId: selectedStudent.id,
        studentName: selectedStudent.fullName,
        registrationId: selectedStudent.registrationId,
        certificateNumber: certForm.certificateNumber,
        courseName: certForm.courseName,
        duration: certForm.duration,
        issueDate: certForm.issueDate,
        generatedAt: new Date().toISOString(),
        generatedBy: 'Admin Portal'
      };

      try {
        await saveCertificateMetadataInFirebase(certMeta);
      } catch (err) {
        console.warn('Metadata save notice:', err);
      }
    }

    window.print();
  };

  // WhatsApp Share Notification
  const handleShareWhatsApp = () => {
    if (!selectedStudent) return;
    const phone = (selectedStudent.mobile || selectedStudent.phone || '').replace(/\D/g, '');
    const docName = docType === 'id_card' ? 'Student ID Card' : 'Course Completion Certificate';
    const message = `Hello ${selectedStudent.fullName},\n\nYour official *${docName}* from Bawra Skill House has been generated!\n\nStudent ID: ${selectedStudent.registrationId || 'BSH-0001'}\nCertificate No: ${certForm.certificateNumber}\nCourse: ${certForm.courseName}\n\nPlease visit the administration desk to collect your document.\n\nWarm regards,\nBawra Skill House`;

    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="documents-module-container">
      {/* Module Header Bar */}
      <div className="documents-header-bar">
        <div className="documents-title-group">
          <h2>📄 Student Documents Generator</h2>
          <p>Generate & Print Official Student ID Cards and Course Completion Certificates</p>
        </div>

        {/* Document Type Selector (ID Card vs Certificate) */}
        <div className="doc-type-selector">
          <button
            className={`doc-type-btn ${docType === 'certificate' ? 'active' : ''}`}
            onClick={() => setDocType('certificate')}
          >
            📜 Course Certificate
          </button>
          <button
            className={`doc-type-btn ${docType === 'id_card' ? 'active' : ''}`}
            onClick={() => setDocType('id_card')}
          >
            🎴 Student ID Card
          </button>
        </div>
      </div>

      {/* Control Grid: Student Selector & Admin Form */}
      <div className="documents-control-grid">
        {/* Student Selector Dropdown */}
        <div className="doc-control-field">
          <label>Student Name (Read-Only)</label>
          <select value={selectedStudent?.id || ''} onChange={handleStudentSelect}>
            <option value="" disabled>-- Select Student --</option>
            {filteredStudents.map(std => (
              <option key={std.id} value={std.id}>
                {std.fullName} ({std.registrationId || 'BSH'}) - {Array.isArray(std.courses) ? std.courses.join(', ') : std.courses}
              </option>
            ))}
          </select>
        </div>

        {/* Certificate Admin Form */}
        {docType === 'certificate' && (
          <>
            <div className="doc-control-field">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label>Course Title</label>
                <button
                  type="button"
                  onClick={() => setCertForm({ ...certForm, allowCourseEdit: !certForm.allowCourseEdit })}
                  style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {certForm.allowCourseEdit ? '🔒 Lock' : '✏️ Correct Course'}
                </button>
              </div>
              <input
                type="text"
                readOnly={!certForm.allowCourseEdit}
                value={certForm.courseName}
                onChange={(e) => setCertForm({ ...certForm, courseName: e.target.value })}
                style={{ backgroundColor: certForm.allowCourseEdit ? '#ffffff' : '#f1f5f9' }}
              />
            </div>

            <div className="doc-control-field">
              <label>Duration (Editable)</label>
              <input
                type="text"
                value={certForm.duration}
                onChange={(e) => setCertForm({ ...certForm, duration: e.target.value })}
                placeholder="e.g. 45 DAYS"
              />
            </div>

            <div className="doc-control-field">
              <label>Issue Date (DD/MM/YYYY)</label>
              <input
                type="text"
                value={certForm.issueDate}
                onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                placeholder="e.g. 30/09/2026"
              />
            </div>

            <div className="doc-control-field">
              <label>Certificate Number</label>
              <input
                type="text"
                value={certForm.certificateNumber}
                onChange={(e) => setCertForm({ ...certForm, certificateNumber: e.target.value })}
              />
            </div>
          </>
        )}

        {/* ID Card Sub-controls */}
        {docType === 'id_card' && (
          <>
            <div className="doc-control-field">
              <label>ID Print Mode</label>
              <select value={idPrintMode} onChange={(e) => setIdPrintMode(e.target.value)}>
                <option value="single">Single Student ID Card</option>
                <option value="batch">📦 Batch Multi-Student (3 Cards / A4 Sheet)</option>
              </select>
            </div>

            <div className="doc-control-field">
              <label>ID Card View</label>
              <select value={idSide} onChange={(e) => setIdSide(e.target.value)}>
                <option value="both">Both Sides (Front & Back)</option>
                <option value="front">Front Side Only</option>
                <option value="back">Back Side Only</option>
              </select>
            </div>

            {idPrintMode === 'single' && (
              <div className="doc-control-field">
                <label>Student ID (Editable)</label>
                <input
                  type="text"
                  value={idOptions.studentId}
                  onChange={(e) => setIdOptions({ ...idOptions, studentId: e.target.value })}
                  placeholder="e.g. 0033"
                />
              </div>
            )}

            <div className="doc-control-field">
              <label>Batch Override</label>
              <input
                type="text"
                value={idOptions.batch}
                onChange={(e) => setIdOptions({ ...idOptions, batch: e.target.value })}
                placeholder="e.g. Combo Course"
              />
            </div>

            {/* Multi-Student Selection Panel for Batch Mode */}
            {idPrintMode === 'batch' && (
              <div style={{ width: '100%', gridColumn: '1 / -1', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>
                    Select Students for Batch ID Card Printing ({selectedBatchIds.length} Selected)
                  </strong>
                  <button
                    type="button"
                    onClick={handleSelectAllBatch}
                    style={{ background: '#0a0e29', color: '#ffffff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}
                  >
                    {selectedBatchIds.length === students.length ? 'Deselect All' : `Select All (${students.length})`}
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto', padding: '0.6rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  {students.map(std => {
                    const isChecked = selectedBatchIds.includes(std.id);
                    return (
                      <label key={std.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer', margin: 0, userSelect: 'none' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleBatchStudent(std.id)}
                        />
                        <span style={{ fontWeight: isChecked ? '700' : '500', color: isChecked ? '#0f172a' : '#64748b' }}>
                          {std.fullName} ({std.registrationId || 'BSH'})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Action Buttons Bar */}
      <div className="documents-action-bar">
        <button className="doc-action-btn btn-print-doc" onClick={handlePrintDocument}>
          🖨️ Print Document / Save PDF
        </button>
      </div>

      {/* Warning Notice if photo missing for ID card */}
      {docType === 'id_card' && idPrintMode === 'single' && selectedStudent && !hasPhoto && (
        <div style={{
          background: '#fff7ed',
          border: '1px solid #ffedd5',
          borderRadius: '8px',
          padding: '0.8rem 1rem',
          color: '#c2410c',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.88rem'
        }}>
          <span style={{ fontSize: '1.2rem' }}>⚠️</span>
          <div>
            <strong>Student Photograph Missing:</strong> Please edit student profile and upload a photo before generating or printing the official ID card.
          </div>
        </div>
      )}

      {/* Main Preview Area */}
      <div className="documents-preview-area">
        {!selectedStudent && docType === 'certificate' ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
            <span style={{ fontSize: '3rem' }}>📁</span>
            <h3 style={{ margin: '0.5rem 0', color: '#0a0e29' }}>No Student Selected</h3>
            <p>Please select a student from the dropdown above to preview and generate their Certificate.</p>
          </div>
        ) : (
          <div className="printable-document-active">
            {docType === 'id_card' ? (
              idPrintMode === 'batch' ? (
                selectedBatchIds.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                    <span style={{ fontSize: '2.5rem' }}>📦</span>
                    <h4 style={{ margin: '0.5rem 0', color: '#0a0e29' }}>No Students Selected for Batch Print</h4>
                    <p>Please select at least 1 student from the checklist above.</p>
                  </div>
                ) : (
                  <div className="bsh-batch-preview-container">
                    {chunkArray(
                      students.filter(s => selectedBatchIds.includes(s.id)),
                      3
                    ).map((groupOfThree, pageIdx) => (
                      <div key={pageIdx} className="bsh-batch-a4-page">
                        <div className="bsh-batch-page-header">
                          PAGE {pageIdx + 1} OF {Math.ceil(selectedBatchIds.length / 3)} — A4 PORTRAIT SHEET ({groupOfThree.length} ID CARDS)
                        </div>
                        {groupOfThree.map((std) => {
                          let regId = std.registrationId || std.studentId || '0033';
                          const digitsMatch = String(regId).match(/\d+$/);
                          if (digitsMatch) {
                            const numStr = digitsMatch[0];
                            regId = numStr.length >= 4 ? numStr.slice(-4) : numStr.padStart(4, '0');
                          }
                          return (
                            <div key={std.id} className="bsh-batch-card-row">
                              <StudentIDCardTemplate
                                student={std}
                                options={{
                                  studentId: regId,
                                  batch: idOptions.batch
                                }}
                                side={idSide}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <StudentIDCardTemplate
                  student={selectedStudent}
                  options={{
                    studentId: idOptions.studentId,
                    batch: idOptions.batch
                  }}
                  side={idSide}
                />
              )
            ) : (
              <CertificatePreviewContainer>
                <CertificateTemplate
                  student={selectedStudent}
                  options={{
                    courseName: certForm.courseName,
                    duration: certForm.duration,
                    issueDate: certForm.issueDate,
                    certificateNumber: certForm.certificateNumber
                  }}
                />
              </CertificatePreviewContainer>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDocumentsModule;
