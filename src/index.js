import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
// import './index.css';
import App from './App';
import SiteLayout from './Components/Layout/Layout';
// import reportWebVitals from './reportWebVitals';

import Login from './Components/Login/Login'; 
import AddUser from './Components/Users/AddUser';
import ManageUser from './Components/Users/ManageUsers';


const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path='/layout' component={SiteLayout}/>
      <Route path='/addUser' component={AddUser}/>
      <Route path= '/manageUser' component={ManageUser}/>
      {/* <Route path="/contact" component={Contact} /> */}
    </div>
  </Router>
)

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
