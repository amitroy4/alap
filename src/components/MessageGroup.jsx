import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import profile from '../assets/profile.png'



const MessageGroup = () => {

    const db = getDatabase();
    let [groupList, setGroupList] = useState([])
    let userData = useSelector((state) => state.loggedUser.loginUser)

    useEffect(() => {
        const groupsRef = ref(db, 'members/');
        onValue(groupsRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (userData.uid == item.val().adminid || userData.uid == item.val().userid) {
                    arr.push({
                        ...item.val(), groupid: item.key,
                    });
                }
            })
            setGroupList(arr)
        });
    }, [])
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
                    groupList.map((item) => (

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
                                <Button variant="contained" size="small" color='success'>Member</Button>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default MessageGroup