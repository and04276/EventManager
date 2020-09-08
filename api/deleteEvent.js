const { pool } = require('../config')
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//Post Request to Login
function deleteEvent(req, res) {
    console.log(req.body)
    pool.query("DELETE FROM participant WHERE event_id = ($1)",
        [req.body.id],
        function (err, result) {
            if (err) {
                return res.status(400).send({ message: "Cannot find participants" });
            }
            else {
                pool.query("DELETE FROM event WHERE id = ($1)",
                    [req.body.id],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(400).send({ message: "Cannot get events" });
                        } else {
                            res.send({ success: 200, message: "Deleted" });
                        }
                    }
                );
            }
        });



}

module.exports = { deleteEvent: deleteEvent }