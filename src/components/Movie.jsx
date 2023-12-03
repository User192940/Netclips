import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {UserAuth} from '../context/AuthContext'
import {db} from '../firebase'
import {arrayUnion, doc, updateDoc} from 'firebase/firestore'

const Movie = ({setMovie, onPlay, item}) => {
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
    function playPreview(){
      onPlay();
      try{
        setMovie(item)
      } catch(err){
        console.log(err);
      }
    }
  return (
    <>
        <div onClick={playPreview} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-[.15rem]'>
                    <img src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} className='w-full h-auto block'/>
                    <div className='absolute break-words top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white' style={{ textWrap :"wrap", }}>
                        <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
                        <p onClick={(e) => e.stopPropagation()}>{like ? (<FaHeart onClick={saveShow} className='absolute top-4 left-4 text-gray-300'/>) : (<FaRegHeart onClick={saveShow} className='absolute top-4 left-4 text-gray-300'/>)}</p>
                    </div>
                </div>
    </>
  )
}

export default Movie