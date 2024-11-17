import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 4; 

  useEffect(() => {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div className="movie-list">
        {currentMovies.map((movie) => (
          <div className="card" key={movie.id}>
            <h2>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </h2>
            <p>{movie.description}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Year:</strong> {movie.release_date}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
