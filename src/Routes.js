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
import GettingStart from "./Components/Documentation/GettingStart";
import Documentation from "./Components/Documentation/Documentation";
import DevelopersGuide from "./Components/Documentation/DevelopersGuide";
import Visualizer from "./Components/Visualizer/CodeVisualizer";
import Question from "./Components/Practice/SelectedQuestion";
import OverviewCompete from "./Components/Compete/CompeteOverview";
import Leaderboard from "./Components/LeaderBoad/Leaderboard";
import ProfileView from "./Components/Profile/ProfileView";


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
    // console.log("CheckLogOnStatus",token)
    if(token) {
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
            (CheckLogOnStatus)
                ? (<SiteLayout><Component {...props} /></SiteLayout>)
                : (<Redirect to={{
                    pathname: '/dashboard',
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
                <PrivateRoute exact path='/practice/:courseName' component={QuestionList}/>
                <PrivateRoute   path='/compete/overview' component={OverviewCompete}/>
                <PrivateRoute exact path='/question/:questionTitle' component={Question}/>
                <PrivateRoute  path='/learn/gettingStart' component={GettingStart}/>
                <PrivateRoute  path='/learn/documentation' component={Documentation}/>
                <PrivateRoute  path='/learn/developerGuide' component={DevelopersGuide}/>
                <PrivateRoute  path='/codeVisualizer' component={Visualizer}/>
                <PrivateRoute  path='/leaderboard' component={Leaderboard}/>
                <PrivateRoute  path='/profile' component={ProfileView}/>
                <PrivateRoute path='/addUser' component={AddUser}/>
                <PrivateRoute path= '/manageUser' component={ManageUser}/>
                <PrivateRoute exact path="/" component={DashBoard} />
                <Route exact path="/" component={DashBoard} />
      
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;