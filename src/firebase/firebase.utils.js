import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD7qwmYGM0wyHhZPk918sFN1WRHeHhAzOE",
    authDomain: "crwn-db-b02b8.firebaseapp.com",
    databaseURL: "https://crwn-db-b02b8.firebaseio.com",
    projectId: "crwn-db-b02b8",
    storageBucket: "crwn-db-b02b8.appspot.com",
    messagingSenderId: "708861392585",
    appId: "1:708861392585:web:4796b508f8f50eca02ff18",
    measurementId: "G-NPC75KFGZ3"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);



  export default firebase;
