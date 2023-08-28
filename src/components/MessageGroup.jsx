import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { activeChat } from '../slices/activechat/ActiveChat';
import profile from '../assets/profile.png'



const MessageGroup = () => {

    const db = getDatabase();
    let dispatch = useDispatch()
    let [groupList, setGroupList] = useState([])
    let [memberList, setMemberList] = useState([]);
    let userData = useSelector((state) => state.loggedUser.loginUser)

    useEffect(() => {

        const groupsRef = ref(db, 'groups/');
        onValue(groupsRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                arr.push({
                    ...item.val(), groupid: item.key,
                });
            })
            setGroupList(arr);
        });
    }, [])


    useEffect(() => {
        const membersRef = ref(db, 'members/');
        onValue(membersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                arr.push(item.val());
            })
            setMemberList(arr)
        });
    }, [])


    let handlegroup = (item) => {
        dispatch(activeChat({
            type: "groupmsg",
            name: item.groupname,
            id: item.groupid,
        }))

        localStorage.setItem("activeChat", JSON.stringify({
            type: "groupmsg",
            name: item.groupname,
            id: item.groupid,
        }))
    }


    return (
        <div className='box'>
            <div className='titlebox'>
                <h3>My Groups</h3>
                <div className='button'>
                    <Button variant="contained" size="small">Create Group</Button>
                </div>
            </div>
            <div className='listbox'>
                {
                    groupList.map((item) => userData.uid == item.adminid ? (

                        <div className="list">
                            <div className='img'>
                                <img src={profile} />
                            </div>
                            <div className='details'>
                                <p style={{ fontSize: "12px" }}>Admin: {item.adminname}</p>
                                <h4>{item.groupname}</h4>
                                <p>{item.grouptagline}</p>
                            </div>
                            <div className='button'>
                                <Button onClick={() => handlegroup(item)} variant="contained" size="small" color='success'>Admin</Button>
                            </div>
                        </div>
                    ) : memberList.map((mem) =>
                        item.groupid == mem.groupid && userData.uid == mem.userid && (
                            <div className="list">
                                <div className='img'>
                                    <img src={profile} />
                                </div>
                                <div className='details'>
                                    <p style={{ fontSize: "12px" }}>Member: {mem.adminname}</p>
                                    <h4>{mem.groupname}</h4>
                                    <p>{mem.grouptagline}</p>
                                </div>
                                <div className='button'>
                                    <Button onClick={() => handlegroup(item)} variant="contained" size="small" color='success'>Member</Button>
                                </div>
                            </div>
                        )

                    )

                    )
                }

            </div>
        </div>
    )
}

export default MessageGroup