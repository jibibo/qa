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
              className="card bg-dark"
              style={{
                borderRadius: 10,
                height: Math.floor(Math.random() * 300) + 200,
                border: "none",
                opacity: this.state.opacity,
              }}
            >
              <div className="card-body">
                <div
                  className="card-title"
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#212529",
                  }}
                >
                  <span>&#8203;</span>
                </div>
                <div
                  style={{
                    borderRadius: 10,
                    marginBottom: "10px",
                    backgroundColor: "#2b3036",
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
                    backgroundColor: "#1e2226",
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
                    backgroundColor: "#24292e",
                    display: "inline-block",
                    width: 170,
                  }}
                >
                  <span>&#8203;</span>
                </div>
                <div
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#1a1e21",
                    display: "inline-block",
                    width: 90,
                  }}
                >
                  <span>&#8203;</span>
                </div>
                <div
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#242a2e",
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
