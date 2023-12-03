import { useEffect, useState } from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests'
import axios from 'axios'
import Preview from '../components/Preview'

const Home = ({}) => {
  // const [movies, setMovies] = useState([])
  const [movies, setMovies] = useState([])
  const [movie, setMovie] = useState();
  const [mainMovie, setMainMovie] = useState();
  const [openPlayer, setOpenPlayer] = useState(false);
  const [item, setItem] = useState("");

//filter selecting "Trailers"
function isOfficial(result) {
  return result.type === 'Trailer';
}
  useEffect(() => {
      axios.get(requests.requestPopular).then((response) => {
          const fetchedMovies = response.data.results;
          setMovies(fetchedMovies);
          const randomMovie = fetchedMovies[Math.floor(Math.random() * fetchedMovies.length)];
          setMainMovie(randomMovie);
      })
  }, [])

// Apply the filter function on the results array
const [trailerKey, setTrailerKey] = useState(null);
const [mainTrailerKey, setMainTrailerKey] = useState(null);
var trailerTitle;
useEffect(() => {
  if(movie !== undefined){
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movie?.id}/videos`,
        params: {language: 'en-US'},
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_MOVIES_KEY}`,
        }
      };
      
    axios
      .request(options)
      .then(function (response) {
          const filteredResults = response.data.results.filter(isOfficial);
          setTrailerKey(filteredResults[0].key);
          trailerTitle = filteredResults[0].name;
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}, [movie]);

useEffect(() => {
  if(mainMovie !== undefined){
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${mainMovie?.id}/videos`,
        params: {language: 'en-US'},
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_MOVIES_KEY}`,
        }
      };

    axios
      .request(options)
      .then(function (response) {
          const filteredResults = response.data.results.filter(isOfficial);
          setMainTrailerKey(filteredResults[0].key);
          trailerTitle = filteredResults[0].name;
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}, [mainMovie]);
  const onPlay = () => {
    setOpenPlayer(true)
    document.querySelector('#trailer').contentWindow.postMessage('{"event":"command","func":"' + "playVideo" + '","args":""}',
        "*"
      );
    document.body.style = "overflow:hidden;";
  }
  
  return (
    <>
        <Preview movie={movie} open={openPlayer} setOpenPlayer={setOpenPlayer} trailorKey={trailerKey}/>
        <Main open={openPlayer} setOpenPlayer={setOpenPlayer} movie={mainMovie} setMovie={setMovie}/>
        <Row rowID='1' title='Upcoming' onPlay={onPlay} setMovie={setMovie} fetchURL={requests.requestUpcoming}/>
        <Row rowID='2' title='Popular' onPlay={onPlay} setMovie={setMovie} fetchURL={requests.requestPopular}/>
        <Row rowID='3' title='Top Rated' onPlay={onPlay} setMovie={setMovie} fetchURL={requests.requestTopRated}/>
        <Row rowID='4' title='Trending' onPlay={onPlay} setMovie={setMovie} fetchURL={requests.requestTrending}/>
        <Row rowID='5' title='Horror' onPlay={onPlay} setMovie={setMovie} fetchURL={requests.requestHorror}/>
    </>
  )
}

export default Home