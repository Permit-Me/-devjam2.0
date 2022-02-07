import React,{useState, useEffect} from 'react'
import {Box, Grid, Paper, Button, TextField, FormControl, Select, MenuItem, InputLabel, Avatar} from '@mui/material'
import { useSelector, useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'

import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { loadFaculty } from '../../../redux/actions/facultyAction'
import { loadIncharge } from '../../../redux/actions/inchargeAction'
const initialState = {
    reason:'',
    faculty:'',
    title:'',
    err:'',
    success:''
}
function OtherPass() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [details,setDetails] = useState(initialState)
    const {reason, faculty, title} = details
    const auth = useSelector(state => state.auth)
    const {isLogged, iam, user} = auth
    const facultyRed = useSelector(state => state.faculty)
    const inchargeRed = useSelector(state => state.incharge)

    const [facultyArr,setFacultyArr]=useState([])
    const [incharge, setIncharge] = useState("")

    useEffect(() => {
        if(user && ((facultyRed.faculty.length === 0 )  || !(inchargeRed.incharge))){
            const facultyReq = async () => {
                try {
                    const res = await axios.post('/hod/get/faculty', {hodYear: user?.year, department: user?.department })
                    console.log(res.data)
                    setFacultyArr(res.data)
                    dispatch(loadFaculty(res.data))
                } catch (err) {
                    showErrMsg(err)
                }
            }

            const inchargeReq = async () => {
                try{
                    const res = await axios.post('/incharge/data', {inchargeYear: user?.year, department: user?.department })
                    console.log(res)
                    setIncharge(res.data[0])
                    dispatch(loadIncharge(res.data[0]))
                }catch(err){
                    showErrMsg(err)
                }
            }
            facultyReq()
            inchargeReq()
        }
    },[user, facultyArr])

    const handleChangeInput = name => e => {
        const value = e.target.value
        setDetails({...details, [name]:value, err: '', success: ''})
    }
    const submitRequest = async e=> {
        e.preventDefault()
        //showSuccessMsg("Submit btn")
        console.log("OtherPass Submit btn clicked")
        if(faculty === ''){
            return showErrMsg("Select Faculty")
        }

        try {
            await axios.post('/request/otherpass',
            {
                studentRollNo: user.rollNo,
                reason,
                title,
                facultyName: facultyRed.faculty[faculty].name,
                facultyMail: facultyRed.faculty[faculty].email,
                inchargeName:inchargeRed.incharge.name,
                inchargeEmail: inchargeRed.incharge.email,
                studentYear: user.year,
                department: user.department
            }).then(res => {
                alert(user.rollNo + " |  "+ reason + " | "+ facultyRed.faculty[faculty].name+ " | "+
                facultyRed.faculty[faculty].email+ " | "+ user.year + " | " + inchargeRed.incharge.name+" | " + inchargeRed.incharge.email + " | "
                +title+ " | "+ user.department)
                showSuccessMsg(""+ res.data.msg)
                history.push('/')
            }).catch(err => {
                console.log("OtherPass Submit Error")
                showErrMsg("err: "+err)
            })
            
        } catch (err) {
            console.log("OtherPass Submit Error")
            showErrMsg("err: "+err)
        }
        
    }

    const m15 = {margin:'15px 0px' }
    const paperStyle = {padding: '30px 20px', width:350, margin:'15px auto'}
    return (
            <Box style={{ minHeight: '80vh' }}  sx={{  display: 'flex',alignItems: 'center' }} >
                <Paper style={paperStyle}>
                    <Grid align='center'>
                        <h2>Other Pass Request</h2>
                            <form onSubmit={submitRequest}>
                            <TextField
                                    required
                                    id="outlined-required"
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    style={m15}
                                    onChange={handleChangeInput("title")}
                                    multiline
                                    minRows={4}
                                    />
                                <TextField
                                required
                                id="outlined-required"
                                label="Reason"
                                variant="outlined"
                                fullWidth
                                style={m15}
                                onChange={handleChangeInput("reason")}
                                multiline
                                minRows={4}
                                />
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

export default OtherPass
