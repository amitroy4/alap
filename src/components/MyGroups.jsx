import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import { Button, Box, Typography, Modal, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue, remove } from "firebase/database";

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

const MyGroups = () => {
    const db = getDatabase();
    let [groupList, setGroupList] = useState([])
    let [groupReqList, setGroupReqList] = useState([])

    const [open, setOpen] = React.useState(false);
    const handleOpen = (group) => {
        const groupsRef = ref(db, 'grouprequest/');
        onValue(groupsRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (userData.uid == item.val().adminid && item.val().groupid == group.groupid) {
                    arr.push({
                        ...item.val(),
                        groupreqid: item.key,
                    });
                }
            })
            setGroupReqList(arr)
        });
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    let userData = useSelector((state) => state.loggedUser.loginUser)

    useEffect(() => {
        const groupsRef = ref(db, 'groups/');
        onValue(groupsRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (userData.uid == item.val().adminid) {
                    arr.push({
                        ...item.val(), groupid: item.key,
                    });
                }
            })
            setGroupList(arr)
        });
    }, [])

    let handleGroupDelete = (item) => {
        remove(ref(db, 'grouprequest/' + (item.groupreqid)));
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
                                <Button onClick={() => handleOpen(item)} variant="contained" size="small">Request</Button>
                                <Button variant="contained" size="small" color='success'>Member</Button>
                            </div>
                        </div>
                    ))
                }

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Group Request List
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {groupReqList.map(item => (
                                    <>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.username}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                        </Typography>
                                                        {" — Wants to join your group."}
                                                        <br />
                                                        <Button variant="contained" size="small" color='success' style={{ marginTop: "10px", marginBottom: "10px" }}>Accept</Button>
                                                        <Button onClick={() => handleGroupDelete(item)} variant="contained" size="small" color='error' style={{ marginLeft: "20px", marginTop: "10px", marginBottom: "10px" }}>Delete</Button>
                                                    </React.Fragment>

                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </>
                                ))}
                            </List>
                        </Typography>
                    </Box>
                </Modal>

            </div>
        </div>
    )
}

export default MyGroups