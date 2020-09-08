import React, { Component } from "react";
import ReactDOM from "react-dom";
import Participant from "./Participant";

class UpdateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            eventName: "",
            description: "",
            eventStartDate: undefined,
            eventEndDate: undefined,
            eventStartTime: undefined,
            eventEndTime: undefined,
            address: "",
            city: "",
            state: "",
            zip: "",
            isVerifyDate: false,
            addParticipants: [],
            events: undefined,
            selectEventName: undefined,
            selection: undefined,
            eventDetails: undefined,
            participants: [],
            participantComponents: []
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
                    <div className="text">
                        <p>Update an event</p>
                    </div>
                    <select type="select" label="Event Details" defaultValue="Select an to update" onChange={this.viewEventDetails}>
                        <option default disabled>Select an to update</option>
                        {optionTemplate}
                    </select>
                    <div>
                        <div className="Page">
                            <div className="text">
                                <p>Update an event</p>
                            </div>
                            <div className="formLabel">
                                <label for="eventName">Event Name</label>
                            </div>
                            <div className="formName">
                                <input
                                    className="loginInput"
                                    id="eventName"
                                    onChange={this.handleChange}
                                    value={this.state.eventName}
                                />
                            </div>

                            <div className="formLabel">
                                <label for="eventDescription">Description</label>
                            </div>
                            <div className="formName">
                                <input
                                    className="loginInput"
                                    id="eventDescription"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.description}
                                    pass={this.state.description}
                                />
                            </div>

                            <div className="formLabel">
                                <label for="eventStartDate" >Event Start Date</label>
                            </div>
                            <div className="formName">
                                <input
                                    type="date"
                                    className="loginInput"
                                    id="eventStartDate"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.eventStartDate}
                                />
                            </div>


                            <div className="formLabel">
                                <label for="eventStartTime">Event Start Time</label>
                            </div>
                            <div className="formName">
                                <input
                                    type="time"
                                    className="loginInput"
                                    id="eventStartTime"
                                    defaultValue={this.state.eventStartTime}
                                />
                            </div>

                            <div className="formLabel">
                                <label for="eventEndDate">Event End Date</label>
                            </div>
                            <div className="formName">
                                <input
                                    type="date"
                                    className="loginInput"
                                    id="eventEndDate"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.eventEndDate}
                                />
                            </div>

                            <div className="formLabel">
                                <label for="eventEndTime">Event End Time</label>
                            </div>
                            <div className="formName">
                                <input
                                    type="time"
                                    step="1"
                                    className="loginInput"
                                    id="eventEndTime"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.eventEndTime}
                                />
                            </div>

                            <div className="formLabel">
                                <label for="eventAddress">Address</label>
                            </div>
                            <div className="formName">
                                <input
                                    className="loginInput"
                                    id="eventAddress"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.address}
                                    pass={this.state.address}
                                />
                            </div>

                            <div className="formLabel">
                                <label className="label" for="eventCity">City</label>
                            </div>
                            <div className="formName">
                                <input
                                    className="loginInput"
                                    id="eventCity"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.city}
                                    pass={this.state.city}
                                />
                            </div>

                            <div className="formLabel">
                                <label className="label" for="eventState">State</label>
                            </div>
                            <div className="formName">
                                <input
                                    className="loginInput"
                                    id="eventState"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.state}
                                    pass={this.state.state}
                                />
                            </div>

                            <div className="formLabel">
                                <label className="label" for="eventZip">Zip Code</label>
                            </div>
                            <div className="formName">
                                <input
                                    className="loginInput"
                                    id="eventZip"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.zip}
                                    pass={this.state.zip}
                                />
                            </div>

                            <div className="formLabel">
                                <label className="label" for="eventState">Participants</label>
                            </div>
                            {React.Children.toArray(this.state.participantComponents)}
                            <button className="submit" onClick={this.addParticipant.bind(this)}>
                                Add Participants
                            </button>

                            <br></br>
                            <button className="submit" onClick={this.updateEvent}>
                                Save Event
                            </button>
                        </div></div>
                    <br></br>
                </div>
            );
        }


    }


    deleteParticipant = (change) => {
        this.state.participants.splice(change.target.id, 1);
        this.setState({ participants: this.state.participants });
        this.state.participantComponents.splice(change.target.id, 1);

        this.state.participantComponents = []
        this.setState({ participantComponents: this.state.participantComponents })

        this.state.participants.map((val, index) => {
            this.state.participantComponents.push(
                <div>
                    <Participant value={val} index={index} />
                    <button className="submit" onClick={this.deleteParticipant.bind(this)} id={index}>
                        Delete Participant
                    </button>
                </div>)
        });


        this.setState({ participantComponents: this.state.participantComponents });
    }


    viewEventDetails = (selection) => {
        if (selection !== undefined) {
            this.state.events.forEach(event => {
                if (parseInt(selection.target.value) === event.id) {
                    var startTime = event.start_time
                    var endTime = event.end_time
                    if (startTime === null) {
                        startTime = "unknown"
                    }
                    if (endTime === null) {
                        endTime = "unknown"
                    }
                    var participantPromise = this.getAllParticipants(event.id);
                    participantPromise.then((resolved) => {
                        if (resolved) {
                            var startDate = new Date(event.start_date).toISOString().substr(0, 10);
                            var endDate = new Date(event.end_date).toISOString().substr(0, 10);
                            this.setState({ eventName: event.name })
                            this.setState({ description: event.description })
                            this.setState({ eventStartDate: startDate })
                            this.setState({ eventEndDate: endDate })
                            this.setState({ eventStartTime: event.start_time })
                            this.setState({ eventEndTime: event.end_time })
                            this.setState({ address: event.address })
                            this.setState({ city: event.city })
                            this.setState({ state: event.state })
                            this.setState({ zip: event.zip })
                            this.setState({ id: event.id })
                        }
                    })

                }


            })
        }
    }

    getAllParticipants = (id) => {
        var data = JSON.stringify({ "id": id });
        var currentState = this.state
        var obj = this
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
                currentState.participants = []
                console.log(response.message)
                if (response.message.length > 0) {
                    response.message.forEach(participant => {
                        console.log(participant)
                        var participantObj = {
                            participantEmail: participant.email,
                            participantFirstName: participant.firstname,
                            participantLastName: participant.lastname,
                            participantPhone: participant.phone,
                            participantId: participant.id
                        }
                        currentState.participants.push(participantObj)


                        console.log(currentState.participants)
                        currentState.participantComponents = []
                        currentState.participants.map((val, index) => {
                            currentState.participantComponents.push(
                                <div>
                                    <Participant value={val} index={index} />
                                    <button className="submit" onClick={obj.deleteParticipant.bind(obj)} id={index}>
                                        Delete Participant
                                    </button>
                                </div>)
                        });
                    });
                }
                return true;

            });

    }


    handleChange = (change) => {
        console.log(change.target.id)
        switch (change.target.id) {
            case "eventName":
                this.setState({ eventName: change.target.value });
                break;
            case "eventDescription":
                this.setState({ description: change.target.value });
                break;
            case "eventStartDate":
                this.setState({ eventStartDate: change.target.value });
                break;
            case "eventStartTime":
                console.log(this.state.eventStartTime)
                this.setState({ eventStartTime: change.target.value });
                break;
            case "eventEndDate":
                this.setState({ eventEndDate: change.target.value });
                break;
            case "eventEndTime":
                this.setState({ eventEndTime: change.target.value });
                break;
            case "eventAddress":
                this.setState({ address: change.target.value });
                break;
            case "eventCity":
                this.setState({ city: change.target.value });
                break;
            case "eventState":
                this.setState({ state: change.target.value });
                break;
            case "eventZip":
                this.setState({ zip: change.target.value });
            case "eventZip":
                this.setState({ zip: change.target.value });
                break;
        }
    };

    addParticipant = () => {
        this.state.participants.push({
            participantFirstName: "",
            participantLastName: "",
            participantPhone: "",
            participantEmail: ""
        })
        this.setState({ participants: this.state.participants })

        this.state.participantComponents = []
        this.setState({ participantComponents: this.state.participantComponents })
        this.state.participants.map((val, index) => {
            this.state.participantComponents.push(
                <div>
                    <Participant value={val} index={index} />
                    <button className="submit" onClick={this.deleteParticipant.bind(this)} id={index}>
                        Delete Participant
                    </button>
                </div>)
        });

        this.setState({ participantComponents: this.state.participantComponents })
    }

    updateEvent = () => {
        //TODO Create a array of error messages to address 
        this.checkValidForm(this.state)
        var isValidPhone = true
        this.state.isVerifyDate = this.verifyDates(this.state.eventStartDate, this.state.eventStartTime, this.state.eventEndDate, this.state.eventEndTime)
        var event = this.state

        //TODO pull this into a method instead
        this.state.participants.forEach(participant => {
            if (this.sanitizeAndVerifyPhone(participant.participantPhone)) {
                participant.participantPhone = this.sanitizeAndVerifyPhone(participant.participantPhone)
            } else {
                isValidPhone = false;
            }
        })


        var isValidEmail = true;
        this.state.participants.forEach(participant => {
            if (this.verifyEmail(participant.participantEmail)) {
                isValidEmail = true;
            } else {
                this.state.errorMessage = <div>Not a valid email</div>
                isValidEmail = false;
            }
        })

        console.log(isValidEmail)
        console.log(isValidPhone)

        if (this.state.isVerifyDate && isValidPhone && this.verifyZip(this.state.zip) && this.checkValidForm(this.state) && isValidEmail) {
            fetch("/api/update", {
                method: "put",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(event),
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("response"));
                    return ReactDOM.render(<div >Updated Event!</div>, document.getElementById("page"));
                });
        } else {
            return ReactDOM.render(this.state.errorMessage, document.getElementById("response"));

        }
    }

    verifyDates = (startDate, startTime, endDate, endTime) => {
        var start = new Date(startDate);
        var end = new Date(endDate);
        if (start.valueOf() < end.valueOf()) {
            return true;
        }
        else if (startDate === endDate) {
            if (startTime < endTime) {
                return true;
            }
            else {
                this.state.errorMessage = <div>Check your dates, they look wrong</div>
                return false;
            }
        }
        else {
            this.state.errorMessage = <div>Check your dates, they look wrong</div>
            return false;
        }

    }

    verifyEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    sanitizeAndVerifyPhone = (phone) => {
        if (phone.length < 10) {
            this.state.errorMessage = <div>Check participants phone number</div>
            return false
        } else {
            console.log(phone)
            phone = phone.toString().replace(/[^0-9]/g, "")
            return phone.trim();
        }
    }

    verifyState = (phone) => {
        //Add a select?
        //Check against list of states?
    }

    verifyZip = (zip) => {
        if (zip.length < 5) {
            this.state.errorMessage = <div>Zip code is too short</div>
            return false
        } else {
            return true
        }
    }

    checkValidForm = (state) => {

        console.log(state)
        if (state.eventName === "") {
            this.state.errorMessage = <div>Enter an event name</div>
            return false;
        }
        if (state.address === "") {
            this.state.errorMessage = <div>Enter an address</div>
            return false;
        }
        if (state.city === "") {
            this.state.errorMessage = <div>Enter a city</div>
            return false;
        }
        if (state.state === "") {
            this.state.errorMessage = <div>Enter a state</div>
            return false;
        }

        this.state.participants.forEach(participant => {
            if (participant.participantfirstName === "") {
                this.state.errorMessage = <div>enter participant first name</div>
                return false;
            }
            if (participant.participantlastName === "") {
                this.state.errorMessage = <div>enter participant last name</div>
                return false;
            }
            if (participant.participantPhone === "") {
                this.state.errorMessage = <div>enter participant phone number</div>
                return false;
            }
            if (participant.participantEmail === "") {
                this.state.errorMessage = <div>enter participant email</div>
                return false;
            }

        });
        return true
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

export default UpdateEvent;