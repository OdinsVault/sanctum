import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import HomePage from "./pages/HomePage/HomePage";
import LearnPage from "./pages/LearnPage/LearnPage";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";
import PracticePage from "./pages/PracticePage/PracticePage";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
  return (
    <HashRouter>
      <div>
        <Router>
          <HeaderComponent />
          <div className="container-fluid-md">
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/auth" component={AuthPage} />
              <Route path="/learn" component={LearnPage} />
              <Route path="/practice" component={PracticePage} />
              <Route path="/question" component={QuestionPage} />
              <Route component={ErrorComponent} />
            </Switch>
          </div>
          <FooterComponent />
        </Router>
      </div>
    </HashRouter>
  );
}

export default App;
