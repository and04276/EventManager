import React, { Component } from "react";
import ReactDOM from "react-dom";

class Participant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: [],
            participantEmail: "",
            participantFirstName: "",
            participantLastName: "",
            participantPhone: ""
        };
    }

    componentDidMount() {
        this.setState({ participantFirstName: this.props.value.participantFirstName })
        this.setState({ participantLastName: this.props.value.participantLastName })
        this.setState({ participantPhone: this.props.value.participantPhone })
        this.setState({ participantEmail: this.props.value.participantEmail })
    }

    componentWillUnmount() {

    }


    render() {
        return <form>
            <div className="formLabel">
                <label className="label" for="eventState">Participant {this.props.index + 1}</label>
            </div>
            <div className="formLabel">
                <label className="label" for="eventState">First Name</label>
            </div>
            <div className="formName">
                <input
                    className="loginInput"
                    id="participantFirstName"
                    name={this.props.index}
                    onChange={this.handleChange}
                    value={this.props.value.participantFirstName}
                />
            </div>
            <div className="formLabel">
                <label className="label" for="eventState">Last Name</label>
            </div>
            <div className="formName">
                <input
                    className="loginInput"
                    id="participantLastName"
                    name={this.props.index}
                    onChange={this.handleChange}
                    value={this.props.value.participantLastName}
                />
            </div>

            <div className="formLabel">
                <label className="label" for="eventState">Phone Number</label>
            </div>
            <div className="formName">
                <input
                    className="loginInput"
                    id="participantPhone"
                    name={this.props.index}
                    onChange={this.handleChange}
                    value={this.props.value.participantPhone}
                />
            </div>
            <div className="formLabel">
                <label className="label" for="eventState">Email</label>
            </div>
            <div className="formName">
                <input
                    className="loginInput"
                    id="participantEmail"
                    name={this.props.index}
                    onChange={this.handleChange}
                    value={this.props.value.participantEmail}
                />
            </div>
            <br></br>
        </form>
    }

    handleChange = (change) => {
        switch (change.target.id) {
            case "participantFirstName":
                this.setState({ participantFirstName: change.target.value })
                this.props.value.participantFirstName = change.target.value;
                break;
            case "participantLastName":
                this.setState({ participantLastName: change.target.value })
                this.props.value.participantLastName = change.target.value;
                break;
            case "participantPhone":
                this.setState({ participantPhone: change.target.value })
                this.props.value.participantPhone = change.target.value;
                break;
            case "participantEmail":
                this.setState({ participantEmail: change.target.value })
                this.props.value.participantEmail = change.target.value;
                break;
        }
    };

}

export default Participant;