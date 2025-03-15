//firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

// Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBAd61cqVK0wMS7-3d-Gab38NvuWm9x4bc",
  authDomain: "menu-principal-ae804.firebaseapp.com",
  projectId: "menu-principal-ae804",
  storageBucket: "menu-principal-ae804.firebasestorage.app",
  messagingSenderId: "324343508342",
  appId: "1:324343508342:web:04d19f920c5682daf31e57",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
setPersistence(auth, browserLocalPersistence)
    .then(() => console.log("✅ Persistencia de sesión habilitada"))
    .catch((error) => console.error("❌ Error al establecer persistencia:", error));
const db = getFirestore(app);

export { app, auth, db };

window.auth = auth;
window.db = db;
console.log("Firebase inicializado:", auth, db);