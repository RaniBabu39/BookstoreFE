import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSidebar from '../Components/AdminSidebar'
import { BaseUrl } from '../../services/BaseUrl'
import { getJobApplications } from '../../services/AllApi'
import { toast } from 'react-toastify'

const Adminapplocationview = () => {

    const [applicationdata, setApplicationdata] = useState([])

    useEffect(() => {
        getApplicationdata()
    }, [])





    const getApplicationdata = async () => {
        try {
            let token = localStorage.getItem("token")
            if (!token) {
                toast.error("No token found, please login again")
                return
            }
            
            let header = {
                Authorization: `Bearer ${token}`
            }
            let response = await getJobApplications(header)
            console.log("Job Applications Response:", response)

            if (response.status === 200) {
                setApplicationdata(response.data.allApplications)
            } else {
                // If the API returns an error response object (from axios interceptor or direct response)
                const errorMsg = response.response?.data?.message || response.message || "Failed to fetch job applications"
                console.error("Fetch error details:", response)
                toast.error(errorMsg)
            }

        } catch (error) {
            console.error("Error fetching applications:", error)
            toast.error("An error occurred while fetching applications")
        }
    }

    return (
        <div>
            <AdminHeader />
            <div className='grid grid-cols-[2fr_5fr]'>
                <AdminSidebar />
                <div className='p-4'>
                    <h1 className='text-3xl font-bold text-center mb-6'>Job Applications</h1>

                    <div className='grid gap-4'>
                        {
                            applicationdata.length > 0 ? applicationdata.map((item, index) => {
                                return (
                                    <div key={index} className='bg-white p-6 rounded shadow-md border'>
                                        <h2 className='text-xl font-bold'>{item.name}</h2>
                                        <p><strong>Email:</strong> {item.email}</p>
                                        <p><strong>Phone:</strong> {item.phoneNo}</p>
                                        <p><strong>Applied for:</strong> {item.jobRole}</p>
                                        <p><strong>Qualification:</strong> {item.qualification}</p>
                                        <div className='mt-2'>
                                            <a 
                                                href={`${BaseUrl}/uploads/${item.resume}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block'
                                            >
                                                Download Resume
                                            </a>
                                        </div>
                                    </div>
                                )
                            }) : <p className='text-center text-gray-500'>No job applications found</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adminapplocationview