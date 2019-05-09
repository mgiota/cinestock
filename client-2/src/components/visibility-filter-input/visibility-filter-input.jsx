import React from "react";
//import PropTypes from "prop-types";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";

import { setFilter, setSortColumn } from "../../actions/actions";

function VisibilityFilterInput(props) {
  return (
    <Form.Group className="filter-group">
      <Form.Control
        className="filter"
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="Filter movies by ..."
      />
      <Form.Control
        className="filter"
        as="select"
        onChange={e => props.setSortColumn(e.target.value)}
        value={props.sortColumn}
      >
        <option>Title</option>
        <option>Director</option>
        <option>Genre</option>
      </Form.Control>
    </Form.Group>
  );
}

export default connect(
  (({ visibilityFilter }) => ({ visibilityFilter }),
  ({ sortColumn }) => ({ sortColumn })),
  { setFilter, setSortColumn }
)(VisibilityFilterInput);
