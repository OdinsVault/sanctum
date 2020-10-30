import React, { Component } from "react";
import "../App.css";

class FooterComponent extends Component {
  render() {
    return (
      <div>
        <footer class="footer mt-auto py-3">
          <div class="container">
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
