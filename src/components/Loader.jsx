import React from 'react'
import loaderimage from '../assets/Gif/bookgif.gif'
import Header from './Header'

const Loader = () => {
  return (
    <div>
      <Header/>
        <div className='flex justify-content-center'>
        
        <img className='w-600' src={loaderimage} alt="" />
        </div>


    </div>
  )
}

export default Loader