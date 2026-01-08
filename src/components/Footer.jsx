import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className='bg-[#0a1a2f] w-full h-70 mt-20 flex justify-between items-center me-20'>

        <div className='ms-5 w-1/3 align-center'>
          <h1 className='text-white text-center'>ABOUT US</h1>
          <p className='mt-12 text-white text-center'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia enim eius fugit velit 
            quisquam nisi aliquid laudantium ea molestiae neque!
          </p>
        </div>

        <div className='ms-5 w-1/3 align-center'>
          <h1 className='text-white text-center'>NEWSLETTER</h1>
          <p className='mt-12 text-white text-center'>Stay updated with our latest trends</p>
          <div className='flex justify-center gap-1 items-center'>
            <input className='mt-5 text-center text-black bg-white border rounded p-2' placeholder='Email id' type="text" />
            <h1 className='text-white text-2xl'>
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </h1>
          </div>
        </div>

        <div className='ms-5 w-1/3 align-center'>
          <h1 className='text-white text-center'>FOLLOW US</h1>
          <p className='text-center text-white mt-12'>Let us be social</p>

          <ul className='flex justify-center items-center mt-10 gap-4'>
            <li className='text-white text-2xl'>
              <FontAwesomeIcon icon={faInstagram} />
            </li>

            <li className='text-white text-2xl'>
              <FontAwesomeIcon icon={faFacebook} />
            </li>

            <li className='text-white text-2xl'>
              <FontAwesomeIcon icon={faWhatsapp} />
            </li>
          </ul>

        </div>

      </div>

      <div className='w-full h-10 bg-black flex justify-center'>
        <h1 className='text-white text-l'>
          Copyright © 2025 All rights reserved | This website is made with 🤍 by Nithin Manoj
        </h1>
      </div>

    </div>
  )
}

export default Footer