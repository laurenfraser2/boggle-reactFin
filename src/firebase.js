import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBHkFOuH-0yKjbgTv9IllJe_v4Qn37Vo-U",
    authDomain: "lfraserboggle.firebaseapp.com",
    databaseURL: "https://lfraserboggle.firebaseio.com",
    projectId: "lfraserboggle",
    storageBucket: "lfraserboggle.appspot.com",
    messagingSenderId: "101154086813",
    appId: "1:101154086813:web:c1102d98f07f70b7c65974",
    measurementId: "G-5S2T1GXQ58"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  export {db};