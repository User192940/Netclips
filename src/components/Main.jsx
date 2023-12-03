import React, { useEffect, useState } from 'react'
import requests from '../Requests'
import axios from 'axios'
import Preview from './Preview'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
const Main = ({open, movie, setOpenPlayer, setMovie}) => {
  const [mainTrailerLink, setMainTrailerLink] = useState('');
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const {user} = UserAuth();
  const movieID = doc(db, 'users', `${user?.email}`)

    const saveShow = async () => {
      if(user?.email){
        setLike(!like)
        setSaved(true)
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: movie.id,
            title: movie.title,
            img: movie.backdrop_path,
            overview: movie.overview,
            release_date: movie.release_date
          })
        })
      } else{
        alert('Please login to save a movie')
      }
    }
    const truncateStr = (str, num) => {
        if(str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        } 
    }

    const onPlay = () => {
      setOpenPlayer(true);
      setMovie(movie);
      document.querySelector('#trailer').contentWindow.postMessage('{"event":"command","func":"' + "playVideo" + '","args":""}',
        "*"
      );
      document.body.style = "overflow:hidden;";
    }
  return (
    <>
    <div className='w-full h-[550px] text-white'>
        <div className="w-full h-full" id='movie-container'>
            <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'>

            </div>
            <img className='w-full h-full object-cover' src={movie ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}` : ''} alt={movie?.title}/>
            <div className='absolute w-full top-[20%] p-4 md:p-8'>
                <h1 className='text-3xl md:text-5xl'>{movie?.title}</h1>
               <div className='my-4'>
                <button onClick={onPlay} className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>Play</button>
                <button onClick={saveShow} className='border text-white border-gray-300 py-2 px-5 ml-4'>Watch Later</button>
            </div> 
            <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
            <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
                {truncateStr(movie?.overview, 150)}
                </p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Main