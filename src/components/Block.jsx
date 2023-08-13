import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, remove } from "firebase/database";
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
                if (item.val().blockreciverid == userData.uid || item.val().blocksenderid == userData.uid) {
                    arr.push({
                        ...item.val(), id: item.key
                    })
                }
            })
            setBlocklist(arr)
        });
    }, [])


    let handleUnblock = (item) => {
        remove(ref(db, 'block/' + item.id));
    }

    return (
        <div className='box'>
            <div className='titlebox'>
                <h3>Blocked Users</h3>
            </div>
            <div className='listbox'>
                {
                    blocklist.length ?
                        <>
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
                                                <Button onClick={() => handleUnblock(item)} variant="contained" size="small">Unblock</Button>
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                        </>
                        : <h3>No one Block</h3>
                }


            </div>
        </div>
    )
}

export default Block