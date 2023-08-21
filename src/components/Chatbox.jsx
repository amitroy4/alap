import React from 'react'
import profile from "../assets/profile.png"

const Chatbox = () => {
    return (
        <div className='chatbox'>
            <div className='msgprofile'>
                <div className='signal'>
                    <img width="70" src={profile} />
                    <div className='round'></div>
                </div>
                <div>
                    <h3>Amit ROy</h3>
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
            <div>
                box
            </div>
        </div>
    )
}

export default Chatbox