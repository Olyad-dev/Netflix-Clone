import React, { useEffect, useState } from 'react'
import './banner.css'
import axios from '../../Utils/Axios'
import Request from '../../Utils/Request';

const base_Url = 'https://image.tmdb.org/t/p/original/';

const Banner = () => {
  const [movie, setMovie] = useState({});
  useEffect(()=>{
(async ()=>{
    try {
      const request = await axios.get(Request.fetchComedyMovies);
      console.log(request)
      setMovie(
        request?.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]);
    } catch (error) {
      console.log("Error: ", error)}
      })()
  }, []);

function truncate(str, n){
  return str?.length > n ? str.substr(0, n-1) + '...' : str;
}

  return (
    <div>
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
              // onClick={() => handleclick(movie)}
            >
              Play
            </button>
            <button className="banner_btn fw-bold">My List</button>
          </div>
          <h1 className="banner_Descriptions">{truncate(movie?.overview, 150)}</h1>
        </div>
        <div className="banner_faded" />
      </header>
      <div className="youtube_trailer" style={{ padding: "40px" }}>
        {/* {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />} */}
      </div>
    </div>
  );
};

export default Banner
