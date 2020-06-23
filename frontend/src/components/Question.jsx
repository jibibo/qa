import React, { Component } from "react";

class Question extends Component {
  state = {
    answerValue: "",
  };

  formatDate = () => {
    var date = new Date(this.props.question.createdDate);
    var now = Date.now();
    var delta = now - date.getTime();

    if (delta < 0) {
      return "TeneT?";
    } else if (delta === 0) {
      return "now!";
    } else if (delta <= 60000) {
      return Math.ceil(delta / 1000) + " s";
    } else if (delta <= 3600000) {
      return Math.ceil(delta / 60000) + " min";
    } else if (delta <= 86400000) {
      return Math.floor(delta / 3600000) + " h";
    } else {
      return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join(
        "-"
      );
    }
  };

  formatDateTitle = () => {
    return new Date(this.props.question.createdDate).toString();
  };

  isOldQuestion = () => {
    var date = new Date(this.props.question.createdDate);
    var now = Date.now();
    var delta = now - date.getTime();

    return delta > 86400000; // > 24 hours true/false
  };

  getCardClasses = () => {
    return `card ${this.isOldQuestion() ? "bg-dark text-white " : ""}${
      this.props.question.answers.length ? "border-success" : "border-danger"
    }`;
  };

  getAuthorButtonClasses = () => {
    return `btn btn-link btn-sm ${
      this.isOldQuestion() ? "text-light" : "text-dark"
    }`;
  };

  render() {
    return (
      <div
        id="Question"
        className={this.getCardClasses()}
        style={{ borderRadius: "10px" }}
      >
        <div className="card-header">
          <button className={this.getAuthorButtonClasses()}>
            <b>{this.props.question.author}</b>
          </button>
          <span title={this.formatDateTitle()} className="float-right">
            {this.formatDate()}
          </span>
        </div>
        <div className="card-body">
          <h2 className="card-title">{this.props.question.title}</h2>
          <p className="textInheritAll card-text">
            {this.props.question.description}
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.props.onHideQuestion}
          >
            Hide
          </button>
        </div>
        {this.props.question.tags.length > 0 ? (
          <div id="QuestionCardTags" className="card-footer">
            {this.props.question.tags.map((tag) => {
              // tags here

              return (
                <a
                  href="/"
                  key={tag}
                  className="badge badge-secondary text-light m-1"
                >
                  {tag}
                </a>
              );
            })}
          </div>
        ) : null}

        {this.props.question.answers.map((answer, i) => {
          return (
            <>
              <div className="card-body">
                <div className="d-flex rounded m-2">
                  <div className="d-inline rounded p-1">
                    <i
                      className="fa fa-arrow-up"
                      style={{ color: "green" }}
                    ></i>
                    <span className="m-1">
                      <b>{i}</b>
                    </span>
                    <i
                      className="fa fa-arrow-down"
                      style={{ color: "red" }}
                    ></i>
                  </div>
                  <br />
                  <p className="card-text ml-2" key={i}>
                    {answer}
                  </p>
                </div>
              </div>
            </>
          );
        })}

        {/* <ul className="list-group list-group-flush text-dark">
          <li className="list-group-item">Answer maybe like this</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul> */}

        <div className="card-body">
          <div className="media mb-3">
            <img
              className="mr-3"
              src="https://via.placeholder.com/64"
              alt="Profile"
            />
            <div className="media-body">
              <h6 className="mt-0">Answeree username</h6>
              YA YEE Cras sit amet nibh libero, in gravida nulla. Nulla vel
              metus scelerisque ante sollicitudin. Cras purus odio, vestibulum
              in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
              T
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="media mb-3">
            <img
              className="mr-3"
              src="https://via.placeholder.com/64"
              alt="Profile"
            />
            <div className="media-body">
              <h6 className="mt-0">Answeree username</h6>
              YA YEE Cras sit amet nibh libero, in gravida nulla. Nulla vel
              metus scelerisque ante sollicitudin. Cras purus odio, vestibulum
              in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
              T
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
