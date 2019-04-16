import React, { useState } from "react";
import PropTypes from "prop-types";

// Axios is a package to send client requests; it hooks frontend code up with API
import axios from "axios";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(username, password);
    axios
      .post("https://cinestock.herokuapp.com/login", {
        username: username,
        password: password
      })
      .then(response => {
        props.onLoggedIn(user);
      })
      .catch(function(error) {
        console.log(error);
      });
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(user) */
  };

  return (
    <form>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

LoginView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
