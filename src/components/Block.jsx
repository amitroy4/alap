import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';


const Block = () => {

    const db = getDatabase();

    let userData = useSelector((state) => state.loggedUser.loginUser)

    let [blocklist, setBlocklist] = useState([])

    useEffect(() => {
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {

                // this code is for not showing blocked user to block list
                // if (item.val().blockreciverid != userData.uid) {
                //     arr.push({
                //         ...item.val(), id: item.key
                //     })
                // }

                arr.push({
                    ...item.val(), id: item.key
                })
            })
            setBlocklist(arr)
        });
    }, [])

    return (
        <div className='box'>
            <div className='titlebox'>
                <h3>Blocked Users</h3>
            </div>
            <div className='listbox'>
                {
                    blocklist.map(item => (
                        <div className="list">
                            <div className='img'>
                                <img src={profile} />
                            </div>
                            <div className='details'>
                                {item.blocksenderid == userData.uid
                                    ?
                                    <h4>{item.blockrecivername}</h4>
                                    :
                                    <h4>{item.blocksendername}</h4>
                                }
                                <p>Hi Guys, Wassup!</p>
                            </div>
                            {
                                userData.uid == item.blocksenderid
                                && 
                                <div className='button'>
                                    <Button variant="contained" size="small">Unblock</Button>
                                </div>
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Block