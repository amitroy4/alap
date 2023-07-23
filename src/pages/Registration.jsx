import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import regimg from "../assets/regimg.png"
import Headingforreglog from '../components/Headingforreglog';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsEyeSlash, BsEye } from 'react-icons/bs';

let initialValues = {
    email: "",
    fullName: "",
    password: "",
    error: "",
    loading: false,
}

const Registration = () => {
    let loginUser = useSelector((state) => state.loggedUser.loginUser)
    let navigate = useNavigate();
    let [eye, setEye] = useState(false)

    useEffect(() => {
        if (loginUser != null) {
            navigate("/alap/home")
        }
    }, [])

    let handleEye = () => {
        setEye(!eye)
    }

    const auth = getAuth();
    const db = getDatabase();
    let [values, setValues] = useState(initialValues)

    let handleValues = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    let handleSubmit = () => {

        let { email, password, fullName } = values
        var pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (!email) {
            setValues({
                ...values,
                error: "Enter an Email"
            })
            return
        }

        if (!fullName) {
            setValues({
                ...values,
                error: "Enter Your Full Name"
            })
            return
        }

        if (!password) {
            setValues({
                ...values,
                error: "Enter a Password"
            })
            return
        }

        if (!pattern.test(password)) {
            setValues({
                ...values,
                error: "Password must be 6-20 characters consisting of numbers, uppercase and lowercase letters and characters!",
                loading: false,
            })
            return
        }



        setValues({
            ...values,
            loading: true,
        })
        createUserWithEmailAndPassword(auth, email, password).then((user) => {

            updateProfile(auth.currentUser, {
                displayName: values.fullName, photoURL: "https://i.ibb.co/ZW7Qr66/avater.png"
            }).then(() => {
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log("Email send")
                        console.log(user)
                        set(ref(db, 'users/' + user.user.uid), {
                            username: values.fullName,
                            email: values.email,
                            profile_picture: user.user.photoURL
                        });
                    });
            }).catch((error) => {
                // An error occurred
                // ...
            });


            setValues({
                email: "",
                fullName: "",
                password: "",
                loading: false,
            })
            navigate("/login")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode.includes("email-already-in-use")) {
                setValues({
                    ...values,
                    email: "",
                    fullName: "",
                    password: "",
                    error: "Email Already In Use",
                    loading: false,
                })
            }
            console.log(error)
        });
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div className='regContainer'>
                    <Headingforreglog className="headerreglog" title="Get started with easily register" />
                    <p>Free register and you can enjoy it</p>
                    <div className='regInput'>
                        <TextField onChange={handleValues} name='email' type='email' id="outlined-basic" label="Email Address" variant="outlined" value={values.email} />
                    </div>
                    {values.error?.includes("Email") && <Alert className='warning-w' severity="error" style={{ marginBottom: "20px" }}>{values.error}</Alert>}

                    <div className='regInput'>
                        <TextField onChange={handleValues} name='fullName' type='text' id="outlined-basic" label="Full Name" variant="outlined" value={values.fullName} />
                    </div>
                    {values.error?.includes("Full") && <Alert className='warning-w' severity="error" style={{ marginBottom: "20px" }}>{values.error}</Alert>}

                    <div className='regInput'>
                        <TextField onChange={handleValues} name='password' type={eye ? "text" : 'password'} id="outlined-basic" label="Password" variant="outlined" value={values.password} />
                        {
                            eye ?
                                <BsEyeSlash onClick={handleEye} className='eye' />
                                :
                                <BsEye onClick={handleEye} className='eye' />
                        }
                    </div>

                    {(values.error.includes("Password") || values.error.includes("Password must be 6-20 characters")) && <Alert className='warning-w' severity="error" style={{ marginBottom: "20px" }}>{values.error}</Alert>}

                    <Alert className='warning-w' severity="info" style={{ marginBottom: "20px" }}>Have An Account? <strong><Link to="/login">Login</Link></strong></Alert>

                    {values.loading
                        ? <LoadingButton className='btnsl'
                            loading
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="outlined"
                        >
                            Loading
                        </LoadingButton>
                        : <Button onClick={handleSubmit} className='btnsl' variant="contained">Sign up </Button>
                    }

                    <Alert className='warning-w' severity="error" style={{ marginTop: "20px" }}>Forgot Password <strong><Link to="/forgotpassword">Click Here</Link></strong></Alert>
                </div>
            </Grid>
            <Grid item xs={6}>
                <img className='regimg' src={regimg} />
            </Grid>
        </Grid>
    )
}

export default Registration