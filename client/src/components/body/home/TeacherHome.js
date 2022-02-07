import React,{useEffect, useState} from 'react'
import {Stack,Box, Grid, Paper, Button, TextField, FormControl, Select, MenuItem, InputLabel} from '@mui/material'
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import SendIcon from '@mui/icons-material/Send';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import { loadGatePass } from '../../../redux/actions/requestActions';
function TeacherHome() {
    const m15 = {margin:'15px 0px' }
    const paperStyle = {padding: '30px 20px', minWidth:350, margin:'15px auto'}
    const history = useHistory();
    const auth = useSelector(state => state.auth)
    const requestRed = useSelector(state => state.request)
    const dispatch = useDispatch()
    const {isLogged, iam, user} = auth
    const [loadindState, setloadingState] = useState(false)
    // sx={{  display: 'flex',alignItems: 'center' }}
    const [requestData, setRequestData] = useState({ gate: null,sick:null,event:null,other:null,leave:null });

  useEffect(() => {
      if(user && iam === 'faculty' || iam === 'incharge'){
            const fetchData = async () => {
                try{
                    const gatePassRes = await axios.post(`/${iam}/get/gatepass`,{ inchargeEmail: user.email, year: user.year, inchargeDepartment:user.department});
                    //const sickPassRes = await axios.post(`/${iam}/get/sickpass`,{ inchargeEmail: user.email, year: user.year, inchargeDepartment:user.department});
                    const eventPassRes = await axios.post(`/${iam}/get/eventpass`,{ inchargeEmail: user.email, year: user.year, inchargeDepartment:user.department});
                    const otherPassRes = await axios.post(`/${iam}/get/otherpass`,{ inchargeEmail: user.email, year: user.year, inchargeDepartment:user.department});
                    //const leaveRes = await axios(`/${iam}/get/leave`);
                    setRequestData({gate: gatePassRes.data, sick: null ,event:eventPassRes.data,other:otherPassRes.data,leave:null })
                    console.log("-----")
                    console.log(requestData.gate)
                    console.log(requestData.event)
                }
                catch(err){
                    showErrMsg("Unknown error try after sometime : "+err);
                }
            };

            fetchData();
        }
  }, [user]);

    const approve = async(e) => {
        e.preventDefault()
        try{

        }catch(err){
            showErrMsg(""+err)
        }
    }
    const reject = async(e) => {
        e.preventDefault()
        try{

        }catch(err){
            showErrMsg(""+err)
        }
    }
    const moveHod = async(e) => {
        e.preventDefault()
        try{

        }catch(err){
            showErrMsg(""+err)
        }
    }
    return (<>
            <Grid container spacing={2} >
                <Grid xs={12} display={'flex'} justifyContent={'center'} >
                    <Paper style={paperStyle}>
                        <Grid>
                            <h2>Student Request's</h2>
                        </Grid>
                    </Paper> 
                </Grid>
                    {requestData.gate !== null && requestData.gate.map((req, index) => {
                        return (
                            <Grid xs={12} md={4} spacing={2}>
                                <Paper style={{padding: '15px 20px', margin: '10px 10px'}}>
                                    <p className="text-success">Gate</p>
                                        <h2>
                                            {req.studentRollNo}
                                        </h2>
                                        <h6>
                                            Reason: <p className="text-secondary"> {req.reason}</p>
                                        </h6>
                                        <Stack direction="row" spacing={2}>
                                            <Button variant="outlined" color="success" onClick={ (e) => approve(e,index)}>Approve</Button>
                                            <Button variant="outlined" color="error"  onClick={ (e) => reject(e,index)}>Reject</Button>
                                            <Button variant="outlined" color="warning"  endIcon={<SendIcon />} onClick={ (e) => moveHod(e,index)}>Move to HOD</Button>
                                        </Stack>
                                        
                                </Paper>
                            </Grid>
                        )
                    })}
                    {requestData.event !== null && requestData.event.map((req, index) => {
                        return (
                            <Grid xs={12} md={4} spacing={2}>
                                <Paper style={{padding: '15px 20px', margin: '10px 10px'}}>
                                    <p className="text-warning">Event</p>
                                        <h2>
                                            {req.studentRollNo}
                                        </h2>
                                        <h6>
                                            Event Name: <p className="text-secondary"> {req.eventName}</p>
                                            Venu: <p className="text-secondary"> {req.venu}</p>

                                        </h6>
                                        <Stack direction="row" spacing={2}>
                                            <Button variant="outlined" color="success" onClick={ (e) => approve(e,index)}>Approve</Button>
                                            <Button variant="outlined" color="error"  onClick={ (e) => reject(e,index)}>Reject</Button>
                                            <Button variant="outlined" color="warning"  endIcon={<SendIcon />} onClick={ (e) => moveHod(e,index)}>Move to HOD</Button>
                                        </Stack>
                                        
                                </Paper>
                            </Grid>
                        )
                    })}
                    {requestData.other !== null && requestData.other.map((req, index) => {
                        return (
                            <Grid xs={12} md={4} spacing={2}>
                                <Paper style={{padding: '15px 20px', margin: '10px 10px'}}>
                                    <p className="text-danger">Other</p>
                                        <h2>
                                            {req.studentRollNo}
                                        </h2>
                                        <h6>
                                            Reason: <p className="text-secondary"> {req.reason}</p>
                                        </h6>
                                        <Stack direction="row" spacing={2}>
                                            <Button variant="outlined" color="success" onClick={ (e) => approve(e,index)}>Approve</Button>
                                            <Button variant="outlined" color="error"  onClick={ (e) => reject(e,index)}>Reject</Button>
                                            <Button variant="outlined" color="warning"  endIcon={<SendIcon />} onClick={ (e) => moveHod(e,index)}>Move to HOD</Button>
                                        </Stack>
                                        
                                </Paper>
                            </Grid>
                        )
                    })}

                    
                    
            </Grid>
            </>
    )
}

export default TeacherHome
