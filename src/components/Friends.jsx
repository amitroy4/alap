import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const Friends = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loggedUser.loginUser)
    let [friends, setFriends] = useState([])
    useEffect(() => {

        const friendsRef = ref(db, 'friends/');

        onValue(friendsRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                // console.log('user id', userData.uid);
                // console.log('Sender id', item.val().senderid);
                // console.log('reciver id', item.val().reciverid);
                if (
                    item.val().senderid == userData.uid ||
                    item.val().reciverid == userData.uid
                ) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setFriends(arr)
        });
        console.log(friends)
    }, [])
    return (
        <div className='box'>
            <div className='titlebox'>
                <h3>Friends</h3>
            </div>
            <div className='listbox'>
                {
                    friends.map((item) => ( 
                        <div className="list">
                            <div className='img'>
                                <img src={profile} />
                            </div>
                            <div className='details'>
                                {
                                    item.reciverid == userData.uid
                                    ?
                                    <h4>{item.sendername}</h4>
                                    :
                                    <h4>{item.recivername}</h4>
                                }
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

export default Friends