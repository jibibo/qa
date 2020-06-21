import React, { Component } from "react";

import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

class QuestionDetail extends Component {
  render() {
    const q = this.props.question ? this.props.question : "";
    return (
      <div id="QuestionDetail" onClick={this.props.closeModal}>
        <Modal
          show={this.props.showModal}
          centered
          onHide={() => console.log()}
          onExited={this.props.clearQuestion}
        >
          <Modal.Header>
            <Modal.Title>{q.title}</Modal.Title>
            <button type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            {q.description}
            <div className="mb-2 mt-1">
              {q
                ? q.tags.map((tag) => {
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
                  })
                : null}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => console.log("Answer!")}>
              Answer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default QuestionDetail;
