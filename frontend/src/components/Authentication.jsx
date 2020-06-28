import React, { Component } from "react";

import LogIn from "./LogIn";
import Register from "./Register";

class Authentication extends Component {
  state = {
    showLogIn: true,
    showRegister: false,
  };

  showLogIn = () => {
    this.setState({
      showLogIn: true,
      showRegister: false,
    });
  };

  showRegister = () => {
    this.setState({
      showLogIn: false,
      showRegister: true,
    });
  };

  renderCurrentAuthentication = () => {
    if (this.state.showRegister) {
      return <Register />;
    } else {
      return <LogIn />;
    }
  };

  render() {
    return (
      <div id="Authentication" className="card shadow-lg bg-dark">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${
                  this.state.showLogIn ? "active" : ""
                } text-white`}
                style={{
                  border: "none",
                  backgroundColor: this.state.showLogIn ? "#121517" : "#212529",
                }}
                onClick={this.showLogIn}
              >
                Log in
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${
                  this.state.showRegister ? "active" : ""
                } text-white`}
                style={{
                  border: "none",
                  backgroundColor: this.state.showRegister
                    ? "#121517"
                    : "#212529",
                }}
                onClick={this.showRegister}
              >
                Register
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">{this.renderCurrentAuthentication()}</div>
      </div>
    );
  }
}

export default Authentication;
