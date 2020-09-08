const { pool } = require('../config')
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//Post Request to Login
function update(req, res) {
    console.log(req.body.participants)
    if (!req.body) {
        return res.status(400).send({ message: "Missing fields" });
    }

    //TODO improve this query
    //Should use put instead of post
    //Should also change to a DELETE FROM participant WHERE event_id = (event_id) AND id IS NOT IN (req.body.participants[id's] //but change that to an array of id's) to check for particpants instead of clearing it - could be super inefficient
    pool.query("UPDATE event SET start_date = ($1), end_date = ($2), name = ($3), description = ($4), start_time = ($5), end_time = ($6), address = ($7), city = ($8), state = ($9), zip = ($10) WHERE id = ($11) RETURNING id",
        [req.body.eventStartDate, req.body.eventEndDate, req.body.eventName, req.body.description, req.body.eventStartTime, req.body.eventEndTime, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.id],
        function (err, result) {
            if (err) {
                console.log(err)
                return res.status(400).send({ message: "Failed to create" });
            }
            else {
                pool.query("DELETE FROM participant WHERE event_id = ($1) ",
                    [req.body.id],
                    function (err, result) {
                        if (err) {
                            console.log(err)
                            return res.status(400).send({ message: "Deleted participant" });
                        }
                    });

                for (var i = 0; i < req.body.participants.length; i++) {
                    console.log(req.body.participants[i].participantId)
                    pool.query("INSERT INTO participant(event_id, firstName, lastName, phone, email) VALUES ($1, $2, $3, $4, $5)",
                        [req.body.id, req.body.participants[i].participantFirstName, req.body.participants[i].participantLastName, req.body.participants[i].participantPhone, req.body.participants[i].participantEmail],
                        function (err, result) {
                            if (err) {
                                console.log(err)
                                return res.status(400).send({ message: "Failed to create a participant" });
                            }
                        });
                }
                return res.status(200).send({ message: "Updated event and participants" });
            }
        }
    );
}

module.exports = { update: update }