import React, { Component } from "react";

import ReactDOM from "react-dom";

class ViewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: undefined,
            selectEventName: undefined,
            selection: undefined,
            eventDetails: undefined,
            participants: []
        };
    }

    componentDidMount() {
        ReactDOM.unmountComponentAtNode(document.getElementById("response"));
        var currentState = this;
        fetch("/api/getEvents", {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                if (response.success === 200) {
                    currentState.setState({
                        events: response.message
                    })
                }
            });
    }

    componentWillUnmount() { }
    render() {
        if (this.state.events === undefined) {
            return <div>Loading Data...</div>
        }
        else {
            let optionTemplate = createSelect(this.state);
            return (
                <div className="Page">
                    <select type="select" label="Event Details" defaultValue="Select an event" onChange={this.viewEventDetails}>
                        <option default disabled>Select an event</option>
                        {optionTemplate}
                    </select>
                    {this.state.eventDetails}
                    <br></br>
                </div>
            );
        }
    }


    viewEventDetails = (selection) => {
        if (selection !== undefined) {
            this.state.events.forEach(event => {
                if (parseInt(selection.target.value) === event.id) {
                    var startDate = new Date(event.start_date);
                    var endDate = new Date(event.end_date);

                    var startTime = event.start_time
                    var endTime = event.end_time
                    if (startTime === null) {
                        startTime = "unknown"
                    }
                    if (endTime === null) {
                        endTime = "unknown"
                    }


                    var currentState = this
                    this.getAllParticipants(event.id).then(() => {
                        var details = (<div>
                            <div>Event Details</div>
                            <br></br>
                            <div>Event Name:</div>
                            <div>{event.name}</div>
                            <br></br>
                            <div>Event Description:</div>
                            <div>{event.description}</div>
                            <br></br>
                            <div>Event Location:</div>
                            <div>{event.address}, {event.city}, {event.state}</div>
                            <div>{event.zip}</div>
                            <br></br>
                            <div>Event Time:</div>
                            <div>Start: {startDate.toDateString()} at {startTime}</div>
                            <div>End: {endDate.toDateString()} at {endTime}</div>
                            {currentState.state.participants.map((val, index) => {
                                return <div><br></br><div>Participant {index + 1}:</div><br></br><div>{val.firstname} {val.lastname}</div><div>{val.email} {val.phone}</div><br></br></div>
                            })}
                        </div>);

                        currentState.setState({ eventDetails: details })

                    });



                }


            })
        }

    };

    getAllParticipants = (id) => {
        var data = JSON.stringify({ "id": id });
        var currentState = this.state
        return fetch("/api/getParticipants", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data,
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {

                console.log(response)
                currentState.participants = []
                if (response.message.length > 0) {
                    response.message.forEach(participant => {
                        currentState.participants.push(participant)
                    });
                }
            });

    }



}



function createSelect(state) {
    if (state.events.length === 0) {
        return <div>Loading Data...</div>
    }
    else {
        var select = state.events.map(v => (
            <option value={v.id}>{v.name}</option>
        ));
        return select
    }
}


export default ViewEvent;