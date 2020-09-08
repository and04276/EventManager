import React, { Component } from "react";
import ReactDOM from "react-dom";
import CreateEvent from "./createEvent.js";
import ViewEvent from "./viewEvent.js";
import UpdateEvent from "./updateEvent.js";
import DeleteEvent from "./deleteEvent.js";

class EventHome extends Component {

  componentDidMount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("response"));
  }

  componentWillUnmount() { }

  render() {
    return (
      <div className="Page">
        <div className="text">
          <p>What do you want to do?</p>
        </div>

        <button className="submit" onClick={this.createEvent}>
          Create an Event
        </button>

        <button className="submit" onClick={this.updateEvent}>
          Update an Event
        </button>

        <button className="submit" onClick={this.deleteEvent}>
          Delete an Event
        </button>

        <button className="submit" onClick={this.viewEvent}>
          View an Event
        </button>
      </div>
    );
  }


  handleChange = (change) => {
    if (change.target.id === "email") {
      this.setState({ email: change.target.value });
    } else if (change.target.id === "password") {
      this.setState({ password: change.target.value });
    }
  };

  createEvent = () => {
    ReactDOM.render(<CreateEvent />, document.getElementById("page"));
  };

  updateEvent = () => {
    ReactDOM.render(<UpdateEvent />, document.getElementById("page"));
  };


  deleteEvent = () => {
    ReactDOM.render(<DeleteEvent />, document.getElementById("page"));
  };


  viewEvent = () => {

    ReactDOM.render(<ViewEvent />, document.getElementById("page"));

  }
}

export default EventHome;
