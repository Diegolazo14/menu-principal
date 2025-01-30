//firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const auth = getAuth(app);

export { app, auth };