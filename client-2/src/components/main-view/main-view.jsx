import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import { setMovies } from "../../actions/actions";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import MoviesList from "../movies-list/movies-list";
import MovieView from "../movie-view/movie-view";
import DirectorView from "../director-view/director-view";
//import { GenreView } from "../genre-view/genre-view";
import ProfileView from "../profile-view/profile-view";
import { ProfileUpdate } from "../profile-view/profile-view";
import { ProfileDelete } from "../profile-view/profile-view";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Collapse from "react-bootstrap/Collapse";
import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      user: null,
      email: null,
      birthday: null,
      favoriteMovies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      let user = localStorage.getItem("user");
      this.setState({
        user: user
      });
      this.getMovies(accessToken);
      this.getUser(user, accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://cinestock.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setMovies(response.data);
        // this.setState({
        //   movies: response.data
        // });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getUser(user, token) {
    axios
      .get("https://cinestock.herokuapp.com/users/" + user, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies,
          token: token
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onUpdate(user) {
    localStorage.setItem("user", user);
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

    this.setState({
      user: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
      token: null
    });
  }

  onDelete() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    this.setState({
      user: null,
      email: null,
      favoriteMovies: [],
      token: null
    });
  }

  render() {
    const { user, open, email, birthday, token, favoriteMovies } = this.state;

    if (!user)
      return (
        <div className="login-page">
          <div className="container">
            <div className="label h5">
              <br />
              Welcome to CineStock!
            </div>
            <div className="value">
              <p> Please log into your account:</p>
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

    if (user && !token)
      return (
        <Router>
          <Route
            exact
            path="/userprofile/delete"
            render={() => (
              <ProfileDelete
                user={user}
                onDelete={user => this.onDelete(user)}
              />
            )}
          />
        </Router>
      );

    return (
      <Router>
        <div className="main-view">
          <Navbar sticky="top" variant="dark">
            <Link to={`/`}>
              <Button
                onClick={() => this.onLogout()}
                className="logout-btn"
                variant="primary"
              >
                Log out
              </Button>
            </Link>
            <Nav justify variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                  Hello, {user}!
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/userprofile">Your account</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/movies">Movies</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar>
          <Route
            exact
            path="/"
            render={() => (
              <MoviesList
                user={user}
                token={token}
                favoriteMovies={favoriteMovies}
              />
            )}
          />
          <Route
            exact
            path="/movies"
            render={() => (
              <MoviesList
                user={user}
                token={token}
                favoriteMovies={favoriteMovies}
              />
            )}
          />
          <Route
            exact
            path="/movies/:movieId"
            render={({ match }) => <MovieView movieId={match.params.movieId} />}
          />
          <Route
            exact
            path="/userprofile"
            render={() => (
              <ProfileView
                user={user}
                email={email}
                birthday={birthday}
                favoriteMovies={favoriteMovies}
                token={token}
              />
            )}
          />
          <Route
            exact
            path="/userprofile/update"
            render={() => (
              <ProfileUpdate
                user={user}
                token={token}
                email={email}
                birthday={birthday}
                onUpdate={user => this.onUpdate(user)}
              />
            )}
          />
          <Route
            path="/directors/:name"
            render={({ match }) => (
              <DirectorView directorName={match.params.name} />
            )}
          />
          {/* <Route
            path="/genres/:name"
            render={({ match }) => {
              if (!movies || !movies.length)
                return <div className="main-view" />;
              return (
                <GenreView
                  genre={
                    movies.find(m => m.Genre.Name === match.params.name).Genre
                  }
                />
              );
            }}
          /> */}
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  { setMovies }
)(MainView);
