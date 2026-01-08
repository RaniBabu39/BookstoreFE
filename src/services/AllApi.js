import { BaseUrl } from "./BaseUrl";
import commonApi from "./CommonApi";

// REGISTER USER
export const registerUser = async (reqbody) => {
  return await commonApi("post", `${BaseUrl}/registerUser`, reqbody);
};

// LOGIN USER
export const loginUser = async (reqbody) => {
  return await commonApi("post", `${BaseUrl}/loginUser`, reqbody);
};
// google Auth

export const googleAuth = async (reqBody) => {
  return await commonApi("post", `${BaseUrl}/googleLogin`, reqBody)
}

//add book

export const addBook = async (reqBody, reqHeader) => {
  return await commonApi('post', BaseUrl + '/addBook', reqBody, reqHeader)
}

export const getAllBooks = async (reqHeader, search) => {
  return await commonApi("GET", `${BaseUrl}/getbooks?search=${search}`, "", reqHeader);
};


export const getLimitedBooks = async () => {
  return await commonApi('get', BaseUrl + "/getlimitedbooks", "")

}

export const getSingleBook = async (id, reqHeader) => {
  return await commonApi('get', `${BaseUrl}/${id}/getsingleBook`, "", reqHeader)
}



export const updateProfile = async (id, reqbody, reqHeader) => {

  return await commonApi(
    "patch", `${BaseUrl}/${id}/updateProfile`, reqbody, reqHeader

  )
}
export const getAllUsers = async (reqHeader) => {
  return await commonApi('get', BaseUrl + '/getAllUsers', "", reqHeader)
}


export const getAllJobs = async () => {
  return await commonApi('get', BaseUrl + '/getjobs', "")
}

export const addJob = async (reqBody, reqHeader) => {
  return await commonApi('post', BaseUrl + '/addjobs', reqBody, reqHeader)
}

export const deleteJob = async (id, reqHeader) => {
  return await commonApi('delete', `${BaseUrl}/${id}/deleteJob`, "", reqHeader)
}

export const getJobApplications = async (reqHeader) => {
  return await commonApi('get', BaseUrl + '/getallApplications', "", reqHeader)
}

export const applyjob = async (reqBody, reqHeader) => {

  return await commonApi('post', BaseUrl + '/applyjob', reqBody, reqHeader)
}

export const buyBook = async (reqBody, reqHeader) => {
  return await commonApi('post', BaseUrl + '/buyBook', reqBody, reqHeader)
}

export const getSoldBooks = async (reqHeader) => {
  return await commonApi('get', BaseUrl + '/getSoldBooksbyUser', "", reqHeader)
}

export const getPurchasedBooks = async (reqHeader) => {
  return await commonApi('get', BaseUrl + '/getPurchasedBooks', "", reqHeader)
}