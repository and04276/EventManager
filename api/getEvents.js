const { pool } = require('../config')
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//Post Request to Login
function getEvents(req, res) {
    pool.query("SELECT * FROM event",
        function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send({ message: "Cannot get events" });
            } else {
                res.send({ success: 200, message: result.rows, });
            }
        }
    );
}

module.exports = { getEvents: getEvents }