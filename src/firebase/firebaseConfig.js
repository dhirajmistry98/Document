// firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage"; // Import Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcKKyW1b7MLJC7c7JkNixv8xV2R4ydfEI",
  authDomain: "knowledge-base-99b01.firebaseapp.com",
  projectId: "knowledge-base-99b01",
  storageBucket: "knowledge-base-99b01.appspot.com",
  messagingSenderId: "408745410141",
  appId: "1:408745410141:web:f507b0c8d39f58db5dd7b4",
  measurementId: "G-YEB9F482R4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and Storage
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Storage

// Export the services
export { app, analytics, db, storage };
