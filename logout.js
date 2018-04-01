$(document).ready(function() {
  $('.logoutBtn').click(function (){
    firebase.auth().signOut().then(function() {
      //sign out successful
      window.location.href="/"
    }, function (error) {
      //unsuccessful
    }) ;

  });

  var db = firebase.database();
  var uid;

  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      // User is signed out, go back.
      window.location.href="/"
    }
  });
});