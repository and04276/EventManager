import React, { Component } from "react";
import ReactDOM from "react-dom";
import Participant from "./Participant";

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            participantComponents: [],
            errorMessage: undefined
        };
    }

    componentDidMount() {
        ReactDOM.unmountComponentAtNode(document.getElementById("response"));
    }

    componentWillUnmount() { }

    render() {
        return (
            <div className="Page">
                <div className="text">
                    <p>Create an event</p>
                </div>


                <div className="formLabel">
                    <label for="eventName">Event Name</label>
                </div>
                <div className="formName">
                    <input
                        className="loginInput"
                        id="eventName"
                        onChange={this.handleChange}
                        pass={this.state.eventName}
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
                        pass={this.state.description}
                    />
                </div>

                <div className="formLabel">
                    <label for="eventStartDate" >Event Start Date</label>
                </div>
                <div className="formName">
                    <input
                        type="date"
                        step="1"
                        className="loginInput"
                        id="eventStartDate"
                        onChange={this.handleChange}
                        pass={this.state.eventStartDate}
                    />
                </div>


                <div className="formLabel">
                    <label for="eventStartTime">Event Start Time</label>
                </div>
                <div className="formName">
                    <input
                        type="time"
                        step="1"
                        className="loginInput"
                        id="eventStartTime"
                        onChange={this.handleChange}
                        pass={this.state.eventStartTime}
                    />
                </div>

                <div className="formLabel">
                    <label for="eventEndDate">Event End Date</label>
                </div>
                <div className="formName">
                    <input
                        type="date"
                        step="1"
                        className="loginInput"
                        id="eventEndDate"
                        onChange={this.handleChange}
                        pass={this.state.eventEndDate}
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
                        pass={this.state.eventEndTime}
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
                        pass={this.state.zip}
                    />
                </div>

                <div className="formLabel">
                    <label className="label" for="eventState">Participants</label>
                </div>
                {React.Children.toArray(this.state.participantComponents)}
                <button className="submit" onClick={this.addParticipant}>
                    Add Participants
                </button>
                <br></br>
                <button className="submit" onClick={this.createEvent}>
                    Create
                </button>
            </div>
        );
    }


    handleChange = (change) => {
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


    deleteParticipant = (change) => {
        this.state.addParticipants.splice(change.target.id, 1);
        this.setState({ addParticipants: this.state.addParticipants });
        this.state.participantComponents.splice(change.target.id, 1);

        this.state.participantComponents = []
        this.setState({ participantComponents: this.state.participantComponents })

        this.state.addParticipants.map((val, index) => {
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


    addParticipant = () => {
        this.state.addParticipants.push({
            participantFirstName: "",
            participantLastName: "",
            participantPhone: "",
            participantEmail: ""
        })
        this.setState({ addParticipants: this.state.addParticipants })

        this.state.participantComponents = []
        this.setState({ participantComponents: this.state.participantComponents })
        this.state.addParticipants.map((val, index) => {
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

    createEvent = () => {
        //TODO Create a array of error messages to address 
        this.checkValidForm(this.state)
        var isValidPhone = true
        this.state.isVerifyDate = this.verifyDates(this.state.eventStartDate, this.state.eventStartTime, this.state.eventEndDate, this.state.eventEndTime)
        var event = this.state

        //TODO pull this into a method instead
        this.state.addParticipants.forEach(participant => {
            if (this.sanitizeAndVerifyPhone(participant.participantPhone)) {
                participant.participantPhone = this.sanitizeAndVerifyPhone(participant.participantPhone)
            } else {
                isValidPhone = false;
            }
        })


        var isValidEmail = true;
        this.state.addParticipants.forEach(participant => {
            if (this.verifyEmail(participant.participantEmail)) {
                isValidEmail = true;
            } else {
                this.state.errorMessage = <div>Not a valid email</div>
                isValidEmail = false;
            }
        })


        if (this.state.isVerifyDate && isValidPhone && this.verifyZip(this.state.zip) && this.checkValidForm(this.state) && isValidEmail) {

            console.log("here")
            fetch("/api/create", {
                method: "post",
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
                    return ReactDOM.render(<div >Created!</div>, document.getElementById("page"));
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

        this.state.addParticipants.forEach(participant => {
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

        })

        return true
    }


}



export default CreateEvent;