import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";
import Button from "react-bootstrap/Button";
import Figure from "react-bootstrap/Figure";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className="container">
        <Figure>
          <Figure.Image
            width={300}
            height={180}
            alt="300x180"
            src={movie.ImagePath}
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
                <div className="value">{movie.Genre.Name}</div>
              </div>
              <div className="movie-director">
                <div className="label h5">Director</div>
                <div className="value">{movie.Director.Name}</div>
              </div>
            </div>
          </Figure.Caption>
        </Figure>
        <Button
          onClick={() => onClick()}
          className="back-button"
          variant="primary"
        >
          Go back
        </Button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
