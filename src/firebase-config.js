import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyBS-NRv5_CRWA954_SlEyCDhFcokqvCCnA",
  // authDomain: "netflix-8828c.firebaseapp.com",
  // projectId: "netflix-8828c",
  // storageBucket: "netflix-8828c.appspot.com",
  // messagingSenderId: "93733163960",
  // appId: "1:93733163960:web:aedcd38b3a53d3f3c9f54d",
  apiKey: "AIzaSyBS-NRv5_CRWA954_SlEyCDhFcokqvCCnA",
  authDomain: "netflix-8828c.firebaseapp.com",
  databaseURL: "https://netflix-8828c-default-rtdb.firebaseio.com",
  projectId: "netflix-8828c",
  storageBucket: "netflix-8828c.appspot.com",
  messagingSenderId: "93733163960",
  appId: "1:93733163960:web:aedcd38b3a53d3f3c9f54d",
  measurementId: "G-CFNQ4XLRG1",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
