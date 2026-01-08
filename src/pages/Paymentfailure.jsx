import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

const Paymentfailure = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <Header />
      <div className='flex-grow flex items-center justify-center p-4'>
        <div className='bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-red-100'>
          <div className='mb-6 flex justify-center'>
            <div className='w-24 h-24 bg-red-100 rounded-full flex items-center justify-center'>
              <svg 
                className='w-12 h-12 text-red-600' 
                fill='none' 
                stroke='currentColor' 
                viewBox='0 0 24 24'
              >
                <path 
                  strokeLinecap='round' 
                  strokeLinejoin='round' 
                  strokeWidth='2' 
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </div>
          </div>
          <h1 className='text-3xl font-extrabold text-gray-900 mb-2'>Payment Failed</h1>
          <p className='text-gray-600 mb-8'>
            We couldn't process your payment. Please check your card details and try again or contact your bank.
          </p>
          <div className='flex flex-col gap-3'>
            <button 
              onClick={() => window.history.back()}
              className='bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg active:scale-95'
            >
              Try Again
            </button>
            <Link 
              to='/' 
              className='text-gray-600 hover:text-gray-700 font-semibold py-2 transition-all'
            >
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Paymentfailure
