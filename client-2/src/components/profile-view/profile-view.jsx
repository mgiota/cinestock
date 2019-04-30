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
    birthday = props.birthday,
    favoriteMovies = props.favoriteMovies,
    token = props.token;

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
        <div className="value">{favoriteMovies}</div>
        <Link to={`/movies`}>
          <Button className="update-btn" variant="link">
            Add movies...
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function ProfileUpdate(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  var user = props.user,
    token = props.token;

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
        Please update your profile information.
        <Form.Group controlId="formUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Pick a username"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Pick a password"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email: </Form.Label>
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
          We will never share your personal information with anyone else.
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
