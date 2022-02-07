import React from 'react'
import {useSelector} from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import { Button, Paper, Select, Typography } from '@mui/material'
import {Link, useHistory} from 'react-router-dom'
import TeacherHome from './TeacherHome';
import HodHome from './HodHome';

function Home() {
    const history = useHistory();
    const auth = useSelector(state => state.auth)
    const {isLogged, iam, user} = auth
    const m15 = {margin:'15px 0px' }
    const paperStyle = {padding: '30px 20px', width:350, margin:'15px auto'}
    console.log(isLogged)
    if( isLogged && iam === "hod"){
        history.push('/hod/home');
    }else if(isLogged && iam === "student"){
    return (
        <Box style={{ minHeight: '80vh' }}  sx={{  display: 'flex',alignItems: 'center' }} >
            
                <Paper style={paperStyle}>
                    <Grid align='center'>
                        <h2>Welcome {user?.name}</h2>
                        <Link to="/request" style={{'textDecoration': 'none'}}>
                            <Button variant="outlined" sx={{margin: '5px'}}>Request Pass</Button>
                        </Link>
                    </Grid>
                </Paper> 
        </Box>
    )}else if(isLogged && (iam === "faculty" )){
        history.push('/faculty/home');
    }else if( isLogged &&  iam === "incharge"){
        history.push('/teacher/home');
    }
    return (
        <Box style={{ minHeight: '80vh' }}  sx={{  display: 'flex',alignItems: 'center' }} >
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <h2>Welcome to PermitMe</h2>
                    <Link to="/login" style={{'textDecoration': 'none'}}>
                        <Button variant="outlined" sx={{margin: '5px'}}>Login</Button>
                    </Link>
                    <Link to="/register" style={{'textDecoration': 'none'}}>
                        <Button variant="outlined" sx={{margin: '5px'}}>SignUp</Button>
                    </Link>
                </Grid>
            </Paper> 
    </Box>
    )
}

export default Home
