import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Dropdown, DropdownItem } from "flowbite-react";
import { AuthContext } from '../context/AuthContext';



const Header = () => {

 
  const { token, removeToken } = useContext(AuthContext)
  const navigate = useNavigate()


  return (
    <div>

      {/* TOP HEADER */}
      <div className='flex justify-between items-center'> 
        <img 
          className='w-25' 
          src="https://img.freepik.com/premium-vector/cute-book-herbarium-journal-literature-world-book-day-vector-illustration-flat-style_254685-2882.jpg?semt=ais_hybrid&w=740&q=80" 
          alt="" 
        />

        <h1 className='text-4xl font-bold'>BOOK STORE</h1>

        <div className='me-4 flex gap-2 items-center'>
          <FontAwesomeIcon icon={faInstagram}/>
          <FontAwesomeIcon icon={faFacebook}/>
          <FontAwesomeIcon icon={faTwitter}/>

          
            {token ? (
              <Dropdown
                dismissOnClick={false}
                label={
                  <img 
                    className='w-10 h-10 rounded-full border border-gray-200'
                    src="https://i.pinimg.com/736x/b1/88/c6/b188c6801ad1d71d3c962c6e4aa2d0cf.jpg" 
                    alt="profile"
                  />
                }
              >
                <div className='bg-white'>
                  <DropdownItem className='text-black'>
                    <Link to="/Profile">
                      Profile &nbsp;
                      <FontAwesomeIcon icon={faUser}/>
                    </Link>
                  </DropdownItem>

                  <DropdownItem className='text-black'
                    onClick={() => {
                      removeToken()
                      navigate('/')
                    }}
                  >
                    Log out &nbsp;
                    <FontAwesomeIcon icon={faSignOut}/>
                  </DropdownItem>
                </div>
              </Dropdown>
            ) : (
              <Link to="/login">
                <button className='border-2 p-2 rounded-xl me-2 hover:bg-red-300 hover:text-amber-200'>
                  <FontAwesomeIcon icon={faUser}/> LOGIN
                </button>
              </Link>
            )}
        </div>
      </div>

      {/* NAVBAR */}
      <div className="flex justify-center gap-6 bg-[#0a1a2f] w-full h-[50px] items-center">
  <Link to={'/'}>          <h5 className='text-white'>HOME</h5> </Link>
<Link to={'/allbooks'}>          <h5 className='text-white'>All books</h5> </Link>
       <Link to={'/career'} ><h5 className='text-white'>Careers</h5></Link> 
         <Link to={'/contact'}> <h5 className='text-white'>Contacts</h5></Link>
      </div>

    </div>
  )
}

export default Header