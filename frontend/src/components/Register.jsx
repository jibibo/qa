import React, { Component } from "react";

import axios from "axios";

class Register extends Component {
  state = {
    usernameValue: "",
    passwordValue: "",
    passwordConfirmationValue: "",
    hideUserExistsAlert: true,
    hideMatchPasswordAlert: true,
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

  render() {
    return (
      <div id="Register" className="col-md-12">
        <h4>
          <b>Register</b>
        </h4>
        <form onSubmit={this.registerUser} autoComplete="off">
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
