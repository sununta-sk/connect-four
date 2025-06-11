import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA2cDxZHORdFaADTR06S7QIJGrltxa7Wrc",
  authDomain: "connect-four-1cff2.firebaseapp.com",
  databaseURL: "https://connect-four-1cff2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "connect-four-1cff2",
  storageBucket: "connect-four-1cff2.firebasestorage.app",
  messagingSenderId: "160810563385",
  appId: "1:160810563385:web:96dd0d9e03f8168e6c1ae8",
  measurementId: "G-N7EH2XRJBW"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const analytics = getAnalytics(app); 