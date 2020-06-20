import React, { Component } from "react";

import axios from "axios";

class Register extends Component {
  state = {
    usernameValue: "",
    withEmail: false,
    emailValue: "",
    passwordValue: "",
    confirmPasswordValue: "",
    hideDangerAlert: true,
    dangerAlertText: "",
    hideSuccessAlert: true,
    successAlertText: "",
  };

  handleSubmit = (event) => {
    const user = {
      username: this.state.usernameValue,
      withEmail: this.state.withEmail,
      email: this.state.emailValue,
      password: this.state.passwordValue,
      confirmPassword: this.state.confirmPasswordValue,
    };

    if (user.password === user.confirmPassword) {
      axios
        .post("http://localhost/user/register", user)
        .then((res) => {
          this.setState({
            usernameValue: "",
            emailValue: "",
            passwordValue: "",
            confirmPasswordValue: "",
            hideDangerAlert: true,
            dangerAlertText: "",
            hideSuccessAlert: true,
            successAlertText: "",
          });

          this.showSuccessAlert(`Registered ${res.data.username}!`);
          console.log(
            `Registered! ${res.data.username}, session token: ${res.data.sessionToken}`
          );
        })
        .catch((error) => {
          console.log(error.error);
          // this.showDangerAlert(error);
        });
    }

    event.preventDefault();
  };

  // alerts

  showDangerAlert = (text) => {
    this.setState({ hideDangerAlert: false, dangerAlertText: text });
  };

  hideDangerAlert = () => {
    this.setState({ hideDangerAlert: true, dangerAlertText: "" });
  };

  showSuccessAlert = (text) => {
    this.setState({ hideSuccessAlert: false, successAlertText: text });
  };

  hideSuccessAlert = () => {
    this.setState({ hideSuccessAlert: true, successAlertText: "" });
  };

  // handle input updates

  handleUsernameUpdate = (event) => {
    this.setState({
      usernameValue: event.target.value,
    });
  };

  handleWithEmailUpdate = (event) => {
    this.setState({
      withEmail: !this.state.withEmail,
    });
  };

  handleEmailUpdate = (event) => {
    this.setState({
      emailValue: event.target.value,
    });
  };

  handlePasswordUpdate = (event) => {
    this.setState({
      passwordValue: event.target.value,
    });
  };

  handleConfirmPasswordUpdate = (event) => {
    this.setState({
      confirmPasswordValue: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="form-group" style={{ borderRadius: "15px" }}>
            <input
              type="text"
              className="form-control"
              value={this.state.usernameValue}
              placeholder="Username"
              onChange={this.handleUsernameUpdate}
            />
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input
                    type="checkbox"
                    checked={this.state.withEmail}
                    onChange={this.handleWithEmailUpdate}
                  />
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                value={this.state.emailValue}
                placeholder="E-mail address"
                onChange={this.handleEmailUpdate}
                disabled={!this.state.withEmail}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              value={this.state.passwordValue}
              placeholder="Password"
              autoComplete="off"
              onChange={this.handlePasswordUpdate}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              value={this.state.confirmPasswordValue}
              placeholder="Confirm password"
              autoComplete="off"
              onChange={this.handleConfirmPasswordUpdate}
            />
          </div>
          <div
            className="alert alert-success"
            hidden={this.state.hideSuccessAlert}
          >
            {this.state.successAlertText}
          </div>
          <div
            className="alert alert-danger"
            hidden={this.state.hideDangerAlert}
          >
            {this.state.dangerAlertText}
          </div>
          <div>
            <input type="submit" className="btn btn-primary" value="Register" />
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
