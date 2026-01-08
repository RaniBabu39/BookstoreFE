import { faLocationPin, faMailBulk, faPhone, faSeedling } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Header from '../components/Header'

const Contact = () => {
  return (
    <div>
<Header/>

      <div className=' w-full  mb-10 me-40'>

        <h1 className='text-2xl mt-4 text-center'>Contacts</h1>
        <p className='text-center mt-15'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat voluptates fugit nobis. Vero eveniet temporibus ullam. Deleniti unde nemo repellendus rem asperiores expedita molestias autem, alias temporibus est laborum ipsa.
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem perferendis vero ut reiciendis veniam suscipit quis est reprehenderit voluptates, aliquam, minus nam adipisci id dicta neque rem amet omnis! Sit?


        </p>

<div className='flex justify-center items-center ms-20 me-20 mt-20'>

  <div className='w-1/3 items-center'>
  <h1>  <FontAwesomeIcon icon={faLocationPin}/> fa 123 Main Street, Apt 4B,</h1>
  <h1>Anytown, CA 91234</h1>


  </div>

  <div className='w-1/3'>
  <h1> <FontAwesomeIcon icon={faPhone}/>+91 9874561230</h1>
  <h1></h1>


  </div>
  <div className='w-1/3'>
  <h1> <FontAwesomeIcon icon={faMailBulk} /> Bookstore@gmail.com</h1>
  


  </div>


</div>

<div className='flex justify-between items-center me-50 ms-50'>

  <div className='w-1/2'>

  <div className='bg-blue-200 w-85 h-120  '>
    <h1 className='text-center'>Send me message</h1>

    <div className='flex flex-col justify-center items-center gap-8 mt-18'>
      <input className='text-center w-75 bg-white' placeholder='Name' type="text" />
        <input  className='text-center w-75 h-10 bg-white' placeholder='Email' type="text" />
        <textarea className='text-center h-35 w-75 bg-white' placeholder='Leave a message' name="" id=""></textarea>

<button className='bg-black border rounded p-2 w-75 text-white' > <FontAwesomeIcon icon={faSeedling} />Send</button>



    </div>

  </div>

  </div>

  <div className="h-1/2 mt-15">
  <iframe className='w-85 h-100'
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7891.564988454776!2d76.93714474267449!3d8.520486626542116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbddff1c089f%3A0x48e83c427354f836!2sPattom%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1764301741159!5m2!1sen!2sin"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    title="map"
  ></iframe>
</div>

  

</div>

      </div>



    </div>
  )
}

export default Contact