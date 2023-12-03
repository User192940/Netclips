import axios from 'axios';
import React, { useEffect, useState } from 'react'
import requests from '../Requests';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import {db} from '../firebase'
import {arrayUnion, doc, updateDoc} from 'firebase/firestore'


const Preview = ({ movie, trailorKey, setOpenPlayer, open}) => {
  const [trailerLink, setTrailerLink] = useState('');
  const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const {user} = UserAuth();
    const movieID = doc(db, 'users', `${user?.email}`)
    let item = movie;
    const saveShow = async () => {
      if(user?.email){
        setLike(!like)
        setSaved(true)
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
            overview: item.overview,
            release_date: item.release_date
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
    useEffect(() => {
      if(movie !== undefined && trailorKey !== undefined){
        setTrailerLink(`https://www.youtube.com/embed/${trailorKey}?disablekb=1&rel=0&enablejsapi=1&autoplay=1`);
      }
    }, [trailorKey]);

    useEffect(() => {
      setTrailerLink("");
    }, [movie])
      const onClose = () => {
        setOpenPlayer(false);
        document.querySelector('#trailer').contentWindow.postMessage('{"event":"command","func":"' + "pauseVideo" + '","args":""}',
        "*"
      );
      document.body.style = "overflow:revert;";
      }
  return (
    <div className={`${(open) ? "bg-black/70 fixed top-0 left-0 z-[101] scroll overflow-hidden" : ""} w-full h-full flex flex-col justify-center items-center`}>
        <div className={`${(open) ? "flex flex-col w-full h-full fixed top-0 z-10 lg:w-[900px] bg-[#181818]" : "hidden"}`}>
        <div className='w-full h-8 absolute top-0 flex justify-end'>
              <button onClick={onClose} className='w-8 h-8'>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 5L19 19M5 19L19 5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>                
              </button>
            </div>
          <div className='flex flex-col w-full h-full md:p-8'>
          
            <div id='movie-container' className='w-full aspect-video'>
            <iframe id="trailer" className='aspect-video' src={trailerLink} frameBorder="0" allow="autoplay" allowFullScreen></iframe>
            </div>
            <div className='flex justify-between'>
              <h1 className='text-white text-3xl md:text-5xl px-2'>{movie?.title}</h1>
              <p className='flex items-center p-2' onClick={(e) => e.stopPropagation()}>{like ? (<FaHeart onClick={saveShow} className='text-gray-300 w-8 h-8'/>) : (<FaRegHeart onClick={saveShow} className='text-gray-300 w-8 h-8'/>)}</p>
            </div>
            <p className='text-gray-400 text-sm px-2'>Released: {movie?.release_date}</p>
            <p className='w-full px-2 md:max-w-[70%] lg:max-w-[70%] xl:max-w-[70%] text-gray-200'>
                {movie?.overview}
                </p>
          </div>
        </div>
    </div>
  )
}

export default Preview