import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { getAllBooks, getAllUsers } from "../../services/AllApi";
import Card from "react-bootstrap/Card";
import { Await, Link } from "react-router-dom";

const Adminbooks = () => {

const [userData, setuserData]= useState([])
const [searchKey, setsearchKey] = useState("")


  const [allBooks, setallBooks] = useState([]);

  useEffect(() => {
    getbookData();
    getuserData()
  }, [searchKey]);

  const getbookData = async () => {
    try {
      let token = localStorage.getItem("token");

      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getAllBooks(header, searchKey);

      console.log(apiResponse);
      if (apiResponse.status === 200) {
        setallBooks(apiResponse.data.allBooks || apiResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showBooks, setshowBooks] = useState(true);
  const [showUsers, setshowUsers] = useState(false);


  const getuserData= async()=>{
    try {
      let token = localStorage.getItem('token')
      let header ={
        Authorization :`Bearer ${token}`
      }
      let apiresponse = await getAllUsers(header)
      if(apiresponse.status==200){
        setuserData(apiresponse.data)

      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[2fr_5fr]">
        <div>
          <AdminSidebar />
        </div>
        <div className="p-5">
          <div className="text-center mb-8">
            <button
              onClick={() => {
                setshowBooks(true);
                setshowUsers(false);
              }}
              className={`p-3 rounded me-5 cursor-pointer transition-colors ${showBooks ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Books
            </button>

            <button
              onClick={() => {
                setshowUsers(true);
                setshowBooks(false);
              }}
              className={`p-3 rounded me-5 cursor-pointer transition-colors ${showUsers ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Users
            </button>
          </div>

          {showBooks && (
          
            <div className="mt-8">
              <div className="flex justify-center">
<input onChange={(e)=>setsearchKey(e.target.value)} placeholder="Search Books" className="text-center mb-5 w-100 h-12 bg-amber-100" type="text" />
 

              </div>
              {allBooks?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allBooks.map((book) => (
                    <Card
                      key={book._id}
                      className="h-100 border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden bg-white group"
                    >
                      <div className="relative overflow-hidden h-64">
                         <Card.Img
                          variant="top"
                          src={book.imageUrl}
                          alt={book.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <Card.Body className="p-5 flex flex-col">
                        <Card.Title className="text-lg font-bold mb-2 text-gray-800 line-clamp-1" title={book.title}>
                          {book.title}
                        </Card.Title>

                        <Card.Text className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                          {book.abstract}
                        </Card.Text>

                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-600">
                            ₹{book.discountPrice}
                          </span>
                          <Link
                            to={`/allbooks/${book._id}`} 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors no-underline"
                          >
                            View Details
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                   <p className="text-xl text-gray-400">No books found.</p>
                </div>
              )}
            </div>
          )}

          {showUsers && (
            <div>
              {userData?.length > 0 ? (
                <div className="grid grid-cols-3 gap-10 mt-10">
                  {userData.map((eachUserdata) => (
                    <div key={eachUserdata._id}>
                      <div className="border p-5 bg-amber-100">
                        <h1>{eachUserdata.userName}</h1>
                        <img src={eachUserdata.profile || ""} alt="" />
                        <h1>{eachUserdata.email}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-xl text-gray-400">No users found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Adminbooks;
