const express = require('express'),
    morgan = require('morgan'),
    app = express();

// log every request info to terminal
app.use(morgan('common'));

//returns a JSON object containing data about top 10 movies
app.get('/movies', function (req, res) {
    res.json(topMovies);
});

app.get('/', function (req, res) {
    res.send('Welcome to the world of CineStock!')
});

//access requested file from "public" folder
app.use(express.static('public'));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Oops! Something went wrong... please retry!')
});

app.listen(8080);