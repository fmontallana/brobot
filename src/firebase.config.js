// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASVsj2ZgFdgFHjJOodwNcfBa6G7pjKUI4",
    authDomain: "brobot-app.firebaseapp.com",
    projectId: "brobot-app",
    storageBucket: "brobot-app.appspot.com",
    messagingSenderId: "136825056550",
    appId: "1:136825056550:web:3b36db814f9623854965e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);