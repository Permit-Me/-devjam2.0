import React from "react";
import './notification.css'
import { store } from 'react-notifications-component';
export const showErrMsg = (msg) => {
    store.addNotification({
        title: "",
        message: msg,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
          pauseOnHover: true
        }
      });
    return <div className='errMsg'>{msg}</div>
}
export const showSuccessMsg = (msg) => {
    store.addNotification({
        title: "",
        message: msg,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
          pauseOnHover: true
        }
      });
    return <div className='successMsg'>{msg}</div>
}