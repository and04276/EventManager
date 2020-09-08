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
                    <select type="select" label="Event Details" defaultValue="Select an event to delete" onChange={this.deleteEvent}>
                        <option default disabled>Select an event to delete</option>
                        {optionTemplate}
                    </select>
                    <br></br>
                </div>
            );
        }
    }


    deleteEvent = (selection) => {
        if (selection !== undefined) {
            this.state.events.forEach(event => {
                if (parseInt(selection.target.value) === event.id) {
                    fetch("/api/delete", {
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
                            console.log(response)
                            if (response.success === 200) {
                                return ReactDOM.render(<div >Successfully deleted event</div>, document.getElementById("page"));
                            }
                        });
                }
            })
        }

    };

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