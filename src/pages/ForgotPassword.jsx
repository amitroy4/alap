import React, { useState } from 'react'
import { TextField, Button } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

  const auth = getAuth();
  let navigate = useNavigate()
  let [text, setText] = useState("")

  let handleForgotPassword = () => {
    console.log(text)
    sendPasswordResetEmail(auth, text)
      .then(() => {
        navigate("/login")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <div className='forgotPassword'>
      <div className='box'>
        <h1>Forgot Password</h1>
        <TextField onChange={(e) => setText(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
        <Button onClick={handleForgotPassword} variant="contained">Confirm</Button>
      </div>
    </div>
  )
}

export default ForgotPassword 