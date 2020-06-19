import React, { Component } from "react";

import axios from "axios";

class Login extends Component {
  state = {
    usernameValue: "",
    emailValue: "",
    passwordValue: "",
    passwordConfirmationvalue: "",
  };

  render() {
    return (
      <div id="Login" className="col-md-12">
        <h4>
          <b>Login</b>
        </h4>
        <form autoComplete="off">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.state.usernameValue}
              placeholder="Username"
              onChange={(event) =>
                this.setState({ usernameValue: event.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.passwordValue}
              placeholder="Password"
              onChange={(event) =>
                this.setState({ passwordValue: event.target.value })
              }
            />
          </div>
          <div>
            <input
              type="button"
              className="btn btn-primary"
              value="Back"
              onClick={this.props.toggleLogin}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;