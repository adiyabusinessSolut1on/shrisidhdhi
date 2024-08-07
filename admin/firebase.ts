// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxsVX2cWIYthVI1CwoW0VPk10MGWZlznY",
  authDomain: "shrisidhi-ce2e4.firebaseapp.com",
  projectId: "shrisidhi-ce2e4",
  storageBucket: "shrisidhi-ce2e4.appspot.com",
  messagingSenderId: "728378481816",
  appId: "1:728378481816:web:086d2f4a1cdd83afea04ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
