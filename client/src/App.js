import React, {useEffect} from 'react';
import  {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';  
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {dispatchLogin, fetchUser, dispatchGetUser} from './redux/actions/authActions';
import { returnErrors } from './redux/actions/errorActions';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
function App() {
  const THEME = createTheme({
    typography: {
     "fontFamily": `"Poppins", sans-serif`,
     "fontSize": 14,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500
    }
 });

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstlogin')
    const rf_token = localStorage.getItem('refreshtoken')
    const iam = localStorage.getItem('iam')

    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token',{refreshtoken: rf_token, iam})
        try{
          dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
        }catch(e){
          console.log(e)
        }
      }
      getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    if(token){
      const getUser = async () => {
        dispatch(dispatchLogin())
        const iam = localStorage.getItem('iam')
          const res = await axios.post('/user/infor', {iam},
            { 'headers': { 'Authorization': token},
            'credentials': 'include' })
            
        return dispatch(dispatchGetUser(res.data))
      }
      getUser()
    }
  }, [token, dispatch])
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
    <ThemeProvider theme={THEME}>
      <div className="App">
      <ReactNotification />
        <Router>
          <Header/>
        </Router>
      </div>
    </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
