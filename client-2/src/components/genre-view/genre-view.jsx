import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import "./genre-view.scss";

import { Link } from "react-router-dom";

export function GenreView(props) {
  return (
    <div className="genre">
      <div className="container">
        <div className="label h5">{props.genre.Name}</div>
        <div className="value">{props.genre.Description}</div>
        <Link to={`/movies`}>
          <Button className="back-button" variant="primary">
            Back to movie list
          </Button>
        </Link>
      </div>
    </div>
  );
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};
