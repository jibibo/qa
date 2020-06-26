import React, { Component } from "react";

class LoadingCards extends Component {
  state = {
    test: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    opacity: 1,
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ opacity: 0 });
    }, 4000);
  };

  render() {
    return (
      <div className="card-columns">
        {this.state.test.map((_, i) => {
          return (
            <div
              key={i}
              id="LoadingCards"
              className="card"
              style={{
                borderRadius: 10,
                backgroundColor: "#d9d9d9",
                height: Math.floor(Math.random() * 300) + 200,
                border: "none",
                opacity: this.state.opacity,
              }}
            >
              <div className="card-body">
                <div
                  className="card-title"
                  style={{ borderRadius: 10, backgroundColor: "#c9c9c9" }}
                >
                  <span>&#8203;</span>
                </div>
                <div
                  style={{
                    borderRadius: 10,
                    marginBottom: "10px",
                    backgroundColor: "#d4d4d4",
                    display: "inline-block",
                    width: 150,
                  }}
                >
                  <span>&#8203;</span>
                </div>
                <div
                  style={{
                    borderRadius: 10,
                    marginBottom: "10px",
                    backgroundColor: "#a3a3a3",
                    display: "inline-block",
                    width: 100,
                  }}
                >
                  <span>&#8203;</span>
                </div>
                <div
                  style={{
                    borderRadius: 10,
                    marginBottom: "10px",
                    backgroundColor: "#b8b8b8",
                    display: "inline-block",
                    width: 170,
                  }}
                >
                  <span>&#8203;</span>
                </div>
                <div
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#a3a3a3",
                    display: "inline-block",
                    width: 90,
                  }}
                >
                  <span>&#8203;</span>
                </div>
                <div
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#a3a3a3",
                    width: 35,
                    display: "inline-block",
                    float: "right",
                  }}
                >
                  <span>&#8203;</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default LoadingCards;
