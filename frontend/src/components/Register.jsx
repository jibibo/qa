import React, { Component } from "react";

import axios from "axios";

class Register extends Component {
  state = {
    usernameValue: "",
    passwordValue: "",
    registeredUser: "",
    passwordConfirmationValue: "",
    hideUserExistsAlert: true,
    hideMatchPasswordAlert: true,
    hideUserRegisteredAlert: true,
  };

  registerUser = (event) => {
    const [password, passwordConfirmation] = [
      this.state.passwordValue,
      this.state.passwordConfirmationValue,
    ];
    const user = {
      username: this.state.usernameValue,
      password: this.state.passwordValue,
    };

    if (password === passwordConfirmation) {
      axios
        .post("http://localhost/user/register", user)
        .then((res) => {
          this.setState({
            usernameValue: "",
            passwordValue: "",
            passwordConfirmationValue: "",
            hideMatchPasswordAlert: true,
            hideUserRegisteredAlert: false,
            registeredUser: res.data.username,
          });

          console.log(`Added User! ${res.data}`);
        })
        .catch((e) => {
          this.setState({
            hideMatchPasswordAlert: true,
            hideUserExistsAlert: false,
          });
          console.log(e);
        });
    } else {
      this.setState({ hideMatchPasswordAlert: false });
    }

    event.preventDefault();
  };

  handleUsernameChange = (event) => {
    this.setState({
      usernameValue: event.target.value,
      hideUserExistsAlert: true,
    });
  };

  render() {
    return (
      <div id="Register">
        <form onSubmit={this.registerUser} autoComplete="off">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.state.usernameValue}
              placeholder="Username"
              onChange={this.handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.passwordValue}
              placeholder="Password"
              autoComplete="off"
              onChange={(event) =>
                this.setState({ passwordValue: event.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="passwordConfirmation"
              value={this.state.passwordConfirmationValue}
              placeholder="Password Confirmation"
              autoComplete="off"
              onChange={(event) =>
                this.setState({
                  passwordConfirmationValue: event.target.value,
                })
              }
            />
          </div>
          <div
            className="alert alert-danger"
            hidden={this.state.hideMatchPasswordAlert}
          >
            Password does not match!
          </div>
          <div
            className="alert alert-danger"
            hidden={this.state.hideUserExistsAlert}
          >
            Username <b>{this.state.usernameValue}</b> already exists!
          </div>
          <div
            className="alert alert-success"
            hidden={this.state.hideUserRegisteredAlert}
          >
            User <b>{this.state.registeredUser}</b> successfully registered! Go
            back to{" "}
            <a
              href="/"
              onClick={this.props.toggleRegister}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Log in
            </a>{" "}
            to login with your credentials!
          </div>
          <div>
            <input
              type="button"
              className="btn btn-primary"
              value="Back"
              onClick={this.props.toggleRegister}
            />
            <div className="d-inline ml-1">
              <input
                type="submit"
                className="btn btn-primary"
                value="Register"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
