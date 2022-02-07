import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import { Button, Paper, Select, Typography } from '@mui/material'
import {Link, useHistory} from 'react-router-dom'
function RequestPass() {
    const m15 = {margin:'15px 0px' }
    const paperStyle = {padding: '30px 20px', width:350, margin:'15px auto'}
    return (
        <Box style={{ minHeight: '80vh' }}  sx={{  display: 'flex',alignItems: 'center' }} >
                <Paper style={paperStyle}>
                    <Grid align='center'>
                        <h2>Request Pass</h2>
                        <Link to="/gatepass" style={{'textDecoration': 'none'}}>
                            <Button fullWidth variant="outlined" sx={{margin: '5px'}}>Gate Pass</Button>
                        </Link>
                        <Link to="/eventpass" style={{'textDecoration': 'none'}}>
                            <Button fullWidth variant="outlined" sx={{margin: '5px'}}>Event Pass</Button>
                        </Link>
                        <Link to="/sickpass" style={{'textDecoration': 'none'}}>
                            <Button fullWidth variant="outlined" sx={{margin: '5px'}}>Sick Pass</Button>
                        </Link>
                        <Link to="/otherpass" style={{'textDecoration': 'none'}}>
                            <Button fullWidth variant="outlined" sx={{margin: '5px'}}>Other Pass</Button>
                        </Link>
                        <Link to="/applyleave" style={{'textDecoration': 'none'}}>
                            <Button fullWidth variant="outlined" sx={{margin: '5px'}}>Apply Leave</Button>
                        </Link>

                    </Grid>
                </Paper> 
        </Box>
    )
}

export default RequestPass
