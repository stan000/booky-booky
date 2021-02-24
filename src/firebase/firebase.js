import firebase from "firebase";
// import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl7kmDWpVBxj9wWgM-_tQDRddFnVc061E",
  authDomain: "booky-booky-b0e67.firebaseapp.com",
  databaseURL: "https://booky-booky-b0e67.firebaseio.com",
  projectId: "booky-booky-b0e67",
  storageBucket: "booky-booky-b0e67.appspot.com",
  messagingSenderId: "672478453227",
  appId: "1:672478453227:web:c72af8cf2db2da3f050dae",
  measurementId: "G-HHG75T708B",
};
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;

// const firestore = firebase.firestore();
// const docRef = firestore.doc("samples/status");
// const queueRef = firestore.doc('samples/queueStatus')
// const increment = firebase.firestore.FieldValue.increment(1)

// docRef.onSnapshot("value", (snapshot) => {
//   return snapshot;
// });
