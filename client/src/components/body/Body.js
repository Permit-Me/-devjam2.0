import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Home from './home/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'
import Logout from './auth/Logout'
import Profile from './profile/Profile'
import './body.css'
import RequestPass from './request/RequestPass'
import GatePass from './request/GatePass'
import EventPass from './request/EventPass'
import SickPass from './request/SickPass'
import OtherPass from './request/OtherPass'
import HodRequests from './home/HodRequests'
import HodFaculty from './home/HodFaculty'
import HodHome from './home/HodHome'
import TeacherHome from './home/TeacherHome'
import ApplyLeave from './request/ApplyLeave'
import FacultyHome from './home/FacultyHome'
function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, accType} = auth

    return (
        <section>
            <Switch>
                <Route exact path="/" component={ Home} />
                <Route exact path="/login" component={isLogged ? Home : Login} />
                <Route exact path="/register" component={isLogged ? Home : Register} />
                <Route exact path="/forgot_password" component={isLogged ? NotFound : ForgotPassword} />
                <Route exact path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword} />
                <Route exact path="/logout" component={isLogged ?  Logout: NotFound} />


                <Route exact path="/user/activate/:activation_token" component={ActivationEmail} />

                <Route exact path="/profile" component={isLogged ? Profile:NotFound} />
                <Route exact path="/request" component={isLogged ? RequestPass:NotFound} />

                <Route exact path="/gatepass" component={isLogged? GatePass :NotFound} />
                <Route exact path="/eventpass" component={isLogged? EventPass :NotFound} />
                <Route exact path="/sickpass" component={isLogged? SickPass :NotFound} />
                <Route exact path="/otherpass" component={isLogged? OtherPass :NotFound} />
                <Route exact path="/applyleave" component={isLogged? ApplyLeave :NotFound} />


                <Route exact path="/hod/home" component={isLogged? HodHome : NotFound} />
                <Route exact path="/teacher/home" component={isLogged? TeacherHome : NotFound} />
                <Route exact path="/faculty/home" component={isLogged? FacultyHome : NotFound} />
                <Route exact path="/hod/request" component={isLogged? HodRequests :NotFound} />
                <Route exact path="/hod/faculty" component={isLogged? HodFaculty :NotFound} />
                <Route exact path="/404" component={NotFound} /> 

                
                <Route  component={NotFound} />
            </Switch>
            
        </section>
    )
}

export default Body
