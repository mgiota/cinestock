const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');
//const uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

// Logs every request info to terminal
app.use(morgan('common'));

let movies = [{
        title: 'One Flew Over the Cuckoo\'s Nest',
        description: 'One Flew Over the Cuckoo\'s Nest is a 1975 American comedy-drama film',
        genre: 'Comedy-drama',
        director: 'Miloš Forman',
        imageURL: '#'
    },
    {
        title: 'The Silence of the Lambs',
        description: 'The Silence of the Lambs is a 1991 American psychological horror-thriller film',
        genre: 'Drama/Mystery',
        director: 'Jonathan Demme',
        imageURL: '#'
    },
    {
        title: 'Pulp Fiction',
        description: 'Pulp Fiction is a 1994 American crime film',
        genre: 'Drama/Crime',
        director: 'Quentin Tarantino',
        imageURL: '#'
    },
    {
        title: 'Fight Club',
        description: 'Fight Club is a 1999 film based on the 1996 novel by Chuck Palahniuk.',
        genre: 'Drama/Action ‧',
        director: 'David Fincher',
        imageURL: '#'
    },
    {
        title: 'It\'s a Wonderful Life',
        description: 'It\'s a Wonderful Life is a 1946 American Christmas fantasy drama film ',
        genre: 'Drama/Fantasy',
        director: 'Frank Capra',
        imageURL: '#'
    }
];

let users = [{
        username: 'MikeStar',
        email: 'mike@mail.com',
        password: '123movie',
        dateOfBirth: '01/01/1970',
        favorites: []
    },
    {
        username: 'LinaStar',
        email: 'lina@mail.com',
        password: '123movie',
        dateOfBirth: '03/05/1987',
        favorites: []
    }
];

//Returns a JSON object containing data about all movies
app.get('/movies', function (req, res) {
    res.json(movies);
});

// Returns data about a single movie by title 
app.get('/movies/:title', function (req, res) {
    res.json(movies.find(function (movie) {
        return movie.title.toLowerCase() === req.params.title.toLowerCase()
    }));
});

// Returns data about a genre by title
app.get('/movies/:title/genre', function (req, res) {
    let movie = movies.find((movie) => {
        return movie.title.toLowerCase() === req.params.title.toLowerCase();
    });

    if (movie) {
        res.status(201).send('The genre of ' + movie.title + ' is ' + movie.genre);
    } else {
        res.status(404).send('Movie with the title ' + req.params.title + ' was not found.');
    }
});

//Returns data about a director (bio, birth year, death year) by name
app.get('/directors/:name', function (req, res) {
    res.send('The director\'s bio, birth year, death year returned.');
});

//Allows new users to register
app.post('/users', function (req, res) {
    let newUser = req.body;

    if (!newUser.username) {
        const message = 'Username needed to register.';
        res.status(400).send(message);
    } else {
        users.push(newUser);
        res.status(201).send(newUser);
    }
});

//list of all users for test needs
app.get('/users', function (req, res) {
    res.json(users);
});

//Allows to update user info
app.put('/users/:username/:password', function (req, res) {
    res.send('Your username/password successfully updated.');
});
app.put('/users/:username/:email/:dateofbirth', function (req, res) {
    res.send('Your data successfully updated.');
});

//Allows users to add a movie to their list of favorites
app.post('/users/:username/:favorites', function (req, res) {
    let newFavorite = req.body;

    if (!newFavorite.title) {
        const message = "Missing movie title";
        res.status(400).send(message);
    } else {
        let user = users.find(function (user) {
            return user.username === req.params.username
        });
        user.favorites.push(newFavorite);
        res.status(201).send(user.favorites);
    }
});

//Allows users to remove a movie from their list of favorites
app.delete('/users/:username/:favorites', function (req, res) {
    res.send('One favorite movie deleted');
});

//Allows existing users to deregister
app.delete('/users/:username', function (req, res) {
    let user = users.find(function (user) {
        return user.username.toLowerCase() === req.params.username.toLowerCase()
    });

    if (user) {
        let newUsers = users.filter(function (obj) {
            return obj.username.toLowerCase() !== req.params.username.toLowerCase()
        });
        users = newUsers;
        res.status(201).send(req.params.username + ' user profile has been deleted.')
    } else {
        res.status(404).send('Profile with username ' + req.params.username + ' was not found.');
    }
});

// default response when request hits the root folder
app.get('/', function (req, res) {
    res.send('Welcome to the world of CineStock!');
});

//access requested file from "public" folder
app.use(express.static('public'));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Oops! Something went wrong... please retry!');
});

app.listen(8080);