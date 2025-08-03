// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";  // Import this for database
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkrbpzXmSMZ9WcMnwH_PC8ro2jURxean0",
  authDomain: "fafff-e9b4b.firebaseapp.com",
  projectId: "fafff-e9b4b",
  storageBucket: "fafff-e9b4b.firebasestorage.app",
  messagingSenderId: "569146102948",
  appId: "1:569146102948:web:81b201725b3c066d934231",
  measurementId: "G-1CJ9B97JDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);  // Initialize Realtime Database

// Initialize Analytics (if you need it)
const analytics = getAnalytics(app);

// Export the db for use in your components
export { db };
