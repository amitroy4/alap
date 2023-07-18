import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, set, ref, onValue, remove, push } from "firebase/database";
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
                if (
                    item.val().senderid == userData.uid ||
                    item.val().reciverid == userData.uid
                ) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setFriends(arr)
        });
    }, [])

    let handleBlock = (item) => {
        if (userData.uid == item.senderid) {
            set(push(ref(db, "block/")), {
                blockrecivername: item.recivername,
                blockreciverid: item.reciverid,
                blocksendername: item.sendername,
                blocksenderid: item.senderid,
            }).then(() => {
                remove(ref(db, "friends/" + item.id));
            })
        } else {
            set(push(ref(db, "block/")), {
                blockrecivername: item.sendername,
                blockreciverid: item.senderid,
                blocksendername: item.recivername,
                blocksenderid: item.reciverid,
            }).then(() => {
                remove(ref(db, "friends/" + item.id));
            })
        }
    }

    let handleUnfriend = (item) => {
        remove(ref(db, "friends/" + item.id));
    }


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
                                <Button onClick={() => handleBlock(item)} variant="contained" size="small">Block</Button>
                                <Button onClick={() => handleUnfriend(item)} variant="contained" size="small" color='error'>Unfrnd</Button>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Friends