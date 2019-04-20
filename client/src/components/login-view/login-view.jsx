import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login-view.scss";

// Axios is a package to send client requests; it hooks frontend code up with API
import axios from "axios";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password);
    axios
      .post("https://cinestock.herokuapp.com/login", {
        Username: username,
        Password: password
      })
      .then(() => {
        props.onLoggedIn(username);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <Form>
      <Form.Group controlId="loginUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </Form.Group>
      <Form.Group controlId="loginPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

LoginView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
