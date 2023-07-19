import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';

import { getDatabase, ref, set, push, onValue } from "firebase/database";

import CircularProgress from '@mui/material/CircularProgress';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

let groupData = {
    groupname: "",
    grouptagline: "",
}

const Group = () => {

    const db = getDatabase();
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let userData = useSelector((state) => state.loggedUser.loginUser)

    let [groupInfo, setGroupInfo] = useState(groupData)
    let [groupList, setGroupList] = useState([])

    let handleChange = (e) => {
        setGroupInfo({
            ...groupInfo,
            [e.target.name]: e.target.value,
        })
    }

    let handleSubmit = () => {
        if (groupInfo.groupname == "") {
            setError("Group Name is Empty")
            return;
        }
        if (groupInfo.grouptagline == "") {
            setError("Group Tagline is Empty")
            return;
        }

        setLoader(true)
        set(push(ref(db, 'groups/')), {
            groupname: groupInfo.groupname,
            grouptagline: groupInfo.grouptagline,
            adminid: userData.uid,
            adminname: userData.displayName,
        }).then(() => {
            setGroupInfo({
                groupname: "",
                grouptagline: "",
            })
            setError("")
            setLoader(false)
            setOpen(false)
        });
    }

    useEffect(() => {
        const groupsRef = ref(db, 'groups/');
        onValue(groupsRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (userData.uid != item.val().adminid){

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
                <h3>Group List</h3>
                <div className='button'>
                    <Button onClick={handleOpen} variant="contained" size="small">Create Group</Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Create Your Group
                        </Typography>
                        <TextField onChange={handleChange} value={groupInfo.groupname} name='groupname' id="outlined-basic" label="Group Name" variant="outlined" margin="dense" />
                        {
                            error.includes("Name") && <p>{error}</p>
                        }
                        <TextField onChange={handleChange} value={groupInfo.grouptagline} name='grouptagline' id="outlined-basic" label="Group Tagline" variant="outlined" margin="dense" />
                        {
                            error.includes("Tagline") && <p>{error}</p>
                        }
                        <br />
                        {
                            loader ? <CircularProgress />
                                : <Button onClick={handleSubmit} margin="dense" variant="contained">Create</Button>
                        }
                    </Box>
                </Modal>
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

export default Group