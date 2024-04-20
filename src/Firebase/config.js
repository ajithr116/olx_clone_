import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBglRgp9H8fbbs9UA7KtOqfifNtia81TBU",
  authDomain: "olx-clone-19816.firebaseapp.com",
  projectId: "olx-clone-19816",
  storageBucket: "olx-clone-19816.appspot.com",
  messagingSenderId: "150990657538",
  appId: "1:150990657538:web:c352ff64721951b11eaf1b"
};

export const Firebase = initializeApp(firebaseConfig);
