import React, { useEffect } from 'react';
import { Switch, Route, Redirect, BrowserRouter, useHistory } from 'react-router-dom';
import App from './App';
import DashBoard from './Components/Dashboard/Dashboard';
import SiteLayout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import AddUser from './Components/Users/AddUser';
import ManageUser from './Components/Users/ManageUsers';
import OverviewCourse from './Components/Learn/CourseOverview';
import OverviewPractice from "./Components/Practice/PracticeOverview";
import CourseDetails from "./Components/Learn/CourseDetails";
import QuestionList from "./Components/Practice/QuestionsList";


// function TryPoke() {
//     // Do a POKE and update the ticket
//     PokeSession().then(session => {
//         localStorage.setItem("token", session.token);
//         localStorage.setItem("loggedInData", session.validTo);
//     }).catch(err => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('loggedInData');
//     });
// }

function CheckLogOnStatus() {
    let token = localStorage.getItem('token');
    // let validTime = localStorage.getItem('loggedInData');

    if (token) {
        // TryPoke();
        return true;
    } else {
        return false;
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => {

    // const history = useHistory();

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         history.push('/login', { directLogin: false });
    //     }, (1000 * 60 * 14));
    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <Route {...rest} render={(props) => (
            (true)
                ? (<SiteLayout><Component {...props} /></SiteLayout>)
                : (<Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />)
        )} />);
}

const Routes = () => {

    // console.log('Application running in ' + process.env.NODE_ENV + ' mode');
    let basePath = "/simply";

    // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //     basePath = "/"
    // } else {
    //     basePath = "/DIPS-ANC/ANCDMClient"
    // }

    return (
        <BrowserRouter basename={basePath} >
            <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute  path='/dashboard' component={DashBoard}/>
                <PrivateRoute  path='/courses/overview' component={OverviewCourse}/>
                <PrivateRoute  path="/courses/:courseName" component={CourseDetails}/>
                <PrivateRoute  path='/practice/overview' component={OverviewPractice}/>
                <PrivateRoute  path='/practice/:courseName' component={QuestionList}/>
                <PrivateRoute path='/addUser' component={AddUser}/>
                <PrivateRoute path= '/manageUser' component={ManageUser}/>
                <PrivateRoute exact path="/" component={DashBoard} />
                <Route exact path="/" component={App} />
      
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;