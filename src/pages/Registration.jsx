import React from 'react'
import { Grid, TextField, Button } from '@mui/material';
import regimg from "../assets/regimg.png"
import Headingforreglog from '../components/Headingforreglog';

const Registration = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div className='regContainer'>
                    <Headingforreglog className="headerreglog" title="Get started with easily register" />
                    <p>Free register and you can enjoy it</p>
                    <div className='regInput'>
                        <TextField id="outlined-basic" label="Email Address" variant="outlined" />
                    </div>
                    <div className='regInput'>
                        <TextField id="outlined-basic" label="Ful name" variant="outlined" />
                    </div>
                    <div className='regInput'>
                        <TextField id="outlined-basic" label="Password" variant="outlined" />
                    </div>
                    <Button className='btnsl' variant="contained">Sign up </Button>
                </div>
            </Grid>
            <Grid item xs={6}>
                <img className='regimg' src={regimg} />
            </Grid>
        </Grid>
    )
}

export default Registration