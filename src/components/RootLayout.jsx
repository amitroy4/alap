import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import profile from "../assets/profile.png"
import { AiOutlineHome, AiFillMessage, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai'
import { MdOutlineNotifications } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { userdata } from '../slices/user/userSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const RootLayout = () => {

    const auth = getAuth();
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const location = useLocation()

    let userData = useSelector((state) => state.loggedUser.loginUser)

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
                            <img src={userData.photoURL} />
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
            </Grid>
        </>
    )
}

export default RootLayout