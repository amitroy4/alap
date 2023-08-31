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
    let [groupMsgList, setGroupMsgList] = useState([])


    let handleChat = () => {
        console.log(activeChat);
        if (activeChat.type == "groupmsg") {
            if (msg != "") {
                set(push(ref(db, 'groupmsg/')), {
                    sendername: userData.displayName,
                    senderid: userData.uid,
                    recievername: activeChat.name,
                    recieverid: activeChat.id,
                    msg: msg,
                    date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                }).then(() => {
                    setMsg("")
                });
            }
        } else {
            if (msg != "") {
                set(push(ref(db, 'singlemsg/')), {
                    sendername: userData.displayName,
                    senderid: userData.uid,
                    recievername: activeChat.name,
                    recieverid: activeChat.id,
                    msg: msg,
                    date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                }).then(() => {
                    setMsg("")
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
    }, [activeChat.id])


    useEffect(() => {
        onValue(ref(db, 'groupmsg/'), (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (item.val().senderid == userData.uid && item.val().recieverid == activeChat.id || item.val().senderid == activeChat.id && item.val().recieverid == userData.uid) {
                    arr.push(item.val())
                }
            });
            setGroupMsgList(arr)
        });
    }, [activeChat.id])


    let handleMsg = (e) => {
        setMsg(e.target.value)
    }

    let handleKeyPress = (e) => {
        if (e.key == "Enter") {
            if (activeChat.type == "groupmsg") {
                if (msg != "") {
                    set(push(ref(db, 'groupmsg/')), {
                        sendername: userData.displayName,
                        senderid: userData.uid,
                        recievername: activeChat.name,
                        recieverid: activeChat.id,
                        msg: msg,
                        date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                    }).then(() => {
                        setMsg("")
                    });
                }
            } else {
                if (msg != "") {
                    set(push(ref(db, 'singlemsg/')), {
                        sendername: userData.displayName,
                        senderid: userData.uid,
                        recievername: activeChat.name,
                        recieverid: activeChat.id,
                        msg: msg,
                        date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                    }).then(() => {
                        setMsg("")
                    });
                }
            }
        }
    }



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
                {activeChat.type == "singlemsg" ?
                    msgList.map(item => (
                        item.senderid == userData.uid && item.recieverid == activeChat.id
                            ?
                            <div className='msg'>
                                <p className='sendmsg'>{item.msg}</p>
                                <p className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                            </div>
                            :
                            item.senderid == activeChat.id && item.recieverid == userData.uid &&
                            <div className='msg'>
                                <p className='getmsg'>{item.msg}</p>
                                <p className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                            </div>
                    ))
                    :
                    groupMsgList.map(item => (
                        item.senderid == userData.uid && item.recieverid == activeChat.id
                            ?
                            <div className='msg'>
                                <p className='sendmsg'>{item.msg}</p>
                                <p className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                            </div>
                            :
                            item.senderid == activeChat.id && item.recieverid == userData.uid &&
                            <div className='msg'>
                                <p className='getmsg'>{item.msg}</p>
                                <p className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                            </div>
                    ))
                }




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
                    <input onChange={handleMsg} className='msgwrite' onKeyUp={handleKeyPress} value={msg} />
                </div>
                <Button onClick={handleChat} variant="contained">Send</Button>
            </div>
        </div>
    )
}

export default Chatbox