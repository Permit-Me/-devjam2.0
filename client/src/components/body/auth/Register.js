import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
const initialState = {
    iam: '',
    name: '',
    email: '',
    rollNo:'',
    password: '',
    cf_password: '',
    year:'',
    gender:'',
    dept:'',
    contactNo:'',
    err: '',
    success: ''
}
function Register() {
    const users = ['','student','faculty','incharge','hod']
    const department = ['','CSE','ECE','IT','EEE','CIVIL','MECH']
    const gen = ['','Male','Female']
    const [user, setUser] = useState(initialState)
    const {iam, name, email, password, cf_password, rollNo, contactNo, gender, year, dept, err, success} = user

    const handleChangeInput = name => e => {
        const value = e.target.value
        setUser({...user, [name]:value, err: '', success: ''})
    }
    
    const handleSubmit = async e => {
        e.preventDefault()
        window.scrollTo(0, 0);
        alert(users[iam] + " | " + name + " | "+ email +" | "  +rollNo +" | " + password + " | " +
        cf_password + " | " + year + " | " + gen[gender] + " | " + department[dept] + " | " + contactNo);

        // if(isEmpty(name) || isEmpty(password))
        //         return setUser({...user, err: "Please fill in all fields.", success: ''})
        if( iam!==1 && !isEmail(email) )
            return showErrMsg("Invalid email")
            //return setUser({...user, err: "Invalid email", success: ''})
        if(isLength(password))
            return showErrMsg("Password must be at least 6 characters")
            //return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
        if(!isMatch(password, cf_password))
            return showErrMsg("Password did not match")
            //return setUser({...user, err: "Password did not match.", success: ''})
        
        try{
            const res = await axios.post('/user/register', {
                iam:users[iam], name, email, password, rollNo, contactNo, gender: gen[gender], year, dept: department[dept]
            })

            setUser({...user, err:'', success: res.data.msg})
            showSuccessMsg(res.data.msg);
        }catch(err){
            err.response?.data?.msg &&
            setUser({...user, err: err.response?.data?.msg, success: ''})
            showErrMsg(err.response?.data?.msg)
        }
        
        showSuccessMsg("Form Submited Successfully");
    }
    const paperStyle = {padding: '30px 20px', width:350, margin:'15px auto'}
    const headerStyle = {margin:0}
    const m15 = {margin:'15px 0px' }
    return (
            <Box style={{ minHeight: '80vh' }}  sx={{  display: 'flex',alignItems: 'center' }} >
                <Paper elevation={20} style={paperStyle}   >
                    <Grid align='center'>
                        <h2>Sign Up</h2>
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
                    { iam !== ''?
                    <form onSubmit={handleSubmit}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            style={m15}
                            onChange={handleChangeInput("name")} />
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
                                maxLength: 10,
                                minLength: 10
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
                            required
                            id="outlined-required"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            style={m15}
                            onChange={handleChangeInput("password")}/>
                        <TextField
                            required
                            id="outlined-required"
                            label="Confirm Password"
                            variant="outlined"
                            fullWidth
                            style={m15}
                            onChange={handleChangeInput("cf_password")} />
                        <TextField
                            required
                            id="outlined-required"
                            label="contact No"
                            variant="outlined"
                            fullWidth
                            style={m15}
                            defaultValue={"+91"}
                            onChange={handleChangeInput("contactNo")}
                            inputProps={{
                                maxLength: 13
                              }}
                            />
                        <FormControl fullWidth style={m15}>
                            <InputLabel id="year">Year*</InputLabel>
                                <Select
                                    required
                                    labelId="year"
                                    value={year}
                                    label="year"
                                    onChange={handleChangeInput("year")}
                                >
                                    <MenuItem value={1}>1st Year</MenuItem>
                                    <MenuItem value={2}>2nd Year</MenuItem>
                                    <MenuItem value={3}>3rd Year</MenuItem>
                                    <MenuItem value={4}>4th Year</MenuItem>
                                </Select>
                        </FormControl>
                        <FormControl fullWidth style={m15}>
                            <InputLabel id="gender">Gender*</InputLabel>
                                <Select
                                    required
                                    labelId="gender"
                                    value={gender}
                                    label="gender"
                                    onChange={handleChangeInput("gender")}
                                >
                                    <MenuItem value={1}>Male</MenuItem>
                                    <MenuItem value={2}>Female</MenuItem>
                                </Select>
                        </FormControl>
                        <FormControl fullWidth style={m15}>
                            <InputLabel id="dept">Dept*</InputLabel>
                                <Select
                                    required
                                    labelId="dept"
                                    value={dept}
                                    label="dept"
                                    onChange={handleChangeInput("dept")}
                                >
                                    
                                    <MenuItem value={1}>CSE</MenuItem>
                                    <MenuItem value={2}>ECE</MenuItem>
                                    <MenuItem value={3}>IT</MenuItem>
                                    <MenuItem value={4}>EEE</MenuItem>
                                    <MenuItem value={5}>CIVIL</MenuItem>
                                    <MenuItem value={6}>MECH</MenuItem>
                                </Select>
                        </FormControl>
                            <Button type='submit'fullWidth variant="outlined" style={m15}>Submit</Button>
                            <p>Already have an account?<Link to="/login"> Login Here</Link></p>
                    </form>
                    : null}
                </Paper>
            </Box>
    )
}

export default Register
