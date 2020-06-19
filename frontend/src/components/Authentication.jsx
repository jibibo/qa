import React, { Component } from "react";

import Login from "./Login";
import Register from "./Register";
import axios from "axios";

class Authentication extends Component {
  state = {
    showLogin: false,
    showRegister: false,
  };

  showLogin = () => {
    this.setState({
      showLogin: !this.state.showLogin,
    });
  };

  showRegister = () => {
    this.setState({
      showRegister: !this.state.showRegister,
    });
  };

  showLoginRegister = () => {
    if (this.state.showLogin) return <Login toggleLogin={this.showLogin} />;
    else if (this.state.showRegister)
      return <Register toggleRegister={this.showRegister} />;
    else return this.showAuthentication();
  };

  showAuthentication = () => {
    return (
      <div className="container text-center">
        <div className="d-inline">
          <input
            type="button"
            className="btn btn-primary"
            value="Register"
            onClick={this.showRegister}
          />
        </div>
        <div className="d-inline">
          <input
            type="button"
            className="btn btn-primary ml-1"
            value="Login"
            onClick={this.showLogin}
          />
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.showLoginRegister()}</div>;
  }
}

export default Authentication;
