import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBu9KUnqpgPYzo9IjVbSCvRyrru4krmd7c",
    authDomain: "project-60-1cdfb.firebaseapp.com",
    databaseURL: "https://project-60-1cdfb-default-rtdb.firebaseio.com",
    projectId: "project-60-1cdfb",
    storageBucket: "project-60-1cdfb.appspot.com",
    messagingSenderId: "873688386054",
    appId: "1:873688386054:web:d1b89c2c4f9dd036009187"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.database()