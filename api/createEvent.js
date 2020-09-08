const { pool } = require('../config')
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//Post Request to Login
function create(req, res) {
    if (!req.body) {
        return res.status(400).send({ message: "Missing fields" });
    }

    pool.query("INSERT INTO event(start_date, end_date, name, description, start_time, end_time, address, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id",
        [req.body.eventStartDate, req.body.eventEndDate, req.body.eventName, req.body.description, req.body.eventStartTime, req.body.eventEndTime, req.body.address, req.body.city, req.body.state, req.body.zip],
        function (err, result) {
            if (err) {
                console.log(err)
                return res.status(400).send({ message: "Failed to create" });
            }
            else {
                for (var i = 0; i < req.body.addParticipants.length; i++) {
                    pool.query("INSERT INTO participant(event_id, firstName, lastName, phone, email) VALUES ($1, $2, $3, $4, $5)",
                        [result.rows[0].id, req.body.addParticipants[i].participantFirstName, req.body.addParticipants[i].participantLastName, req.body.addParticipants[i].participantPhone, req.body.addParticipants[i].participantEmail],
                        function (err, result) {
                            if (err) {
                                console.log(err)
                                return res.status(400).send({ message: "Failed to create a participant" });
                            }
                        });
                }
                return res.status(200).send({ message: "Created Event and added participants" });
            }
        }
    );
}

module.exports = { createEvent: create }