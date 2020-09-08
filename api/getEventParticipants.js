const { pool } = require('../config')
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//Post Request to Login
function getParticipants(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    else {
        pool.query("SELECT * FROM participant WHERE event_id = ($1)",
            [req.body.id],
            function (err, result) {
                if (err) {
                    return res.status(400).send({ message: "Cannot find participants" });

                }
                else {
                    return res.status(200).send({ message: result.rows });
                }
            });
    }
}

module.exports = { getParticipants: getParticipants }