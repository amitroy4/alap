import React, { useState } from 'react'
import { Grid, TextField, Button, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import loginimg from "../assets/loginimg.png";
import google from "../assets/google.png";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Headingforreglog from '../components/Headingforreglog';
import { Link, useNavigate } from 'react-router-dom';


let initialValues = {
    email: "",
    password: "",
    error: "",
    loading: false,
}

const Login = () => {

    const auth = getAuth();

    const provider = new GoogleAuthProvider();
    let navigate = useNavigate()

    let [values, setValues] = useState(initialValues)

    let handleValues = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    let handleSubmit = () => {
        let { email, password } = values

        if (!email) {
            setValues({
                ...values,
                error: "Enter an Email"
            })
            return
        }

        if (!password) {
            setValues({
                ...values,
                error: "Enter Your Password"
            })
            return
        }

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
            navigate("/home")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode.includes("invalid-email")) {
                setValues({
                    ...values,
                    email: "",
                    password: "",
                    loading: false,
                })
                console.log(errorCode)
            }
            if (errorCode.includes("wrong-password")) {
                setValues({
                    ...values,
                    password: "",
                    loading: false,
                })
                console.log(errorCode)
            }
        });
    }

    let handleGoogleLogin = () => {
        signInWithPopup(auth, provider).then((result) => {
            console.log(result)
            navigate("/home")
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
                    {values.error?.includes("Email") && <Alert className='warning-w' severity="error" style={{ marginBottom: "20px" }}>{values.error}</Alert>}

                    <div className='regInput'>
                        <TextField onChange={handleValues} name='password' type='password' id="outlined-basic" label="Password" variant="outlined" value={values.password} />
                    </div>
                    {values.error?.includes("Password") && <Alert className='warning-w' severity="error" style={{ marginBottom: "20px" }}>{values.error}</Alert>}

                    <Alert className='warning-w' severity="info" style={{ marginBottom: "20px" }}>Don't Have An Account? <strong><Link to="/">Registration</Link></strong></Alert>

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