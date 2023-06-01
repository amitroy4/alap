import React, { useState } from 'react'
import { Grid, TextField, Button, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import loginimg from "../assets/loginimg.png";
import google from "../assets/google.png";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Headingforreglog from '../components/Headingforreglog';
import { Link } from 'react-router-dom';


let initialValues = {
    email: "",
    password: "",
    loading: false,
}

const Login = () => {

    const auth = getAuth();

    const provider = new GoogleAuthProvider();

    let [values, setValues] = useState(initialValues)

    let handleValues = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    let handleSubmit = () => {
        let { email, password } = values
        setValues({
            ...values,
            loading: true,
        })
        signInWithEmailAndPassword(auth, email, password).then(() => {
            setValues({
                email: "",
                password: "",
                loading: false,
            })
            // navigate("/")
            // home page link
        })
    }

    let handleGoogleLogin = () => {
        signInWithPopup(auth, provider).then((result) => {
            console.log(result)
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div className='regContainer'>
                    <Headingforreglog className="headerreglog" title="Login to your account!" />
                    <img onClick={handleGoogleLogin} className='google' src={google} />
                    <div className='regInput'>
                        <TextField onChange={handleValues} name='email' type='email' id="outlined-basic" label="Email Address" variant="outlined" value={values.email} />
                    </div>
                    <div className='regInput'>
                        <TextField onChange={handleValues} name='password' type='password' id="outlined-basic" label="Password" variant="outlined" value={values.password} />
                    </div>

                    <Alert severity="info" style={{ marginBottom: "20px" }}>Don't Have An Account? <strong><Link to="/">Registration</Link></strong></Alert>

                    {values.loading
                        ? <LoadingButton className='btnsl'
                            loading
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="outlined"
                        >
                            Loading
                        </LoadingButton>
                        : <Button onClick={handleSubmit} className='btnsl' variant="contained">Login to Continue </Button>
                    }
                </div>
            </Grid>
            <Grid item xs={6}>
                <img className='regimg' src={loginimg} />
            </Grid>
        </Grid>
    )
}

export default Login