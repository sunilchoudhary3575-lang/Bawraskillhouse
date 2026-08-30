import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCFjBBQOC8Le7ibVWTIClJHAvNJ2miM8VY",
  authDomain: "adminskillhouse.firebaseapp.com",
  projectId: "adminskillhouse",
  storageBucket: "adminskillhouse.firebasestorage.app",
  messagingSenderId: "350121677493",
  appId: "1:350121677493:web:324a8e9ef1b89b1659a4fc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkCollections() {
  console.log("🔍 Checking all documents in Firestore (adminskillhouse)...");
  
  const collections = ['students', 'enrollments', 'enquiries', 'adminCustomOptions'];
  
  for (const colName of collections) {
    try {
      const snap = await getDocs(collection(db, colName));
      console.log(`\n📁 Collection '${colName}': Total ${snap.size} doc(s)`);
      snap.forEach((docSnap) => {
        console.log(`   - ID: ${docSnap.id}`, JSON.stringify(docSnap.data()));
      });
    } catch (err) {
      console.error(`❌ Error fetching '${colName}':`, err.message);
    }
  }

  process.exit(0);
}

checkCollections();
