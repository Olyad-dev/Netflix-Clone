import React, { useEffect, useState } from "react";
import "./row.css";
import axios from "../../../Utils/Axios";
import movieTrailer from "movie-trailer";
import Youtube from "react-youtube";

function Row({ title, fetchURL, rowID, isLargeSize }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const base_Url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(fetchURL);
        setMovies(request?.data.results);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [fetchURL]);

  const handleclick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name).then(
        (url) => {
          // console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          // console.log(urlParams);
          // console.log(urlParams.get("v"));
          setTrailerUrl(urlParams.get("v"));
        }
      );
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies?.map((movie, i) => (
          <img
            onClick={() => handleclick(movie)}
            key={i}
            src={`${base_Url}${
              isLargeSize ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row_poster ${isLargeSize && "row_posterLarge"}`}
          />
        ))}
      </div>
      {trailerUrl && (
        <div className="trailer-container">
          <button className="close-btn" onClick={() => setTrailerUrl("")}>
            X
          </button>
          <Youtube videoId={trailerUrl} opts={opts} />
        </div>)}
    </div>
  );
}

export default Row;