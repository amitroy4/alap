import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue } from "firebase/database";

const MyGroups = () => {
    const db = getDatabase();
    let [groupList, setGroupList] = useState([])
    let userData = useSelector((state) => state.loggedUser.loginUser)

    useEffect(() => {
        const groupsRef = ref(db, 'groups/');
        onValue(groupsRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (userData.uid == item.val().adminid) {
                    arr.push({
                        ...item.val(),
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
                                <h4>{item.groupname}</h4>
                                <p>Hi Guys, Wassup!</p>
                            </div>
                            <div className='button'>
                                <Button variant="contained" size="small">Join</Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyGroups