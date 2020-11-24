import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import HomeComponent from "./components/HomeComponent";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container-fluid">
          <Switch>
            <Route path="/" exact component={HomeComponent}></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
