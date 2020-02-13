import React from 'react';
import firebase from 'firebase';
import './LoginButton.css'; 
import './ToggleGameState.css';
import Button from "@material-ui/core/Button";
function LoginButton({setUser}) {
 
  function logIn() {
      
    var provider = new firebase.auth.GoogleAuthProvider(); 
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log(result.user);
      setUser(result.user);
    }).catch(function(error) {
      console.log(error);
   });
  }

  return (
    <div className='button'>
    <Button onClick={() => logIn()}>
      LOGIN
    </Button>
</div>
  );
  }

export default LoginButton;