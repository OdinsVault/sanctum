import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Home.css";
import VisualiserService from "../../services/VisualizerService";

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickExecute = this.onClickExecute.bind(this);
  }
  onChangeHandler = (newValue) => {
    this.setState({
      code: newValue,
    });
  };
  onClickExecute = () => {
    console.log(this.state.code);
    VisualiserService.sendCodeSnippet(this.state.code).then((res) => {
      console.log(res.data);
    });
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="pr-5 pl-5 mr-5 ml-5">
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
                    Simply, a hastle free programming language for novice
                    programmers to easily get into the world of programming. You
                    can learn, practice and compete to polish you programming
                    skills here...
                  </p>
                </div>
              </section>
              <div class="album py-5 bg-light pb-5">
                <div class="container">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="card mb-4 shadow-sm">
                        <img
                          className="card-img-top"
                          width="100%"
                          height="225"
                          src="/assets/learn_img.png"
                          alt="learn_img.png"
                        />
                        <div class="card-body buttonCenter">
                          <p class="card-text">
                            Looking for a place to start coding? Here you will
                            learn all the basic concepts you need to know when
                            getting into programming...
                          </p>
                          <div className="pb-2">
                            <Button variant="dark" className="col-5">
                              Learn now
                            </Button>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card mb-4 shadow-sm">
                        <img
                          className="card-img-top"
                          width="100%"
                          height="225"
                          src="/assets/practice_img.png"
                          alt="learn_img.png"
                        />
                        <div class="card-body buttonCenter">
                          <p class="card-text">
                            Know a bit of programming? Let's practice! You can
                            practice the knowledge you have gained in a way you
                            will never find anywhere else...
                          </p>
                          <div className="pb-2">
                            <Button variant="dark" className="col-5">
                              Practice now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card mb-4 shadow-sm">
                        <img
                          className="card-img-top"
                          width="100%"
                          height="225"
                          src="/assets/compete_img.png"
                          alt="learn_img.png"
                        />
                        <div class="card-body buttonCenter">
                          <p class="card-text">
                            Wanna face a challange? Here you can compete with
                            others and know where you can place youself amongst
                            the best coders around the world...
                          </p>
                          <div className="pb-2">
                            <Button variant="dark" className="col-5">
                              Compete now
                            </Button>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
