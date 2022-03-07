import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXPk55tE0S_t02PfKMsVydyBWSG64kVGY",
  authDomain: "clone-1d619.firebaseapp.com",
  projectId: "clone-1d619",
  storageBucket: "clone-1d619.appspot.com",
  messagingSenderId: "64862375205",
  appId: "1:64862375205:web:27a19c5859226625ed9ecc",
  measurementId: "G-4TH1EKF0D9",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const analytics = getAnalytics(app);
const auth = getAuth();
const google = new GoogleAuthProvider();
const timeStamp = serverTimestamp();
const storage = getStorage();

export { app, db, auth, google, timeStamp, storage, analytics };
