import React from 'react';
import {createRoot} from 'react-dom/client';
import StudentDocumentsModule from '/src/components/documents/StudentDocumentsModule.jsx';
const n=Number(new URLSearchParams(location.search).get('count')||6);
const students=Array.from({length:n},(_,i)=>({id:`test-${i}`,fullName:`Test Student ${i+1}`,registrationId:`BSH-${i+1}`,studentPhotoUrl:'/src/assets/id-card-placeholder.svg',courses:['Graphic Designing']}));
createRoot(document.getElementById('root')).render(<StudentDocumentsModule students={students} />);
