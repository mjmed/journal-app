import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyC3mMBORpPx03_ePfLu0AIIA4_dnLtkziQ",
    authDomain: "react-app-cursos-41553.firebaseapp.com",
    databaseURL: "https://react-app-cursos-41553.firebaseio.com",
    projectId: "react-app-cursos-41553",
    storageBucket: "react-app-cursos-41553.appspot.com",
    messagingSenderId: "648863660017",
    appId: "1:648863660017:web:3d53c6e8d8395fd403f650"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// referencia a la base de datos que voy a utilizar para grabar
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}