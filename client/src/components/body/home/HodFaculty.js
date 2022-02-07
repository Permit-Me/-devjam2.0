import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import {Box, Grid, Stack, Paper, Button, TextField, FormControl, Select, MenuItem, InputLabel, Avatar} from '@mui/material'
import { addFacultyAct, loadFaculty, removeFacultyAct } from '../../../redux/actions/facultyAction';
import {useDispatch} from 'react-redux'
function HodFaculty() {
    const [faculty,setFaculty] = useState([]); 
    const [loadingState,setloadingState] = useState(true);
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const facultyRed = useSelector(state => state.faculty)
    const m15 = {margin:'15px 0px' }
    const paperStyle = {padding: '20px 20px', minWidth:350, margin:'15px auto'}
    const {user} = auth
    const [nav,setNav] = useState('Requests');
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(user && facultyRed.faculty.length === 0){
            const facultyReq = async () => {
                try {
                    const res = await axios.post('/hod/get/faculty', {hodYear: user?.year, department: user?.department },
                    { 'headers': { 'Authorization': token},
                    'credentials': 'include' })
                    console.log(res.data)
                    dispatch(loadFaculty(res.data))
                    setFaculty(res.data)
                } catch (err) {
                    showErrMsg(err)
                }
            }
            setloadingState(true)
            facultyReq()
            setloadingState(false)
        }
    },[user])
    const addFaculty = async (e,id,i) => {
        e.preventDefault()
        console.log("Addfaculty:")
        try{
                const req = async() => {
                    const res = await axios.post('/hod/approve/faculty', {id, permitted:true })
                    console.log("added");
                    console.log(res)

                }
                req()
                console.log("addfacreq() end")
                dispatch(addFacultyAct(id))
                showSuccessMsg("Added")
        }catch(err){
            showErrMsg(err)
        }

    }
    const removeFaculty = async(e,id, i ) => {
        e.preventDefault()
        console.log("remove Faculty")
        try{
            const req1 = async () => {
                const res = await axios.post('/hod/approve/faculty', {id, permitted:false })
                console.log("removed")
            }
            req1()
            console.log("remFacReq1() end")
            dispatch(removeFacultyAct(id))
            showSuccessMsg("Removed")

        }catch(err){
            showErrMsg(err)
        }
    }
    return (<>
        <Box style={{ minHeight: '80vh' }}  sx={{  display: 'flex',alignItems: 'start' }} >
            
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4}>
                {faculty?.map((fac,i)=> {
                    return (
                    <Paper style={paperStyle} key={fac?._id}>
                        <Grid  container align='center'  justifyContent='center'>
                            <Grid item >
                            <Avatar src={fac?.avatar} variant="rounded" />
                                <h5>{fac?.name}</h5>
                                <p>{fac?.email}</p>
                                {fac?.hodApproved? <Button variant="outlined" onClick={(e) => removeFaculty(e,fac._id,i)}>Remove</Button>:
                                <Button variant="outlined" onClick={(e) => addFaculty(e,fac._id,i)}>Add</Button>}
                            </Grid>

                        </Grid>
                    </Paper>
                    )})}
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default HodFaculty
