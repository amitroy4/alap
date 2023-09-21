import React, { useEffect, useState, createRef } from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import profile from "../assets/profile.png"
import { AiOutlineHome, AiFillMessage, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai'
import { MdOutlineNotifications } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { userdata } from '../slices/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

import { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ButtonBase } from "@mui/material";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as rref, set } from "firebase/database";


const defaultSrc =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const RootLayout = () => {

    const auth = getAuth();
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const location = useLocation()
    const storage = getStorage();
    const db = getDatabase();


    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");
    const [cropData, setCropData] = useState("#");
    const cropperRef = createRef();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let userData = useSelector((state) => state.loggedUser.loginUser)
    const storageRef = ref(storage, userData.uid);

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const handleCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {
                console.log('Uploaded a data_url string!');
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url)
                    set(rref(db, 'users/' + userData.uid), {
                        username: userData.displayName,
                        email: userData.email,
                        profile_picture: url
                    }).then((user) => {
                        localStorage.setItem("alapUser", JSON.stringify({ ...userData, photoURL: url }))
                        dispatch(userdata({ ...userData, photoURL: url }))
                    }).then(() => {
                        setOpen(false)
                        setImage("")
                    })
                })
            });
        }

    };


    useEffect(() => {
        if (userData == null) {
            navigate("/login")
        }
    }, [])

    if (userData == null) {
        return
    }

    let handleLogOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem("alapUser")
            dispatch(userdata(null))
            navigate("/login")
        }).catch((error) => {
            // An error happened.
        });
    }


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <div className='navbar'>
                        <div className='navcontainer'>
                            <img onClick={handleOpen} src={userData.photoURL} />
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Text in a modal
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        {image && <div className="imgbox">
                                            <div className="img-preview"></div>
                                        </div>}
                                        <input type="file" onChange={onChange} />
                                        {image
                                            ?
                                            <>
                                                <Cropper
                                                    ref={cropperRef}
                                                    style={{ height: 400, width: "100%" }}
                                                    zoomTo={0.5}
                                                    initialAspectRatio={1}
                                                    preview=".img-preview"
                                                    src={image}
                                                    viewMode={1}
                                                    minCropBoxHeight={100}
                                                    minCropBoxWidth={100}
                                                    background={false}
                                                    responsive={true}
                                                    autoCropArea={1}
                                                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                                    guides={true}
                                                />
                                            </>
                                            :
                                            <div className="imgbox">

                                                <img style={{ width: "100px", height: "100px", borderRadius: "50%" }} src={userData.photoURL} />
                                            </div>
                                        }
                                        <Button onClick={handleCropData}>Upload</Button>
                                    </Typography>
                                </Box>
                            </Modal>
                            <h4 className='username'>{userData.displayName}</h4>
                            <ul>
                                <li >
                                    <Link to='/alap/home' className={location.pathname == "/alap/home" ? 'active' : 'icon'}>
                                        <AiOutlineHome />
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/alap/message' className={location.pathname == "/alap/message" ? 'active' : 'icon'}>
                                        <AiFillMessage />
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/alap/' className={location.pathname == "/alap/" ? 'active' : 'icon'}>
                                        <MdOutlineNotifications />
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/alap/' className={location.pathname == "/alap/" ? 'active' : 'icon'}>
                                        <AiOutlineSetting />
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={handleLogOut} className='icon'>
                                        <AiOutlineLogout />
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={11}>
                    <Outlet />
                </Grid>
            </Grid >
        </>
    )
}

export default RootLayout