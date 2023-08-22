import React from 'react'
import profile from "../assets/profile.png"
import regimg from "../assets/regimg.png"
import ModalImage from "react-modal-image";
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

const Chatbox = () => {
    let activeChat = useSelector((state) => state.activeChat.activeChat)
    return (
        <div className='chatbox'>
            <div className='msgprofile'>
                <div className='signal'>
                    <img width="70" src={profile} />
                    <div className='round'></div>
                </div>
                <div>
                    <h3>{activeChat.name}</h3>
                    <p>Online </p>
                </div>
            </div>
            <div className='msgbox'>
                <div className='msg'>
                    <p className='getmsg'>Hello Anik, from Dhaka</p>
                    <p className='time'>Today, 2:01pm</p>
                </div>
                <div className='msg'>
                    <p className='sendmsg'>Hello Anik, from Dhaka</p>
                    <p className='time'>Today, 2:01pm</p>
                </div>


                <div className='msg'>
                    <p className='getimg'>
                        <ModalImage
                            small={regimg}
                            large={regimg}
                        />
                    </p>
                    <p className='time'>Today, 2:01pm</p>
                </div>
                <div className='msg'>
                    <p className='sendimg'>
                        <ModalImage
                            small={regimg}
                            large={regimg}
                        />
                    </p>
                    <p className='time'>Today, 2:01pm</p>
                </div>



                <div className='msg'>
                    <p className='getaudio'>
                        <audio controls></audio>
                    </p>
                    <p className='time'>Today, 2:01pm</p>
                </div>
                <div className='msg'>
                    <p className='sendaudio'>
                        <audio controls></audio>
                    </p>
                    <p className='time'>Today, 2:01pm</p>
                </div>


                <div className='msg'>
                    <p className='getaudio'>
                        <video width="320" height="240" controls></video>
                    </p>
                    <p className='time'>Today, 2:01pm</p>
                </div>
                <div className='msg'>
                    <p className='sendaudio'>
                        <video width="320" height="240" controls></video>
                    </p>
                    <p className='time'>Today, 2:01pm</p>
                </div>


                <div className='msg'>
                    <p className='getmsg'>Hello Anik, from Dhaka</p>
                    <p className='time'>Today, 2:01pm</p>
                </div>
                <div className='msg'>
                    <p className='sendmsg'>Hello Anik, from Dhaka</p>
                    <p className='time'>Today, 2:01pm</p>
                </div>
                <div className='msg'>
                    <p className='getmsg'>Hello Anik, from Dhaka</p>
                    <p className='time'>Today, 2:01pm</p>
                </div>
                <div className='msg'>
                    <p className='sendmsg'>Hello Anik, from Dhaka</p>
                    <p className='time'>Today, 2:01pm</p>
                </div>
                <div className='msg'>
                    <p className='getmsg'>Hello Anik, from Dhaka</p>
                    <p className='time'>Today, 2:01pm</p>
                </div>
                <div className='msg'>
                    <p className='sendmsg'>Hello Anik, from Dhaka</p>
                    <p className='time'>Today, 2:01pm</p>
                </div>
            </div>
            <div className='msgcopntainer'>
                <div className='msgwritecon' >
                    <input className='msgwrite' />
                </div>
                <Button variant="contained">Contained</Button>
            </div>
        </div>
    )
}

export default Chatbox