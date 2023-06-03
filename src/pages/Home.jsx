import React from 'react'
import { Button } from '@mui/material';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const auth = getAuth();
    let navigate = useNavigate()

let handleLogOut = ()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        navigate("/login")
      }).catch((error) => {
        // An error happened.
      });
}
    return (
        <Button onClick={handleLogOut} variant="contained">Log Out</Button>
    )
}

export default Home