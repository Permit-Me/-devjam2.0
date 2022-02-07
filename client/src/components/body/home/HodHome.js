import React,{useEffect, useState} from 'react'
import {Box, Grid, Stack, Paper, Button, TextField, FormControl, Select, MenuItem, InputLabel, Avatar} from '@mui/material'
import axios from 'axios';
import {Link} from 'react-router-dom'

function HodHome() {
    const m15 = {margin:'15px 0px' }
    const paperStyle = {padding: '20px 20px', minWidth:350, margin:'15px auto'}
    return (
        <div>hello </div>
    // <div style={{ minHeight: '80vh' }}>
    //     <Box   sx={{  display: 'flex',alignItems: 'start' }} >
    //         <Grid container style={{margin: '15px 15px'}} >
    //             <Grid item xs={12}>
    //                 <Paper style={paperStyle}>
    //                         <Stack spacing={2}  justifyContent="center" direction="row">
    //                             <Link to='/hod/requests'>
    //                                 <Button variant="outlined" >Student Requests</Button>
    //                             </Link>
    //                             <Link to='hod/faculty'>
    //                                 <Button variant="outlined">Select Faculty</Button>
    //                             </Link>
    //                         </Stack>
    //                 </Paper>
    //             </Grid>
    //         </Grid>
    //     </Box>
    //     </div>
    )
}

export default HodHome
