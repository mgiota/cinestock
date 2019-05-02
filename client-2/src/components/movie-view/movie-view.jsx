import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";
import Button from "react-bootstrap/Button";
import Figure from "react-bootstrap/Figure";

import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie">
        <Figure>
          <Figure.Image
            src={process.env.PUBLIC_URL + "/images/" + movie.ImagePath}
          />
          <Figure.Caption>
            <div className="movie-view">
              <div className="movie-title">
                <div className="label h5">Title</div>
                <div className="value">{movie.Title} </div>
              </div>
              <div className="movie-description">
                <div className="label h5">Description</div>
                <div className="value">{movie.Description} </div>
              </div>
              <div className="movie-genre">
                <div className="label h5">Genre</div>
                <div className="value">{movie.Genre.Name} *</div>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link" className="details">
                    * What is {movie.Genre.Name}?
                  </Button>
                </Link>
              </div>
              <div className="movie-director">
                <div className="label h5">Director</div>
                <div className="value">{movie.Director.Name} **</div>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link" className="details">
                    ** Click for {movie.Director.Name}'s brief biography
                  </Button>
                </Link>
              </div>
            </div>
          </Figure.Caption>
        </Figure>
        <Link to={`/`}>
          <Button className="back-button" variant="primary">
            Go back
          </Button>
        </Link>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
};
