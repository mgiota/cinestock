import React from "react";
import { connect } from "react-redux";

import { MovieCard } from "../movie-card/movie-card";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

import "./movies-list.scss";

const mapStateToProps = state => {
  const { movies, sortColumn, visibilityFilter } = state;

  let moviesToShow = movies.concat().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0;
  });

  if (visibilityFilter !== "" && sortColumn === "Title") {
    moviesToShow = moviesToShow.filter(m =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }
  if (visibilityFilter !== "" && sortColumn === "Director") {
    moviesToShow = moviesToShow.filter(m =>
      m.Director.Name.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }
  if (visibilityFilter !== "" && sortColumn === "Genre") {
    moviesToShow = moviesToShow.filter(m =>
      m.Genre.Name.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  return { movies: moviesToShow };
};

function MoviesList(props) {
  const { movies, user, token, favoriteMovies } = props;

  if (!movies) return <div className="main-view" />;

  return (
    <div>
      <VisibilityFilterInput />
      <div className="card-deck">
        {movies.map(m => (
          <MovieCard
            key={m.id}
            movie={m}
            user={user}
            token={token}
            favoriteMovies={favoriteMovies}
          />
        ))}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(MoviesList);
