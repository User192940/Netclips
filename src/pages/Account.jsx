import React, { useEffect, useState } from 'react'
import SavedShows from '../components/SavedShows'
import axios from 'axios';
import Preview from '../components/Preview';

const Account = () => {
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
          Authorization: `Bearer ${process.env.REACT_APP_MOVIES_KEY}`
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
        <div className='w-full text-white'>
            <img className="w-full h-[400px] object-cover" src='https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/a6fda18c-4665-445a-9988-12e2871a59ee/US-en-20230911-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt="" />
            <div className='bg-blac/60 fixed top-0 left-0 w-full h-[550px]'>
                <div className='absolute top-[20%] p-4 md:p-8'>
                    <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
                </div>
            </div>
            <SavedShows onPlay={onPlay} setMovie={setMovie}/>
        </div>    
    </>
  )
}

export default Account