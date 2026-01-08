import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { getSingleBook, buyBook } from '../services/AllApi'
import { toast } from 'react-toastify'
import { BaseUrl } from '../services/BaseUrl'
import {loadStripe} from '@stripe/stripe-js';


const ViewsingleBook = () => {

const onbuyClick = async () => {
    const token = localStorage.getItem('token')
    const stripe = await loadStripe('pk_test_51SmREEDfixKDv8fs6aq34WQNYBI58DZUxja7vjYGMGF7c1QSSLY1Mg5vXzo9ewaW0d4O9fVtvzQEjL8gOIedhMm300rxDcVUde')

    let header={
        Authorization: `Bearer ${token}`  
    }
    let reqBody={
        bookId: book._id,
        bookName: book.title,
        bookDesc: book.abstract,
        sellerMail: book.userMail,
        bookImage: book.imageUrl,
        bookPrice: book.price,
        bookDiscountPrice: book.discountPrice
    }
    let apires = await buyBook(reqBody, header)


    if(apires.status === 200){
        let session = apires.data.session
        // Redirect to Stripe Checkout
        window.location.href = session.url
    }else{
        toast.error(apires.response?.data?.message || "Purchase failed")
    }
}




    const { id } = useParams()
    const navigate = useNavigate()
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBookDetails()
    }, [id])

    const fetchBookDetails = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                toast.warning("Please login to view details")
                navigate('/login')
                return
            }

            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }

            const response = await getSingleBook(id, reqHeader)
            if (response.status === 200) {
                setBook(response.data)
            } else {
                toast.error("Failed to fetch book data")
            }
        } catch (error) {
            console.error(error)
            toast.error("An error occurred")
        } finally {
            setLoading(false)
        }
    }


    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        )
    }

    if (!book) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex justify-center items-center">
                    <h2 className="text-2xl text-gray-600">Book not found</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="container mx-auto px-4 py-12 flex-grow">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-6xl mx-auto border border-gray-100">
                    
                    {/* Image Section */}
                    <div className="md:w-1/2 bg-gray-100 relative group">
                        <img 
                            src={book.imageUrl} 
                            alt={book.title} 
                            className="w-full h-full object-cover min-h-[500px] transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                {book.category}
                            </span>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="md:w-1/2 p-10 flex flex-col">
                        <div className="mb-6">
                            <h1 className="text-4xl font-extrabold text-blue-900 mb-2 leading-tight">
                                {book.title}
                            </h1>
                            <p className="text-xl text-gray-500 font-medium italic">by {book.author}</p>
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-4xl font-black text-blue-600">₹{book.discountPrice}</span>
                            <span className="text-xl text-gray-400 line-through">₹{book.price}</span>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-bold">
                                {Math.round(((book.price - book.discountPrice) / book.price) * 100)}% OFF
                            </span>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">Abstract</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {book.abstract}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-10 text-sm">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-gray-400 uppercase tracking-wider font-bold text-xs mb-1">Publisher</p>
                                <p className="text-blue-900 font-semibold">{book.publisher}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-gray-400 uppercase tracking-wider font-bold text-xs mb-1">Language</p>
                                <p className="text-blue-900 font-semibold">{book.language}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-gray-400 uppercase tracking-wider font-bold text-xs mb-1">ISBN</p>
                                <p className="text-blue-900 font-semibold">{book.isbn}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-gray-400 uppercase tracking-wider font-bold text-xs mb-1">Pages</p>
                                <p className="text-blue-900 font-semibold">{book.numberofPage} pages</p>
                            </div>
                        </div>

                        {/* Additional Images (if any) */}
                        {book.uploadImage && book.uploadImage.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Gallery</h3>
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {book.uploadImage.map((img, index) => (
                                        <img 
                                            key={index}
                                            src={`${BaseUrl}/uploads/${img}`} 
                                            alt={`Page ${index + 1}`}
                                            className="w-20 h-24 object-cover rounded-lg border border-gray-200 hover:border-blue-400 cursor-pointer transition-all"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-auto pt-6 border-t border-gray-100 flex gap-4">
                            <button 
                                onClick={onbuyClick}
                                className="flex-grow bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl active:scale-95 transform"
                            >
                                Buy Now
                            </button>
                            <button 
                                onClick={() => navigate(-1)}
                                className="px-8 border-2 border-gray-200 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewsingleBook
