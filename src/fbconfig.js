import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbHub_1rYLHwufkG9Fy9Z14Ts6kQRD4Rc",
  authDomain: "foodie-72343.firebaseapp.com",
  projectId: "foodie-72343",
  storageBucket: "foodie-72343.appspot.com",
  messagingSenderId: "845590006895",
  appId: "1:845590006895:web:7295fa23570486d49f919a"
};

  const app = initializeApp(firebaseConfig);

 export const db = getFirestore(app);
