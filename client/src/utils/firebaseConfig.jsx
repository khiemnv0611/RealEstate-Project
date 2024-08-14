// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,

  // apiKey: "AIzaSyD2HF7gFI_Wr4a3UKByI7RPSJDf-uyXRR8",
  // authDomain: "realestate-a74d5.firebaseapp.com",
  // projectId: "realestate-a74d5",
  // storageBucket: "realestate-a74d5.appspot.com",
  // messagingSenderId: "184082671175",
  // appId: "1:184082671175:web:8cc630357bbe29778b3362",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
