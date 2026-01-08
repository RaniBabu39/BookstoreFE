import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSidebar from '../Components/AdminSidebar'
import { toast } from 'react-toastify'
import { getAllBooks, getAllJobs, getAllUsers } from '../../services/AllApi'

const Adminhome = () => {

  const [totalBooks, setTotalBooks] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalOpenings, setTotalOpenings] = useState(0)
 

  const box = {
    height: "120px",
    width: "200px"
  }

  useEffect(() => {
    getTotalBooks()
    getTotalUsers()
    getTotaloppenings()
  }, [])

  const getTotalBooks = async () => {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        const apiresponse = await getAllBooks(reqHeader, "")
        if (apiresponse.status == 200) {
          setTotalBooks(apiresponse.data.allBooks?.length || 0)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  const getTotaloppenings = async () => {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        const apiresponse = await getAllJobs(reqHeader)
        if (apiresponse.status == 200) {
          setTotalOpenings(apiresponse.data.allJobs?.length || apiresponse.data.length || 0)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in server")
    }
  }

  const getTotalUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        const apiresponse = await getAllUsers(reqHeader)
        if (apiresponse.status == 200) {
          setTotalUsers(apiresponse.data.allUsers?.length || apiresponse.data.length || 0)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <>
      <AdminHeader />

      <div className='grid grid-cols-[2fr_5fr]'>
        <AdminSidebar />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mx-10 mt-10'>

          <div
            style={box}
            className='bg-amber-200 rounded-2xl flex flex-col justify-center items-center shadow-sm'
          >
            <h3 className='text-sm font-semibold'>Total Books</h3>
            <p className='text-xl font-bold'>{totalBooks}</p>
          </div>

          <div
            style={box}
            className='bg-green-100 rounded-2xl flex flex-col justify-center items-center shadow-sm'
          >
            <h3 className='text-sm font-semibold'>Total Users</h3>
            <p className='text-xl font-bold'>{totalUsers}</p>
          </div>

          <div
            style={box}
            className='bg-green-300 rounded-2xl flex flex-col justify-center items-center shadow-sm'
          >
            <h3 className='text-sm font-semibold'>Total Oppenings</h3>
            <p className='text-xl font-bold'>{totalOpenings}</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default Adminhome