import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDNYlSKPd1Eef8FWCgphONTgWnw9-csrI",
  authDomain: "jtg-journal.firebaseapp.com",
  projectId: "jtg-journal",
  storageBucket: "jtg-journal.firebasestorage.app",
  messagingSenderId: "1051515355764",
  appId: "1:1051515355764:web:0c6c6f7417cb22b44e4721"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
