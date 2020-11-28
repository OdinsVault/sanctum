import React, { Component } from "react";

export default class LearnPage extends Component {
  render() {
    return (
      <div>
        <section className="jumbotron text-center bgco jumboPadding">
          <div className="container">
            <div className="mb-3">
              <img
                src="/assets/logo_vect.svg"
                className="img-fluid simplyImg"
                alt="logo_img"
              />
            </div>
            <h1>Welcome to Simply...!</h1>
            <p className="lead text-muted">
              Simply, a hastle free programming language for novice programmers
              to easily get into the world of programming. You can learn,
              practice and compete to polish you programming skills here...
            </p>
          </div>
        </section>
      </div>
    );
  }
}
