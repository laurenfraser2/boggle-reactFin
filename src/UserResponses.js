import firebase from 'firebase'; 
 
const firebaseConfig = {
  apiKey: "blablablablabla"
};
const firebaseApp = firebase.initializeApp(firebaseConfig); 
 
if (window.location.hostname === "localhost") {
  // To ensure the emulator is running at localhost:8080 run with:
  // firebase emulators:exec --only firestore 'npm start'
  const db = firebaseApp.firestore();
  db.settings({
    host: "localhost:8080",
    ssl: false
  });
  db.collection("users").doc("fake_id1").set(
{name: "Jane Doe",
      hometown: "Sunnyvale"
  });
}
