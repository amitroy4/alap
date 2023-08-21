import React from 'react'
import Grid from '@mui/material/Grid';
import Group from '../components/Group';
import FriendRequest from '../components/FriendRequest';
import Friends from '../components/Friends';
import MyGroups from '../components/MyGroups';
import UserList from '../components/UserList';
import Block from '../components/Block';
import MessageGroup from '../components/MessageGroup';
import Chatbox from '../components/Chatbox';


const Message = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <MessageGroup />
                <Friends />
            </Grid>
            <Grid item xs={8}>
                <Chatbox />
            </Grid>
        </Grid>
    )
}

export default Message