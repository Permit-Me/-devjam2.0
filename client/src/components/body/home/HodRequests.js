import React,{useState, useEffect} from 'react'
import {Box, Grid, Stack, Paper, Button, TextField, FormControl, Select, MenuItem, InputLabel, Avatar} from '@mui/material'
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
function HodRequests() {
    const m15 = {margin:'15px 0px' }
    const paperStyle = {padding: '20px 20px', minWidth:350, margin:'15px auto'}
    const [requests, setRequests] = useState([])
    const history = useHistory();
    const auth = useSelector(state => state.auth)
    const {isLogged, iam, user} = auth
    useEffect(()=>{
        if(user){
            // const studentReq = async () => {
            //     try {
            //         const res = await axios.post('/hod/get/faculty', {hodYear: user?.year, department: user?.department })
            //         console.log(res.data)
            //         setRequests(res.data)
            //     } catch (err) {
            //         showErrMsg(err)
            //     }
            // }
            //studentReq()
        }
    },[]) 
    return (
        <div>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <Paper style={paperStyle}>
                        <Grid align='center'>
                            <h2>students Requests</h2>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default HodRequests
