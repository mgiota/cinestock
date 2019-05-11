import { combineReducers } from "redux";

import {
  SET_FILTER,
  SET_SORT_COLUMN,
  SET_MOVIES,
  SET_USER,
  SET_MODAL
} from "../actions/actions";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function sortColumn(state = "Title", action) {
  switch (action.type) {
    case SET_SORT_COLUMN:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function userInfo(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function showModal(state = false, action) {
  switch (action.type) {
    case SET_MODAL:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  sortColumn,
  movies,
  userInfo,
  showModal
});

export default moviesApp;
