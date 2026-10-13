// TMDB list endpoints for the home page rows.
// Auth is the TMDB read access token (REACT_APP_MOVIES_KEY), sent as a Bearer header.
const base = 'https://api.themoviedb.org/3'

export const tmdbHeaders = {
  accept: 'application/json',
  Authorization: `Bearer ${process.env.REACT_APP_MOVIES_KEY}`,
}

const requests = {
  requestPopular: `${base}/movie/popular?language=en-US&page=1`,
  requestTopRated: `${base}/movie/top_rated?language=en-US&page=1`,
  requestTrending: `${base}/trending/movie/week?language=en-US`,
  requestHorror: `${base}/discover/movie?with_genres=27&language=en-US&page=1`,
  requestUpcoming: `${base}/movie/upcoming?language=en-US&page=1`,
}

export default requests
