import React, { Component } from "react";
import "./index.css";

class App extends Component {
  state = { users: [] };

  render() {
    const { users } = this.state;

    return (
      <div>
        <div className="body">Event Manager</div>
      </div>
    );
  }
}

export default App;
