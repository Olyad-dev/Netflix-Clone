const TheApiKey = import.meta.env.VITE_KEY;

const request = {
  fetchTrending: `/trending/all/week?api_key=${TheApiKey}&language=en-US`,
  fetchPopular: `/movie/popular?api_key=${TheApiKey}&language=en-US&page=1`,
  fetchNetflixOriginals: `/discover/tv?api_key=${TheApiKey}&with_networks=213`,
  fetchTopRatedMovies: `/movie/top_rated?api_key=${TheApiKey}&language=en-US&page=1`,
  fetchActionMovies: `/discover/movie?api_key=${TheApiKey}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${TheApiKey}&with_genres=35`,
  fetchHorror: `/search/movie?api_key=${TheApiKey}&language=en-US&query=horror&page=1&include_adult=false`,
  fetchRomanceMovies: `/discover/movie?api_key=${TheApiKey}&with_genres=10749`,
  fetchDocumantries: `/discover/movie?api_key=${TheApiKey}&with_genres=99`,
};


export default request;
