import React, { useEffect, useState } from 'react'
import profile from "../assets/profile.png"
import regimg from "../assets/regimg.png"
import ModalImage from "react-modal-image";
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import moment from 'moment/moment';

const Chatbox = () => {
    const db = getDatabase();
    let activeChat = useSelector((state) => state.activeChat.activeChat)
    let userData = useSelector((state) => state.loggedUser.loginUser)
    let [msg, setMsg] = useState("")
    let [msgList, setMsgList] = useState([])
    let handleChat = () => {
        console.log(activeChat);
        if (activeChat.type == "groupmsg") {

        } else {
            if (msg != "") {
                set(push(ref(db, 'singlemsg/')), {
                    sendername: userData.displayName,
                    senderid: userData.uid,
                    recievername: activeChat.name,
                    recieverid: activeChat.id,
                    msg: msg,
                    date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                });
            }
        }
    }

    useEffect(() => {
        onValue(ref(db, 'singlemsg/'), (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (item.val().senderid == userData.uid && item.val().recieverid == activeChat.id || item.val().senderid == activeChat.id && item.val().recieverid == userData.uid) {
                    arr.push(item.val())
                }
            });
            setMsgList(arr)
        });
    }, [])
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
                {msgList.map(item => (
                    item.senderid == userData.uid
                        ?
                        <div className='msg'>
                            <p className='sendmsg'>{item.msg}</p>
                            <p className='time'>{moment("2023-08-31 02:59", "YYYYMMDD hh:mm").fromNow()}</p>
                        </div>
                        :
                        <div className='msg'>
                            <p className='getmsg'>{item.msg}</p>
                            <p className='time'>{moment("2023-08-31 02:59", "YYYYMMDD hh:mm").fromNow()}</p>
                        </div>
                ))}




                {/* <div className='msg'>
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
                </div> */}



                {/* <div className='msg'>
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
                </div> */}


                {/* <div className='msg'>
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
                </div> */}
            </div>
            <div className='msgcopntainer'>
                <div className='msgwritecon' >
                    <input onChange={(e) => setMsg(e.target.value)} className='msgwrite' />
                </div>
                <Button onClick={handleChat} variant="contained">Send</Button>
            </div>
        </div>
    )
}

export default Chatbox