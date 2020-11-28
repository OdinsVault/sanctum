import React, { Component } from "react";
import "../../App.css";

class FooterComponent extends Component {
  render() {
    return (
      <div>
        <footer className="footer mt-auto py-3" style={{ position: "unset" }}>
          <div className="container">
            <span className="text-muted">
              {" "}
              © 2020 Copyright:
              <a href=""> Team Insomniac</a>
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

export default FooterComponent;
