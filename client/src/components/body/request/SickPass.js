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
    err:'',
    success:''
}
function SickPass() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [details,setDetails] = useState(initialState)
    const {reason, faculty} = details
    const auth = useSelector(state => state.auth)
    const {isLogged, iam, user} = auth
    const facultyRed = useSelector(state => state.faculty)
    const inchargeRed = useSelector(state => state.incharge)

    const [facultyArr,setFacultyArr]=useState([])
    const [incharge, setIncharge] = useState("")

    useEffect(() => {
        if(user && ((facultyRed.faculty.length === 0 ) )){
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
            facultyReq()
        }
    },[user, facultyArr])

    const handleChangeInput = name => e => {
        const value = e.target.value
        setDetails({...details, [name]:value, err: '', success: ''})
    }
    const submitRequest = async e=> {
        e.preventDefault()
        //showSuccessMsg("Submit btn")
        console.log("SickPasee Submit btn clicked")
        if(faculty === ''){
            return showErrMsg("Select Faculty")
        }
        try {
            await axios.post('/request/sickpass',
            {
                studentRollNo: user.rollNo,
                reason,
                gender: user.gender,
                facultyName: facultyRed.faculty[faculty].name,
                facultyMail: facultyRed.faculty[faculty].email,
                studentYear: user.year,
                department: user.department
            }).then(res => {
                alert(user.rollNo + " |  "+ reason + " | "+ facultyRed.faculty[faculty].name+ " | "+
                facultyRed.faculty[faculty].email+ " | "+ user.year + " | " + user.gender +" | "+ user.department + " | ")
                showSuccessMsg(""+res.data.msg)
                history.push('/')
            }).catch(err => {
                console.log("SickPasee Submit Error")
                showErrMsg("err: "+err)
            })
            
        } catch (err) {
            console.log("SickPasee Submit Error")
            showErrMsg("err: "+err)
        }
        
    }

    const m15 = {margin:'15px 0px' }
    const paperStyle = {padding: '30px 20px', width:350, margin:'15px auto'}
    return (
            <Box style={{ minHeight: '80vh' }}  sx={{  display: 'flex',alignItems: 'center' }} >
                <Paper style={paperStyle}>
                    <Grid align='center'>
                        <h2>Sick Pass Request</h2>
                            <form onSubmit={submitRequest}>
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
                            <Button type="submit" variant="outlined" sx={{margin: '5px'}} >Submit</Button>
                            </form>
                        
                    </Grid>
                </Paper> 
        </Box>
    )
}

export default SickPass
