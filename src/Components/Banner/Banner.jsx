import React, { useEffect, useState } from "react";
import "./banner.css";
import axios from "../../Utils/Axios";
import Request from "../../Utils/Request";
import movieTrailer from "movie-trailer";
import Youtube from "react-youtube";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const base_Url = "https://image.tmdb.org/t/p/original/";

const Banner = () => {
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem("myList");
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(Request.fetchComedyMovies);
        setMovie(
          request?.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  const handleclick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlparams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlparams.get("v"));
        })
        .catch((err) => {
          if (err) throw err;
        });
    }
  };

  const handleAddToList = (movie) => {
    setMyList((prevList) => {
      if (!prevList.some((m) => m.id === movie.id)) {
        toast.success(
          `${movie.title || movie.name || movie.original_name} added to My List`
        );
        return [...prevList, movie];
      }
      return prevList;
    });
  };

  const handleRemoveFromList = (movie) => {
    setMyList((prevList) => {
      toast.error(
        `${
          movie.title || movie.name || movie.original_name
        } removed from My List`
      );
      return prevList.filter((m) => m.id !== movie.id);
    });
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div>
      <ToastContainer />
      <header
        className="banner text-white"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${base_Url}${movie?.backdrop_path})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="banner_contains ms-5">
          <h1 className="banner_tittle py-3 fw-bolder">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_Buttons">
            <button
              className="banner_btn fw-bold"
              onClick={() => handleclick(movie)}
            >
              Play
            </button>
            <button
              className="banner_btn fw-bold"
              onClick={() => handleAddToList(movie)}
            >
              Add To My List
            </button>
          </div>
          <h1 className="banner_Descriptions">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>
        <div className="banner_faded" />
      </header>
      <div className="youtube_trailer" style={{ padding: "40px" }}>
        {trailerUrl && (
          <div>
            <button onClick={() => setTrailerUrl("")}>
              X
            </button>
            <Youtube videoId={trailerUrl} opts={opts} />
          </div>
        )}
      </div>
      <div>
        <h2 style={{ color: "#E6020C" }}> My List</h2>
        <ul className="my-list">
          {myList.map((movie, i) => (
            <li key={i} className="my-list-item">
              <div>
                <strong>
                  {movie.title || movie.name || movie.original_name}
                </strong>
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromList(movie)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Banner;
