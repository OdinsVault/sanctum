import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import HomePage from "./pages/HomePage/HomePage";
import LearnPage from "./pages/LearnPage/LearnPage";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container-fluid">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/learn" component={LearnPage} />
            <Route component={ErrorComponent} />
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
