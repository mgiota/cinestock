import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import "./director-view.scss";

import { Link } from "react-router-dom";

export function DirectorView(props) {
  const death = props.director.Death ? props.director.Death : "now";

  return (
    <div className="director">
      <div className="container">
        <div className="label h5">
          {props.director.Name} ({props.director.Birth} - {death})
        </div>
        <div className="value">{props.director.Bio}</div>
        <Link to={`/`}>
          <Button className="back-button" variant="primary">
            Back to movie list
          </Button>
        </Link>
      </div>
    </div>
  );
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};
