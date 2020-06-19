import React, { Component } from "react";

import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

class QuestionDetail extends Component {
  render() {
    const q = this.props.question ? this.props.question : "";
    return (
      <>
        <Modal show={this.props.showModal} centered>
          <Modal.Header>
            <Modal.Title>{q.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{q.description}</Modal.Body>
          <Modal.Footer>
            <div className="mb-2">
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
            <Button variant="primary" onClick={this.props.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default QuestionDetail;
