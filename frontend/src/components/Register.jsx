import React, { Component } from "react";

import axios from "axios";

class Register extends Component {
  state = {
    usernameValue: "",
    passwordValue: "",
    passwordConfirmationvalue: "",
  };

  render() {
    return (
      <div id="QuestionAdd" className="col-md-12 sticky-top">
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
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="passwordConfirmation"
              value={this.state.passwordConfirmationvalue}
              placeholder="Password Confirmation"
              onChange={(event) =>
                this.setState({
                  passwordConfirmationValue: event.target.value,
                })
              }
            />
          </div>
          <div>
            <input
              type="button"
              className="btn btn-primary"
              value="Back"
              onClick={this.props.toggleRegister}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
