import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllBooks } from "../services/AllApi";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";

const AllBooks = () => {
  const { token } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookData, setbookData] = useState([]);
  const [category, setCategory] = useState([]);
  const [dummybooks, setDummybooks] = useState([])
  const [search,setSearch]=useState("")

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      getBookData();
    } else {
      setIsLoggedIn(false);
    }
  }, [search, token]);

  const getBookData = async () => {
    try {
      console.log("Token found:", token ? "Yes" : "No");
      
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      
      console.log("Request Headers:", reqHeader);
      console.log("Search term:", search);

      let apiResponse = await getAllBooks(reqHeader, search);

      console.log("API Response:", apiResponse);

      if (apiResponse.status === 200) {
        // Backend returns: { message: "...", allBooks: [...] }
        const books = apiResponse.data.allBooks || apiResponse.data;
        console.log("Books fetched:", books);

        const finalBookData = Array.isArray(books) ? books : [];
        
        if (!Array.isArray(finalBookData) || finalBookData.length === 0) {
             console.log("No books found or unexpected data format", apiResponse.data);
        }

        setbookData(finalBookData);
        setDummybooks(finalBookData);
        
        const uniqueCategories = [
          ...new Set(finalBookData.map((book) => book.category)),
        ];

        setCategory(uniqueCategories);

        console.log("Categories:", uniqueCategories);
      } else {
        console.error("API Error Status:", apiResponse.status);
        if(apiResponse.response){
            console.error("API Error Data:", apiResponse.response.data);
            toast(apiResponse.response.data.error || "Failed to fetch books");
        }
      }
    } catch (error) {
      toast.error("Error occurred while calling API");
      console.error("Catch Error:", error);
    }
  };

  const filterBooks=(category)=>{
    let filteredBooks=dummybooks.filter((eachbook)=>eachbook.category==category)
    setbookData(filteredBooks)
  }

  return (
    <>
      <Header />
      {isLoggedIn ? (
        <div className="mx-auto mt-5 container">
          <h1 className="text-4xl text-center font-bold mb-8 text-blue-900">Our Collections</h1>

          <div className="mb-10 text-center flex justify-center gap-2">
            <input 
              onChange={(e)=>setSearch(e.target.value)}
              className="border-2 p-2 pl-4 rounded-lg w-1/3 border-blue-200 focus:outline-none focus:border-blue-500 transition-colors"
              type="text"
              placeholder="Search for your favorite books..."
              required
            />
            <button className="bg-blue-600 hover:bg-blue-700 p-2.5 px-6 rounded-lg text-white font-semibold transition-colors">
              Search
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 sticky top-20">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Categories</h2>
                <button 
                  onClick={getBookData} 
                  className="w-full text-left mb-3 px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition-all font-medium text-gray-700"
                >
                  All Books
                </button>
                <Form>
                  {category.length > 0 ? (
                    category.map((cat, index) => (
                      <div key={index} className="px-3 py-1">
                         <Form.Check
                          onClick={() => filterBooks(cat)}
                          type="radio"
                          id={`cat-${index}`}
                          label={cat}
                          name="bookCategory"
                          value={cat}
                          className="cursor-pointer text-gray-600 hover:text-blue-600"
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No categories found</p>
                  )}
                </Form>
              </div>
            </div>

            <div className="md:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bookData?.length > 0 ? (
                  bookData.map((book) => (
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
                            to={`${book._id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors no-underline"
                          >
                            View Details
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                     <p className="text-2xl text-gray-400 font-medium">No books found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <img 
            src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=740" 
            alt="Login required" 
            className="w-1/3 mb-8 opacity-90"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login to View Collections</h2>
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl no-underline">
            Login Now
          </Link>
        </div>
      )}
    </>
  );
};

export default AllBooks;