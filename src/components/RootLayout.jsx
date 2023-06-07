import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import profile from "../assets/profile.png"
import { AiOutlineHome, AiFillMessage, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai'
import { MdOutlineNotifications } from 'react-icons/md'
import { Link } from 'react-router-dom';

const RootLayout = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <div className='navbar'>
                        <div className='navcontainer'>
                            <img src={profile} />
                            <ul>
                                <li>
                                    <Link to='/alap/home'>
                                        <AiOutlineHome className='icon' />
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/alap/message'>
                                        <AiFillMessage className='icon' />
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/alap/home'>
                                        <MdOutlineNotifications className='icon' />
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/alap/home'>
                                        <AiOutlineSetting className='icon' />
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/alap/home'>
                                        <AiOutlineLogout className='icon' />
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