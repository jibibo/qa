import React, { Component } from "react";

class Navbar extends Component {
  state = {
    loginCard: false,
    registerCard: false,
  };

  onOpenLogin = () => {
    this.setState({
      ...this.state,
      loginCard: true,
      registerCard: false,
    });
  };

  onOpenRegister = () => {
    this.setState({
      ...this.state,
      loginCard: false,
      registerCard: true,
    });
  };

  showCard = () => {
    if (this.state.loginCard) {
      return (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.registerCard) {
      return (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <></>;
  };

  render() {
    return (
      <>
        <div>
          <nav id="main-navbar" className="navbar navbar-expand-sm navbar-dark">
            <a className="navbar-brand" href="/">
              QA
            </a>
            <button
              type="button"
              className="btn btn-outline-light ml-auto"
              onClick={this.onOpenLogin}
            >
              Log in
            </button>
            <button
              type="button"
              className="btn btn-outline-light ml-3"
              onClick={this.onOpenRegister}
            >
              Register
            </button>
          </nav>
          {this.showCard()}
        </div>
      </>
    );
  }
}

export default Navbar;
