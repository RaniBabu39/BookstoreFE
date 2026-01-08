import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

const Paymentsucess = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <Header />
      <div className='flex-grow flex items-center justify-center p-4'>
        <div className='bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-green-100'>
          <div className='mb-6 flex justify-center'>
            <div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center'>
              <svg 
                className='w-12 h-12 text-green-600' 
                fill='none' 
                stroke='currentColor' 
                viewBox='0 0 24 24'
              >
                <path 
                  strokeLinecap='round' 
                  strokeLinejoin='round' 
                  strokeWidth='3' 
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
          </div>
          <h1 className='text-3xl font-extrabold text-gray-900 mb-2'>Payment Successful!</h1>
          <p className='text-gray-600 mb-8'>
            Thank you for your purchase. Your order has been processed successfully and added to your collection.
          </p>
          <div className='flex flex-col gap-3'>
            <Link 
              to='/profile' 
              className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg active:scale-95'
            >
              View My Books
            </Link>
            <Link 
              to='/allbooks' 
              className='text-blue-600 hover:text-blue-700 font-semibold py-2 transition-all'
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Paymentsucess
