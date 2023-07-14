import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useSelector } from 'react-redux/es/hooks/useSelector';


const UserList = () => {
    const db = getDatabase();
    const auth = getAuth();
    let [userList, setUserList] = useState([]);
    let [friendRequest, setFriendRequest] = useState([]);
    let [friends, setFriends] = useState([]);

    let userData = useSelector((state) => state.loggedUser.loginUser)

    useEffect(() => {
        const usersRef = ref(db, 'friendrequest/');
        onValue(usersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                arr.push(item.val().reciverid + item.val().senderid)
            })
            setFriendRequest(arr)
        });
    }, [])

    useEffect(() => {
        const usersRef = ref(db, 'friends/');
        onValue(usersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                arr.push(item.val().reciverid + item.val().senderid)
            })
            setFriends(arr)
        });
    }, [])

    useEffect(() => {
        const usersRef = ref(db, 'users/');
        onValue(usersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (userData.uid != item.key) {
                    arr.push({ ...item.val(), id: item.key })
                }
            })
            setUserList(arr)
        });
    }, [])

    let handleFriendRequest = (item) => {
        set(ref(db, 'friendrequest/' + (userData.uid + item.id)), {
            sendername: auth.currentUser.displayName,
            senderid: userData.uid,
            recivername: item.username,
            reciverid: item.id,
        });
    }

    let handleFriendRequestCancel = (item) => {
        console.log(userData.uid + item.id)
        remove(ref(db, 'friendrequest/' + (userData.uid + item.id)));
    }


    return (
        <div className='box'>
            <div className='titlebox'>
                <h3>User List</h3>
                <div className='button'>
                    <Button variant="contained" size="small">Create Group</Button>
                </div>
            </div>
            <div className='listbox'>
                {userList.map(item => (
                    <div className="list">
                        <div className='img'>
                            <img src={profile} />
                        </div>
                        <div className='details'>
                            <h4>{item.username}</h4>
                            <p>{item.email}</p>
                        </div>
                        <div className='button'>
                            {
                                friendRequest.includes(item.id + userData.uid)
                                    ? (<Button onClick={() => handleFriendRequestCancel(item)} variant="contained" size="small">Cancel</Button>)
                                    : friendRequest.includes(userData.uid + item.id)
                                        ? (<Button variant="contained" size="small">Pending</Button>)
                                        : friends.includes(item.id + userData.uid) || friends.includes(userData.uid + item.id)
                                            ? (<Button variant="contained" size="small" color='success'>Frinds</Button>)
                                            : (<Button onClick={() => handleFriendRequest(item)} variant="contained" size="small">Add</Button>)
                            }

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserList