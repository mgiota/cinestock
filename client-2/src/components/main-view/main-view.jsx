import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  getMovies(token) {
    axios
      .get("https://cinestock.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    window.addEventListener("hashchange", this.handleNewHash, false);

    this.handleNewHash();
  }

  handleNewHash = () => {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }

    const movieId = window.location.hash.replace(/^#\/?|\/$/g, "").split("/");

    this.setState({
      selectedMovieId: movieId[0]
    });
  };

  onMovieClick(movie) {
    window.location.hash = "#" + movie._id;
    this.setState({
      selectedMovieId: movie._id
    });
  }

  onLoggedIn = authData => {
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  };

  onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.hash = "login";

    this.setState({
      user: null
    });
  }

  handleBackBtnClick() {
    window.location.hash = "movies";
    this.setState({
      selectedMovieId: null
    });
  }

  render() {
    const { movies, selectedMovieId, user, open } = this.state;

    if (!user)
      return (
        <div className="login-page">
          <div className="container">
            <div className="label">
              Welcome back! Please log into your account:
            </div>
            <div className="value">
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </div>
          </div>
          <div className="container">
            <div className="label">
              New to Cinestock? Please
              <Button
                onClick={() => this.setState({ open: !open })}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                variant="link"
              >
                register
              </Button>
              to explore our world of cinema.
            </div>
            <Collapse in={this.state.open}>
              <div className="value">
                <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />
              </div>
            </Collapse>
          </div>
        </div>
      );

    // Before the movies have been loaded
    if (!movies || !movies.length) return <div className="main-view" />;
    const selectedMovie = selectedMovieId
      ? movies.find(m => m._id === selectedMovieId)
      : null;

    return (
      <div className="main-view">
        <Button
          onClick={() => this.onLogout()}
          className="logout-btn"
          variant="primary"
        >
          Log out
        </Button>
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onClick={() => this.handleBackBtnClick()}
          />
        ) : (
          movies.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={movie => this.onMovieClick(movie)}
            />
          ))
        )}
      </div>
    );
  }
}

MainView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
