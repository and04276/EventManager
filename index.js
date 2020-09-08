const express = require('express');
const path = require('path');

const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')
var cookieParser = require('cookie-parser')

const app = express();

const tokens = {}

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.set('tokens', tokens)


app.route('/api/create').post(require('./api/createEvent').createEvent);
app.route('/api/getEvents').get(require('./api/getEvents').getEvents);
app.route('/api/getParticipants').post(require('./api/getEventParticipants').getParticipants);
app.route('/api/update').put(require('./api/updateEvent').update)
app.route('/api/delete').post(require('./api/deleteEvent').deleteEvent)

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


const port = process.env.PROXY_PORT || 5000;

app.listen(port);

console.log(`App listening on ${port}`);

