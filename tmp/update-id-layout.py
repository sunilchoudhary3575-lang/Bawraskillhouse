from pathlib import Path
p=Path('src/components/documents/StudentDocumentsModule.jsx')
s=p.read_text(encoding='utf-8')
s=s.replace('  // Helper chunk array into groups of 3 (for 3 cards per A4 Portrait page)', '''  const batchStudents = students.filter(s => selectedBatchIds.includes(s.id));
  const isFrontBatch = docType === 'id_card' && idPrintMode === 'batch' && idSide === 'front';
  const batchLandscape = isFrontBatch && batchStudents.length > 6;
  const cardsPerPage = isFrontBatch ? (batchLandscape ? 10 : 6) : 3;

  // Keep the same layout on every page, including the last partial page.''')
s=s.replace("if (docType === 'certificate') {\n      document.body.classList", "if (docType === 'certificate' || batchLandscape) {\n      document.body.classList",1)
s=s.replace("    return () => {\n      document.body.classList.remove('doc-print-landscape', 'doc-print-portrait');", "    document.body.classList.toggle('doc-print-batch', docType === 'id_card' && idPrintMode === 'batch');\n    return () => {\n      document.body.classList.remove('doc-print-landscape', 'doc-print-portrait', 'doc-print-batch');",1)
s=s.replace('  }, [docType]);','  }, [docType, idPrintMode, batchLandscape]);',1)
s=s.replace('📦 Batch Multi-Student (3 Cards / A4 Sheet)','📦 Batch Multi-Student (Auto A4 Layout)')
s=s.replace("    if (!selectedStudent) {\n      alert('Please select a student to print documents!');", "    const isBatch = docType === 'id_card' && idPrintMode === 'batch';\n    if (isBatch ? batchStudents.length === 0 : !selectedStudent) {\n      alert('Please select a student to print documents!');",1)
s=s.replace("    if (docType === 'id_card' && !hasPhoto) {\n      alert('⚠️ Photo Required for ID Card!\\n\\nStudent photograph is missing. Please edit student details", "    if (docType === 'id_card' && idSide !== 'back' && (isBatch\n      ? batchStudents.some(s => !(s.studentPhotoUrl || s.studentPhoto))\n      : !hasPhoto)) {\n      alert('⚠️ Photo Required for ID Card!\\n\\nA selected student photograph is missing. Please edit student details",1)
s=s.replace('    window.print();', '''    await document.fonts.ready;
    await Promise.all([...document.querySelectorAll('.printable-document-active img')].map(img =>
      img.decode ? img.decode().catch(() => {}) : Promise.resolve()
    ));
    window.print();''',1)
s=s.replace('students.filter(s => selectedBatchIds.includes(s.id)),\n                      3','batchStudents,\n                      cardsPerPage')
s=s.replace('groupOfThree','pageStudents')
s=s.replace('className="bsh-batch-a4-page"','className={`bsh-batch-a4-page ${isFrontBatch ? `bsh-front-sheet ${batchLandscape ? \'bsh-front-ten\' : \'bsh-front-six\'}` : \'\'}`}')
s=s.replace('Math.ceil(selectedBatchIds.length / 3)', 'Math.ceil(batchStudents.length / cardsPerPage)')
s=s.replace('A4 PORTRAIT SHEET ({pageStudents.length} ID CARDS)', "A4 {batchLandscape ? 'LANDSCAPE' : 'PORTRAIT'} ({pageStudents.length} ID CARDS · {isFrontBatch ? (batchLandscape ? '5 × 2' : '2 × 3') : '3 PER PAGE'})")
s=s.replace('                        {pageStudents.map((std) => {','                        <div className={isFrontBatch ? "bsh-front-grid" : "bsh-batch-rows"}>\n                        {pageStudents.map((std) => {')
s=s.replace('                        })}\n                      </div>', '                        })}\n                        </div>\n                      </div>',1)
p.write_text(s,encoding='utf-8')
