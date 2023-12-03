import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Movie from './Movie';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Row = ({title, fetchURL, rowID, onPlay, setMovie}) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results)
        })
    }, [fetchURL])

    const slideLeft = () => {
        var slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft - 500;
    }
    const slideRight = () => {
        var slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    }
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">
        {title}
        </h2>
      <div className="relative flex items-center group">
        <MdChevronLeft onClick={slideLeft} size={40} className='abolute bg-white left-0 rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block group-hover:absolute'/>
        <div id={'slider' + rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
            {movies.map((item, id) => (
                <Movie key={id} item={item} setMovie={setMovie} onPlay={onPlay}/>
            ))}
        </div>
        <MdChevronRight onClick={slideRight} size={40} className='absolute bg-white right-0 rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block group-hover:absolute'/>
      </div>
    </>
  );
}

export default Row