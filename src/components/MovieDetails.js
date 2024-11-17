import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://ghibliapi.herokuapp.com/films/${id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Producer:</strong> {movie.producer}</p>
      <p><strong>Release Year:</strong> {movie.release_date}</p>
      <p><strong>Running Time:</strong> {movie.running_time} minutes</p>

      <Link to="/">Back to Movies</Link>
    </div>
  );
};

export default MovieDetails;
