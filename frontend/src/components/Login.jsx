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
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <small className="form-text text-white mb-1">Username</small>
            <input
              type="text"
              className="form-control"
              style={{ backgroundColor: "rgb(33, 37, 41)", border: "none" }}
              name="username"
              value={this.state.usernameValue}
              placeholder="Username"
              onChange={(event) =>
                this.setState({ usernameValue: event.target.value })
              }
            />
          </div>
          <div className="form-group">
            <small className="form-text text-white mb-1">Password</small>

            <input
              type="password"
              className="form-control"
              style={{ backgroundColor: "rgb(33, 37, 41)", border: "none" }}
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
              type="submit"
              className="btn text-white"
              style={{ backgroundColor: "#121517" }}
              value="Log in"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
