import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector } from 'react-redux';


const FriendRequest = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loggedUser.loginUser)
    let [friendRequestList, setFriendRequestList] = useState([])

    useEffect(() => {
        const friendRequestRef = ref(db, 'friendrequest/');
        onValue(friendRequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (item.val().reciverid == userData.uid) {
                    arr.push({
                        ...item.val(), id: item.key
                    });
                }
            })
            setFriendRequestList(arr)
        });
    }, [])

    let handleReject = (id) => {
        remove(ref(db, 'friendrequest/' + (id)));
    }

    let handleAcceptFriendRequest = (item) => {
        set(push(ref(db, 'friends/')), {
            ...item,
        }).then(() => {
            remove(ref(db, 'friendrequest/' + (item.id)));
        });

    }

    return (
        <div className='box'>
            <div className='titlebox'>
                <h3>Friend  Request</h3>
            </div>
            <div className='listbox'>
                {
                    friendRequestList.length
                        ? <>{
                            friendRequestList.map(item => (
                                <div className="list">
                                    <div className='img'>
                                        <img src={profile} />
                                    </div>
                                    <div className='details'>
                                        <h4>{item.sendername}</h4>
                                        <p>Hi Guys, Wassup!</p>
                                    </div>
                                    <div className='button'>
                                        <Button onClick={() => handleAcceptFriendRequest(item)} variant="contained" size="small">Accept</Button>
                                        <Button onClick={() => handleReject(item.id)} variant="contained" size="small" color='error'>Reject</Button>
                                    </div>
                                </div>
                            ))
                        }</>
                        : <h3>No Friend Request</h3>
                }


            </div>



        </div>
    )
}

export default FriendRequest