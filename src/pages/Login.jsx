import React from 'react'
import { Grid, TextField, Button } from '@mui/material';
import loginimg from "../assets/loginimg.png";
import google from "../assets/google.png";
import Headingforreglog from '../components/Headingforreglog';

const Login = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div className='regContainer'>
                    <Headingforreglog className="headerreglog" title="Login to your account!" />
                    <img className='google' src={google}/>
                    <div className='regInput'>
                        <TextField id="outlined-basic" label="Email Address" variant="outlined" />
                    </div>
                    <div className='regInput'>
                        <TextField id="outlined-basic" label="Password" variant="outlined" />
                    </div>
                    <Button className='btnsl' variant="contained">Login to Continue</Button>
                </div>
            </Grid>
            <Grid item xs={6}>
                <img className='regimg' src={loginimg} />
            </Grid>
        </Grid>
    )
}

export default Login