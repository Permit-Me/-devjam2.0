import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataProvider from './redux/store';
import axios from 'axios';
axios.defaults.baseURL = 'https://5000-yellow-spider-4yt6ism6.ws-us23.gitpod.io/api';
ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
    <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
