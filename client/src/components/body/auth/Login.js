import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import { dispatchLogin } from '../../../redux/actions/authActions'
import { useDispatch } from 'react-redux'
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// import login_img from '../../../assets/img/login.jpg'
const initialState = {
    iam:'',
    rollNo:'',
    email: '',
    password: '',
    err: '',
    success: ''
}
function Login() {
    const users = ['','student','faculty','incharge','hod']
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()
    const {iam, rollNo, email, password, err, success} = user

    const handleChangeInput = name => e => {
        const value = e.target.value
        setUser({...user, [name]:value, err: '', success: ''})
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try{
            const res = await axios.post('/user/login', {iam: users[iam], rollNo, email, password})
            setUser({...user, err: '', success: res.data.msg})
            //console.log(res)
            localStorage.setItem('refreshtoken',res.data.refreshtoken)
            localStorage.setItem('firstlogin',true)
            localStorage.setItem('iam',users[iam])
            dispatch(dispatchLogin())
            history.push("/")
            showSuccessMsg(res.data.msg)
        }catch(err){
            /* console.log("err")
            console.log(err.response) */
            //console.log(err?.response?.data?.msg)
            showErrMsg(err?.response?.data?.msg);
            err.response?.data?.msg &&
            setUser({...user, err: err.response.data.msg, success: ''}) 
        }
    }
    const m15 = {margin:'15px 0px' }
    const paperStyle = {padding: '30px 20px', width:350, margin:'15px auto'}

    return (
        <Box style={{ minHeight: '80vh' }}  sx={{  display: 'flex',alignItems: 'center' }} >
                <Paper elevation={20} style={paperStyle}   >
                    <Grid align='center'>
                        <h2>Login</h2>
                    </Grid>
                    <FormControl fullWidth style={m15}>
                        <InputLabel id="iam">I am</InputLabel>
                        <Select
                            labelId="iam"
                            id="iam-select"
                            value={iam}
                            label="iam"
                            onChange={handleChangeInput("iam")}
                        >
                            <MenuItem value={1}>Student</MenuItem>
                            <MenuItem value={2}>Faculty</MenuItem>
                            <MenuItem value={3}>Incharge</MenuItem>
                            <MenuItem value={4}>HOD</MenuItem>
                        </Select>
                        </FormControl>
                   {iam !== ''?
                   <form onSubmit={handleSubmit}>
                    { iam === 1? 
                        <TextField
                            required
                            id="outlined-required"
                            label="Roll Number"
                            variant="outlined"
                            fullWidth
                            style={m15}
                            onChange={handleChangeInput("rollNo")}
                            inputProps={{
                                maxLength: 10
                              }}/>
                    : 
                        <TextField
                            required
                            id="outlined-required"
                            label="E-mail"
                            variant="outlined"
                            fullWidth
                            style={m15}
                            onChange={handleChangeInput("email")}
                            />
                    }   
                        <TextField
                            type="password"
                            required
                            id="outlined-required"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            style={m15}
                            onChange={handleChangeInput("password")}/>
                        
                        
                        
                            <Button type='submit'fullWidth variant="outlined" style={m15}>Submit</Button>
                            <Link to="/forgot_password">Forgot your password?</Link>
                            <p>New User?<Link to="/register">Register here</Link></p>
                    </form>
                    : null}
                </Paper>
            </Box>
    )
}

export default Login
