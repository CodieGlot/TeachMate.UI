import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyC5FYLptZigqJsLDT7dhuqffsGveCinrTw",
  authDomain: "teachmatefirebase.firebaseapp.com",
  projectId: "teachmatefirebase",
  storageBucket: "teachmatefirebase.appspot.com",
  messagingSenderId: "419542229655",
  appId: "1:419542229655:web:4650f1208f890c5fb03fd2",
};

export const firebaseAuth = firebase.initializeApp(config).auth();
