import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAl_KKnPzCiHClqiJ4hhr0vjAMB9lyHV7c",
  authDomain: "willytube-7ad6d.firebaseapp.com",
  projectId: "willytube-7ad6d",
  storageBucket: "willytube-7ad6d.appspot.com",
  messagingSenderId: "478531980836",
  appId: "1:478531980836:web:cb24a2b553c2214979d2b1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
