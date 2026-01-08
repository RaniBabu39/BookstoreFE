import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import { getAllJobs, deleteJob, addJob } from '../../services/AllApi'
import { toast } from 'react-toastify'

const Admincareers = () => {



const onAddJob = async () => {
  // Validation - experience is optional
  if (!newJob.jobTitle || !newJob.jobLocation || !newJob.jD || !newJob.Salary || 
      !newJob.publishedDate || !newJob.requiredQualification || 
      !newJob.skills || !newJob.lastDate) {
    toast.error("Please fill all the required fields")
    return
  }

  try {
    let token = localStorage.getItem("token")
    let header = {
      Authorization: `Bearer ${token}`
    }
    let response = await addJob(newJob, header)
    console.log(response)
    
    if (response.status == 201) {
      toast.success("Job added successfully!")
      setShowModal(false)
      // Reset form
      setNewJob({
        jobTitle: '',
        jobLocation: '',
        jD: '',
        Salary: '',
        expreience: '',
        publishedDate: '',
        requiredQualification: '',
        skills: '',
        lastDate: ''
      })
      // Refresh jobs list
      fetchJobs()
    } else {
      toast.error(response.response?.data?.message || "Failed to add job")
    }
  } catch (error) {
    console.log(error)
    toast.error("Failed to add job")
  }
}





  const [jobs, setJobs] = useState([])
  // const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newJob, setNewJob] = useState({
    jobTitle: '',
    jobLocation: '',
    jD: '',
    Salary: '',
    expreience: '',
    publishedDate: '',
    requiredQualification: '',
    skills: '',
    lastDate: ''
  })

  // Fetch jobs function - defined before onDeleteJob so it can be called
  const fetchJobs = async () => {
    try {
      console.log("Fetching jobs...")
      // setLoading(true)
      const response = await getAllJobs()
      console.log("Jobs API Response:", response)
      console.log("Number of jobs received:", response.data?.length)
      
      if (response.status === 200) {
        console.log("Setting jobs data:", response.data)
        setJobs(response.data)
      } else {
        toast.error("Failed to fetch jobs")
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
      toast.error("An error occurred while fetching jobs")
    } finally {
      // setLoading(false)
    }
  }

  const handleAddJob = async (e) => {
    e.preventDefault()
    
    // Validation - experience is optional
    if (!newJob.jobTitle || !newJob.jobLocation || !newJob.jD || !newJob.Salary || 
        !newJob.publishedDate || !newJob.requiredQualification || 
        !newJob.skills || !newJob.lastDate) {
      toast.error("Please fill all the required fields")
      return
    }

    try {
      console.log("Adding job with data:", newJob)
      let token = localStorage.getItem("token")
      let header = {
        Authorization: `Bearer ${token}`
      }
      
      const response = await addJob(newJob, header)
      console.log("Add job response:", response)
      
      if (response.response) {
        toast.error(`Failed to add job: ${response.response.data.message || 'Server error'}`)
      } else if (response.status === 201) {
        toast.success("Job added successfully!")
        setShowModal(false)
        // Reset form
        setNewJob({
          jobTitle: '',
          jobLocation: '',
          jD: '',
          Salary: '',
          expreience: '',
          publishedDate: '',
          requiredQualification: '',
          skills: '',
          lastDate: ''
        })
        // Refresh jobs list
        fetchJobs()
      } else {
        toast.error("Failed to add job")
      }
    } catch (error) {
      console.error("Error adding job:", error)
      toast.error("An error occurred while adding job")
    }
  }

  const onDeleteJob = async (id) => {
    // Confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this job? This action cannot be undone.")
    
    if (!confirmDelete) {
      return // User cancelled
    }

    try {
      console.log("Deleting job with ID:", id)
      let token = localStorage.getItem("token")
      let header = {
        Authorization: `Bearer ${token}`
      }
      let response = await deleteJob(id, header)
      console.log("Delete response:", response)
      
      // Check if it's an error response from axios
      if (response.response) {
        console.log("Error response:", response.response)
        toast.error(`Failed to delete: ${response.response.data.message || 'Server error'}`)
      } else if (response.status === 200) {
        toast.success("Job deleted successfully!")
        // Refresh the jobs list after deletion
        fetchJobs()
      } else {
        toast.error("Something went wrong while deleting job")
      }
    } catch (error) {
      console.log("Delete error:", error)
      toast.error("Failed to delete job")
    }
  }


  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <>
      <AdminHeader />
      <div className='grid grid-cols-[2fr_5fr]'>
        <AdminSidebar />
        <div className='p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-3xl font-bold'>Career Opportunities</h1>
            <button 
              onClick={() => setShowModal(true)}
              className='bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2'
            >
              <span className='text-xl'>+</span> Add Job
            </button>
          </div>
          
          {/* Add Job Modal */}
          {showModal && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
              <div className='bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='text-2xl font-bold'>Add New Job</h2>
                  <button 
                    onClick={() => setShowModal(false)}
                    className='text-gray-500 hover:text-gray-700 text-3xl'
                  >
                    &times;
                  </button>
                </div>
                
                <form onSubmit={handleAddJob} className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-semibold mb-2'>Job Title *</label>
                      <input
                        type='text'
                        value={newJob.jobTitle}
                        onChange={(e) => setNewJob({...newJob, jobTitle: e.target.value})}
                        className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
                        placeholder='e.g. Senior Developer'
                      />
                    </div>
                    
                    <div>
                      <label className='block text-sm font-semibold mb-2'>Location *</label>
                      <input
                        type='text'
                        value={newJob.jobLocation}
                        onChange={(e) => setNewJob({...newJob, jobLocation: e.target.value})}
                        className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
                        placeholder='e.g. Remote / New York'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-semibold mb-2'>Salary *</label>
                      <input
                        type='text'
                        value={newJob.Salary}
                        onChange={(e) => setNewJob({...newJob, Salary: e.target.value})}
                        className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
                        placeholder='e.g. $80,000 - $100,000'
                      />
                    </div>
                    
                    <div>
                      <label className='block text-sm font-semibold mb-2'>Experience Required </label>
                      <input
                        type='text'
                        value={newJob.expreience}
                        onChange={(e) => setNewJob({...newJob, expreience: e.target.value})}
                        className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
                        placeholder='e.g. 3-5 years'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-semibold mb-2'>Published Date *</label>
                      <input
                        type='date'
                        value={newJob.publishedDate}
                        onChange={(e) => setNewJob({...newJob, publishedDate: e.target.value})}
                        className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
                      />
                    </div>
                    
                    <div>
                      <label className='block text-sm font-semibold mb-2'>Last Date to Apply *</label>
                      <input
                        type='date'
                        value={newJob.lastDate}
                        onChange={(e) => setNewJob({...newJob, lastDate: e.target.value})}
                        className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold mb-2'>Job Description *</label>
                    <textarea
                      value={newJob.jD}
                      onChange={(e) => setNewJob({...newJob, jD: e.target.value})}
                      className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
                      rows='4'
                      placeholder='Describe the job responsibilities and requirements...'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-semibold mb-2'>Required Qualifications *</label>
                    <textarea
                      value={newJob.requiredQualification}
                      onChange={(e) => setNewJob({...newJob, requiredQualification: e.target.value})}
                      className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
                      rows='3'
                      placeholder='e.g. Bachelor degree in Computer Science...'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-semibold mb-2'>Required Skills *</label>
                    <textarea
                      value={newJob.skills}
                      onChange={(e) => setNewJob({...newJob, skills: e.target.value})}
                      className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
                      rows='3'
                      placeholder='e.g. React, Node.js, MongoDB...'
                    />
                  </div>

                  <div className='flex gap-4 mt-6'>
                    <button
                      type='button'
                      onClick={() => setShowModal(false)}
                      className='flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors'
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      onClick={onAddJob}
                      className='flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors'
                    >
                      Add Job
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          
          {jobs.length > 0 ? 
           
         
            <div className='grid gap-6'>
              {jobs.map((job, index) => {
                console.log(`Job ${index + 1} ID:`, job._id)
                return (
                <div 
                  key={job._id} 
                  className='bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'
                >
                  <div className='flex justify-between items-start mb-4'>
                    <div>
                      <h2 className='text-2xl font-bold text-gray-800'>{job.jobTitle}</h2>
                      <p className='text-gray-600 mt-1'>
                        <span className='font-semibold'>Location:</span> {job.jobLocation}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-xl font-bold text-green-600'>{job.Salary}</p>
                      <p className='text-sm text-gray-500'>Salary</p>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4 mb-4'>
                    <div>
                      <p className='text-sm text-gray-500'>Experience Required</p>
                      <p className='font-semibold text-gray-800'>{job.expreience}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Published Date</p>
                      <p className='font-semibold text-gray-800'>{job.publishedDate}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Last Date to Apply</p>
                      <p className='font-semibold text-red-600'>{job.lastDate}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Contact Email</p>
                      <p className='font-semibold text-blue-600'>{job.contactMail}</p>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <p className='text-sm text-gray-500 mb-2'>Job Description</p>
                    <p className='text-gray-700'>{job.jD}</p>
                  </div>

                  <div className='mb-4'>
                    <p className='text-sm text-gray-500 mb-2'>Required Qualifications</p>
                    <p className='text-gray-700'>{job.requiredQualification}</p>
                  </div>

                  <div className='mb-4'>
                    <p className='text-sm text-gray-500 mb-2'>Required Skills</p>
                    <p className='text-gray-700'>{job.skills}</p>
                  </div>

                  <div className='flex gap-3 mt-4'>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors'>
                      View Details
                    </button>
                    <button onClick={()=>onDeleteJob(job._id)} className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors'>
                      Delete Job
                    </button>
                  </div>
                </div>
                )
              })}
            </div> : <h1>No jobs found</h1>
          }
        </div>
      </div>
    </>
  )
}

export default Admincareers