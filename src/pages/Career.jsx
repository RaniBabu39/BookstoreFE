import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { applyjob, getAllJobs } from '../services/AllApi'
import { toast } from 'react-toastify'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";


const Career = () => {
    const [openModal, setOpenModal] = useState(false);

   const [jobData, setjobData] = useState([])

   useEffect(()=>{
    loadJobs()
   },[])




   const [applyData, setApplyData] = useState({

    name:"",
    email:'',
    phoneNo:"",
    qualification:"",
    resume:"",
jobRole:"",
jobId:""
    



   })



const applyJobClick = async()=>{

  try {

let header = {

  "Content-Type":"multipart/form-data"
}
let reqBody = new FormData()
for(let key in applyData){
  reqBody.append(key,applyData[key])
}
let apiResponse = await applyjob(reqBody,header)
if(apiResponse.status == 201){
  toast.success("Sucessfully Applied")
  setOpenModal(false)
}



else{
  toast.error(apiResponse.response.data.message)
}
    
  } catch (error) {
    console.log(error)

    toast.error("something went wrong in the server")
    
  }
}


   console.log(applyData)



   const onButtonClick= async(job)=>{

setApplyData({...applyData,jobId:job._id, jobRole:job.jobTitle})
//we sed this mehod becaus while simaltanonously updating more than one states there will
//  take an time for updating the data as a // result the latest state change only occure
//  to prevent this sinario we used this methood

setOpenModal(true)


   }

   const loadJobs = async()=>{
    try {
      console.log("Fetching jobs...")
      let apires = await getAllJobs()
      console.log("Jobs API Response:", apires)
      
      if(apires.status === 200){
        setjobData(apires.data)
      } else {
        console.error("Failed to fetch jobs:", apires)
        toast.error("Failed to load jobs")
      }
    } catch (error) {
      console.error("Error loading jobs:", error)
      toast.error("Something went wrong while loading jobs")
    }
   }
  
  return (
    <div>
      <Header/>
      <div className='p-6 container mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Career Opportunities</h1>
        {
          jobData.length > 0 ? (
            <div className='grid gap-6'>
              {
                jobData.map((job, index)=>{
                  return(
                    <div key={job._id || index} className='bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
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
                            <Button className='bg-blue-700' onClick={() =>onButtonClick(job)}>Apply Now</Button>
                        </div>
                    </div>
                  )
                })
              }
            </div>
          ) : (
            <div className='text-center py-10'>
              <h2 className='text-2xl text-gray-600'>No jobs found</h2>
            </div>
          )
        }
      </div>

      <Modal  show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className='bg-gray-300 text-center text-black'>Apply For the Jobroles</ModalHeader>
        <ModalBody className='bg-gray-400'>
        <div className="flex flex-col gap-4">


  <div className="flex gap-4">
    <input
    onChange={(e)=>{
      setApplyData({...applyData,name:e.target.value})
    }}
      type="text"
      placeholder="Name"
      className="w-full bg-gray-300 p-2 text-center rounded-md"
    />

    <input
    onChange={(e)=>{
      setApplyData({...applyData,email:e.target.value})
    }}
      type="email"
      placeholder="Email"
      className="w-full bg-gray-300 p-2 text-center rounded-md"
    />
  </div>

  
  <div className="flex gap-4">
    <input
    onChange={(e)=>{
      setApplyData({...applyData,phoneNo:e.target.value})
    }}
      type="text"
      placeholder="Phone No"
      className="w-full bg-gray-300 p-2 text-center rounded-md"
    />

    <input
    onChange={(e)=>{
      setApplyData({...applyData,qualification:e.target.value})
    }}
      type="text"
      placeholder="Qualification"
      className="w-full bg-gray-300 p-2 text-center rounded-md"
    />
  </div>


  <div className="flex flex-col gap-2">
    <label htmlFor="resume" className="text-sm font-medium">
      Resume
    </label>
    <input
    onChange={(e)=>{
      setApplyData({...applyData,resume:e.target.files[0]})
    }}
      type="file"
      id="resume"
      name="resume"
      className="bg-gray-300 p-2 rounded-md"
    />
  </div>

  

</div>
        </ModalBody>
        <ModalFooter className='bg-gray-400 flex justify-center gap-5'>
         
          
          <Button onClick={() => setOpenModal(false)} className='bg-red-400'>
            Close
          </Button>
          <Button className='bg-blue-400' onClick={applyJobClick}>
            Apply
          </Button>

        
        </ModalFooter>
      </Modal>


    </div>
  )
}

export default Career