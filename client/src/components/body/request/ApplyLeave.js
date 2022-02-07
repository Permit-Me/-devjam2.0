import React, {useState, useEffect, Fragment} from 'react'
import {Stack, Input,Box, Grid, Paper, Button, TextField, FormControl, Select, MenuItem, InputLabel, Avatar} from '@mui/material'
import { useSelector, useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { loadFaculty } from '../../../redux/actions/facultyAction'
import { loadIncharge } from '../../../redux/actions/inchargeAction'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import moment from 'moment'
const initialState = {
    subject:'',
    body:'',
    startDate:'',
    endDate:'',
    faculty:'',
    err:'',
    success:''
}
function ApplyLeave() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [details,setDetails] = useState(initialState)
    const {subject, body, faculty} = details
    const auth = useSelector(state => state.auth)
    const {isLogged, iam, user} = auth
    const facultyRed = useSelector(state => state.faculty)
    const inchargeRed = useSelector(state => state.incharge)

    useEffect(() => {
        if(user && ((facultyRed.faculty.length === 0 )  || !(inchargeRed.incharge))){
            const facultyReq = async () => {
                try {
                    const res = await axios.post('/hod/get/faculty', {hodYear: user?.year, department: user?.department })
                    console.log(res.data)
                    dispatch(loadFaculty(res.data))
                } catch (err) {
                    showErrMsg(err)
                }
            }

            const inchargeReq = async () => {
                try{
                    const res = await axios.post('/incharge/data', {inchargeYear: user?.year, department: user?.department })
                    console.log(res)
                    dispatch(loadIncharge(res.data[0]))
                }catch(err){
                    showErrMsg(err)
                }
            }
            facultyReq()
            inchargeReq()
        }
    },[user])
    const handleChangeInput = name => e => {
        const value = e.target.value
        setDetails({...details, [name]:value, err: '', success: ''})
    }
    const submitRequest = async e=> {
        e.preventDefault()
        //showSuccessMsg("Submit btn")
        console.log("Apply Leave Submit btn clicked")
        if(faculty === ''){
            return showErrMsg("Select Faculty")
        }
        try {
            await axios.post('/request/leave',
            {
                studentRollNo: user.rollNo,
                subject: details.subject,
                body: details.body,
                startDate,
                endDate,
                facultyName: facultyRed.faculty[faculty].name,
                facultyMail: facultyRed.faculty[faculty].email,
                inchargeName:inchargeRed.incharge.name,
                inchargeEmail: inchargeRed.incharge.email,
                studentYear: user.year,
                department: user.department

            }).then((res) => {
                alert(user.rollNo + " |  "+ details.subject + " | "+  details.body + " | "+facultyRed.faculty[faculty].name+ " | "+
                facultyRed.faculty[faculty].email + " | " + inchargeRed.incharge.name+" | " + inchargeRed.incharge.email + " | "
                + moment(startDate).format('LLL')+ " | "+ moment(endDate).format('LLL') + " | " + user.year +" | " + user.department)
                showSuccessMsg(""+res.data.msg)
                
                //showSuccessMsg(" Request sent")
                history.push('/')
            }).catch(err=> {
                console.log("Eventasee Submit Error")
                showErrMsg("err: "+err)
            })
            
        } catch (err) {
            console.log("Eventasee Submit Error")
            showErrMsg("err: "+err)
        }
        
    }

    const token = useSelector(state => state.token)
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const handleStartDate = (newValue) => {
        setStartDate(newValue);
    };
    const handleEndDate = (newValue) => {
        setEndDate(newValue);
    };
    const m15 = {margin:'15px 0px' }
    const paperStyle = {padding: '30px 20px', width:350, margin:'15px auto'}

    return (
        <Box style={{ minHeight: '80vh' }}  sx={{  display: 'flex',alignItems: 'center' }} >
                <Paper style={paperStyle}>
                    <Grid align='center'>
                        <h2>Apply Leave Letter</h2>
                            <form onSubmit={submitRequest}>
                                <TextField
                                required
                                id="outlined-required"
                                label="Subject"
                                variant="outlined"
                                fullWidth
                                style={m15}
                                onChange={handleChangeInput("subject")}
                                multiline
                                minRows={1}
                                />
                            <TextField
                                required
                                id="outlined-required"
                                label="Body"
                                variant="outlined"
                                fullWidth
                                style={m15}
                                onChange={handleChangeInput("body")}
                                multiline
                                minRows={1}
                                />
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <Stack spacing={3}>
                            <DateTimePicker 
                                    label="Start Date Time"
                                    value={startDate}
                                    onChange={handleStartDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <DateTimePicker 
                                    label="End Date Time"
                                    value={endDate}
                                    onChange={handleEndDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                            
                        </LocalizationProvider>
                            <FormControl fullWidth style={m15}>
                                <InputLabel id="faculty">Select Faculty</InputLabel>
                                <Select
                                    labelId="faculty"
                                    id="faculty-select"
                                    value={faculty}
                                    label="faculty"
                                    onChange={handleChangeInput("faculty")}
                                >   {facultyRed?.faculty.map((fac,index) => {
                                        if(fac.hodApproved){
                                        return (
                                            <MenuItem value={index} key={fac._id}>
                                                <div className='row'>
                                                    <div className="col">
                                                        <Avatar src={fac.avatar} />
                                                    </div>
                                                    <div className="col">
                                                        {fac.name}<br/><span className="text-secondary">{fac.email} </span>
                                                    </div>
                                                 </div>
                                            </MenuItem>
                                        )}
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth style={m15}>
                                <InputLabel id="incharge">Incharge</InputLabel>
                                <Select
                                    labelId="incharge"
                                    id="incharge-select"
                                    value={0}
                                    label="incharge"
                                    onChange={handleChangeInput("incharge")} >
                                        <MenuItem value={0} key={inchargeRed?.incharge?._id}>
                                            <div className='row'>
                                                <div className="col">
                                                    <Avatar src={inchargeRed?.incharge?.avatar} />
                                                </div>
                                                <div className="col">
                                                    {inchargeRed?.incharge?.name}<br/><span className="text-secondary">{inchargeRed?.incharge?.email} </span>
                                                </div>
                                                </div>
                                        </MenuItem>
                                </Select>
                            </FormControl>
                        
                            
                            <Button type="submit" variant="outlined" sx={{margin: '5px'}} >Submit</Button>
                            </form>
                        
                    </Grid>
                </Paper> 
        </Box>
    )
}

export default ApplyLeave
