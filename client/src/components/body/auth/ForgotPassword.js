import axios from 'axios'
import React, {useState} from 'react'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { isEmail } from '../../utils/validation/Validation'
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const initialState = {
    iam: '',
    email:'',
    err: '',
    success: ''
}
function ForgotPassword() {
    const [data, setData] = useState(initialState)
    
    const users = ['','student','faculty','incharge','hod']
    const {iam, email, err, success} = data

    const handleChangeInput = name => e => {
        const value = e.target.value
        setData({...data, [name]:value, err: '', success: ''})
    }

    const forgotPassword = async() => {
        
        if(!isEmail(email))
            return setData({...data, err: 'Invalid email.', success: ''})
        try{
            const res = await axios.post('/user/forgot', {iam:users[iam], email})
            return setData({...data, err:'', success: res.data.msg})
            showSuccessMsg(res.data?.msg)
        }catch(err){
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
            showErrMsg(err?.response?.data?.msg)
        }
        showSuccessMsg("submit");
        
    }
    const m15 = {margin:'15px 0px' }
    const paperStyle = {padding: '30px 20px', width:350, margin:'15px auto'}
    return (
        <Box style={{ minHeight: '80vh' }}  sx={{  display: 'flex',alignItems: 'center' }} >
                <Paper elevation={20} style={paperStyle}   >
                    <Grid align='center'>
                        <h2>Forgot Your Password?</h2>
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
                   <form onSubmit={forgotPassword}>
                        <TextField
                            required
                            id="outlined-required"
                            label="E-mail"
                            variant="outlined"
                            fullWidth
                            style={m15}
                            onChange={handleChangeInput("email")}
                            />
                            <Button type='submit'fullWidth variant="outlined" style={m15}>Verify your email</Button>
                    </form>
                    : null}
                </Paper>
            </Box>

    )
}

export default ForgotPassword
