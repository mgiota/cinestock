import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Axios is a package to send client requests; it hooks frontend code up with API
import axios from "axios";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    axios
      .post("https://cinestock.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
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
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Form.Text className="text-muted">
        We will never share your personal information with anyone else.
      </Form.Text>
    </Form>
  );
}

RegistrationView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
