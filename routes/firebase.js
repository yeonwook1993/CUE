var firebase = require('firebase');
var firebaseConfig = {
        
  apiKey: "AIzaSyBHRZXwkFb180rpMnJeplhNC3p81vODvnQ",
  authDomain: "cuebd-a4ad1.firebaseapp.com",
  databaseURL: "https://cuebd-a4ad1.firebaseio.com",
  projectId: "cuebd-a4ad1",
  storageBucket: "cuebd-a4ad1.appspot.com",
  messagingSenderId: "470740616150",
  appId: "1:470740616150:web:83752f8719b891fa"
};
firebase.initializeApp(firebaseConfig);



function userSignIn(email,userName, password,phone,interest) {

  // Initialize Firebase
    firebase.database().ref('users/' + email).set({
      name: userName,
      password : password,
      phone:phone,
      interest: interest
  });
}


function writeUserSearchLog(userId,searchValue) {
    

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.database().ref('searchLog/' + userId).set({
  
    });
}

module.exports ={
  writeUserSearchLog:writeUserSearchLog,

  userSignIn:userSignIn
};