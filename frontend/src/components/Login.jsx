import React, { Component } from "react";

class LogIn extends Component {
  state = {
    usernameValue: "",
    emailValue: "",
    passwordValue: "",
    passwordConfirmationvalue: "",
  };

  render() {
    return (
      <div id="LogIn">
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
        </form>
      </div>
    );
  }
}

export default LogIn;
