import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Axios is a package to send client requests; it hooks frontend code up with API
import axios from "axios";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleRegister = e => {
    e.preventDefault();
    axios
      .post("https://cinestock.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(() => {
        axios
          .post("https://cinestock.herokuapp.com/login", {
            Username: username,
            Password: password
          })
          .then(response => {
            console.log(response);
            const data = response.data;
            props.onLoggedIn(data);
            window.open("/movies", "_self");
          });
      })
      .catch(e => {
        console.log("Error registering the user.");
      });
  };

  return (
    <Form>
      <p>Asterisk (*) marks required fields.</p>
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
          placeholder="Pick a password"
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
      <Button variant="primary" type="submit" onClick={handleRegister}>
        Register
      </Button>
      <Form.Text className="text-muted">
        We will never share your personal information with anyone.
      </Form.Text>
    </Form>
  );
}
