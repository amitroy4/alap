import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import profile from "../assets/profile.png"
import { AiOutlineHome, AiFillMessage, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai'
import { MdOutlineNotifications } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const RootLayout = () => {

    const auth = getAuth();
    let navigate = useNavigate()
    const location = useLocation()

    let handleLogOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
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
                            <img src={profile} />
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
                                    <Link onClick={handleLogOut} className={location.pathname == "/alap/" ? 'active' : 'icon'}>
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