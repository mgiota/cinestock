import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./profile-view.scss";

// Axios is a package to send client requests; it hooks frontend code up with API
import axios from "axios";

import { Link } from "react-router-dom";

export function ProfileView(props) {
  const username = props.user,
    email = props.email,
    birthday = props.birthday.substr(0, 10),
    favoriteMovies = props.favoriteMovies,
    movies = props.movies,
    token = props.token;

  var movieTitle = [];
  for (var i = 0; i < favoriteMovies.length; i++) {
    var movie = movies.find(m => m._id === favoriteMovies[i]);
    movieTitle.push(
      <div className="value" id={movie._id}>
        {movie.Title}
      </div>
    );
  }

  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete("https://cinestock.herokuapp.com/users/" + username, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        console.log(token);
        window.open("/userprofile/delete", "_self");
      })
      .catch(e => {
        console.log("Error deleting the user profile.");
      });
  };

  return (
    <div className="user-profile">
      <Button
        className="deregister-btn"
        variant="primary"
        onClick={handleDelete}
      >
        Delete profile
      </Button>
      <div className="container">
        <div className="label h5">User Profile</div>
        <div className="value">Username: {username}</div>
        <div className="value">Password: ********</div>
        <div className="value">Email: {email}</div>
        <div className="value">Birthday: {birthday}</div>
        <Link to={`/userprofile/update`}>
          <Button className="update-btn" variant="link">
            Update user info...
          </Button>
        </Link>
      </div>
      <div className="container">
        <div className="label h5">Favorite movies</div>
        {movieTitle}
        <Link to={`/movies`}>
          <Button className="update-btn" variant="link">
            Add/remove movies...
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function ProfileUpdate(props) {
  var user = props.user,
    oldEmail = props.email,
    oldBirth = props.birthday,
    token = props.token;
  const [username, setUsername] = useState(user);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(oldEmail);
  const [birthday, setBirthday] = useState(oldBirth);

  const handleUpdate = e => {
    e.preventDefault();
    axios
      .put(
        "https://cinestock.herokuapp.com/users/" + user,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        if (response.statusText === "OK") {
          props.onUpdate(username);
          window.open("/userprofile", "_self");
        }
      })
      .catch(e => {
        console.log("Error updating the user info.", e);
      });
  };

  return (
    <div className="user-profile">
      <Form>
        <p>
          Please update your profile information.
          <br />
          Asterisk (*) marks required fields.
        </p>
        <Form.Group controlId="formUsername">
          <Form.Label>Username*: </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Pick a username"
          />
          <Form.Text className="text-muted">
            Username can only contain alphanumeric characters (A-Za-z, 0-9).
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password*: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Pick a new password or resubmit your old one"
          />
          <Form.Text className="text-muted">
            Password should be at least 8 characters long.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email*: </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Please provide your email"
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday: </Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
            placeholder="Please provide your birthday in format mm/dd/yyyy"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleUpdate}>
          Update
        </Button>
        <Form.Text className="text-muted">
          We will never share your personal information with anyone.
        </Form.Text>
      </Form>
    </div>
  );
}

export function ProfileDelete(props) {
  const user = props.user;

  return (
    <div className="user-profile">
      <div className="container">
        <div className="label h5">
          Your profile has been successfully deleted from CineStock.
        </div>
        <div className="value">
          We are sorry to see you go but if you change your mind, you are always
          welcome to create a new account.
        </div>
        <div className="value">Have a great day!</div>
        <Button
          variant="primary"
          className="ok-btn"
          onClick={e => window.open("/", "_self") && props.onDelete(user)}
        >
          Ok
        </Button>
      </div>
    </div>
  );
}
