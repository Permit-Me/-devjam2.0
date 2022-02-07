import React from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { showSuccessMsg } from '../../utils/notification/Notification';
import './auth.css'
function Logout() {
    const handleLogout = async () =>{
        try{
            await axios.get('/user/logout')
            localStorage.removeItem('firstlogin')
            localStorage.removeItem('refreshtoken')
            window.location.href = "/";
            showSuccessMsg("Logout success")
        }catch(err){
            window.location.href = "/";
        }
    }
    return (
        <div className="row p-5 m-5 vh-80 d-flex justify-content-center">
            <div className="col-3 align-items-center p-5">
            < CircularProgress className=" gpk-logout"/>
            {handleLogout()}
            </div>

        </div>
    )
}

export default Logout
