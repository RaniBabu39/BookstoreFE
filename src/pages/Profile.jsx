import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addBook, getSoldBooks as getSoldBooksApi, getPurchasedBooks as getPurchasedBooksApi, buyBook } from "../services/AllApi";
import Editprofile from "../components/Editprofile";

const Profile = () => {
  const [Activesection, setActivesection] = useState("");
  const [UploadedImage, setUploadedImage] = useState(null);
  const [soldebookdata, setSoldBookdata] = useState([]);
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [preview, setPreview] = useState(
    "https://i.pinimg.com/564x/e8/ee/07/e8ee0728e1ba12edd484c111c1f492f2.jpg"
  );

  const [previewList, setPreviewList] = useState([]);

  const [userData, setuserData] = useState({
    userName: "",
    profilePic: "",
    bio: ""
  });

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    numberofPage: 0,
    imageUrl: "",
    price: 0,
    discountPrice: 0,
    abstract: "",
    publisher: "",
    language: "",
    isbn: "",
    category: "",
    uploadImage: []
  });

  useEffect(() => {
    loadProfile();
  }, [refresh]);

  useEffect(() => {
    if (Activesection === "bookadd") {
      getSoldBooks();
    } else if (Activesection === "purchase") {
      fetchPurchaseHistory();
    }
  }, [Activesection]);

  const loadProfile = () => {
    let userData = localStorage.getItem("user");
    if (userData) {
      try {
        userData = JSON.parse(userData);
        setuserData(userData);
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
        setuserData({
          userName: "",
          profilePic: "",
          bio: ""
        });
      }
    }
  };

  const getSoldBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const header = {
        Authorization: `Bearer ${token}`
      };

      const apiResponse = await getSoldBooksApi(header);

      if (apiResponse.status === 200) {
        setSoldBookdata(apiResponse.data);
      } else {
        toast.error(apiResponse.response?.data?.message || "Failed to fetch book details");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while getting book details");
    }
  };

  const fetchPurchaseHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const header = {
        Authorization: `Bearer ${token}`
      };

      const apiResponse = await getPurchasedBooksApi(header);

      if (apiResponse.status === 200) {
        setPurchasedBooks(apiResponse.data);
      } else {
        toast.error(apiResponse.response?.data?.message || "Failed to fetch purchase history");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while getting purchase history");
    }
  };

  const addDemoPurchase = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("Please login first");
        return;
      }

      const header = {
        Authorization: `Bearer ${token}`
      };

      const demoBook = {
        bookId: "demo-id-" + Date.now(),
        bookName: "The Great Gatsby (Demo)",
        bookDesc: "A classic novel exploring themes of wealth, love, and the American Dream.",
        sellerMail: "demo-seller@example.com",
        bookImage: "https://i.pinimg.com/564x/4a/01/21/4a012177c48f86f7c9e034091e9b2521.jpg",
        bookPrice: 999,
        bookDiscountPrice: 799,
        isMock: true
      };

      const apiResponse = await buyBook(demoBook, header);

      if (apiResponse.status === 200) {
        toast.success("Demo book added to your history!");
        fetchPurchaseHistory();
      } else {
        toast.error("Failed to add demo book");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding demo book");
    }
  };

  const imageupload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setPreview(imageURL);

    if (previewList.length < 3) {
      setPreviewList((prev) => [...prev, imageURL]);
    }

    setUploadedImage(file);

    setBookData((prev) => ({
      ...prev,
      uploadImage: [...prev.uploadImage, file],
    }));
  };

  const onAddBookClick = async (e) => {
    e.preventDefault();

    try {
      if (
        bookData.title === "" ||
        bookData.isbn === "" ||
        bookData.abstract === "" ||
        bookData.author === "" ||
        bookData.category === "" ||
        bookData.imageUrl === "" ||
        bookData.language === "" ||
        bookData.numberofPage === 0 ||
        bookData.price === 0 ||
        bookData.publisher === ""
      ) {
        toast.warning("Please fill the form completely");
        return;
      }

      if (bookData.uploadImage.length === 0) {
        toast.warning("Please upload at least one image");
        return;
      }

      let reqBody = new FormData();

      for (let key in bookData) {
        if (key !== "uploadImage") {
          reqBody.append(key, bookData[key]);
        } else {
          bookData.uploadImage.forEach((eachfile) => {
            reqBody.append("uploadImage", eachfile);
          });
        }
      }

      let token = localStorage.getItem("token");

      let header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      let apiResponse = await addBook(reqBody, header);

      if (apiResponse.status === 201) {
        toast.success("Book added successfully!");
        setBookData({
          title: "",
          author: "",
          numberofPage: 0,
          imageUrl: "",
          price: 0,
          discountPrice: 0,
          abstract: "",
          publisher: "",
          language: "",
          isbn: "",
          category: "",
          uploadImage: []
        });
        setPreview("https://i.pinimg.com/564x/e8/ee/07/e8ee0728e1ba12edd484c111c1f492f2.jpg");
        setPreviewList([]);
        document.getElementById("form1").reset();
      } else {
        const errorMessage = apiResponse.response?.data?.message || "Failed to add book. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while adding the book");
    }
  };

  return (
    <div>
      <div className="w-full h-72 bg-[#0a1a2f] relative">
        <div className="absolute -bottom-16 left-32 w-40 h-40 bg-gray-200 border-4 border-white rounded-full overflow-hidden shadow-lg">
          <img
            className="w-full h-full object-cover"
            src={userData?.profilePic ? userData.profilePic : "https://i.pinimg.com/564x/e8/ee/07/e8ee0728e1ba12edd484c111c1f492f2.jpg"}
            alt="Profile"
          />
        </div>
      </div>

      <div className="mt-20 px-32 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            {userData?.userName || "User Name"} <FontAwesomeIcon icon={faCircleCheck} className="text-blue-500 text-xl" />
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl italic">
            {userData?.bio || "No bio available"}
          </p>
        </div>
        <Editprofile setRefresh={setRefresh} />
      </div>

      <div className="flex justify-center mt-12 gap-5">
        <button
          onClick={() => setActivesection("sellbook")}
          className={`border-2 p-2 ${Activesection === "sellbook" ? "bg-blue-600 text-white border-blue-600" : "border-gray-200"}`}
        >
          Sell books
        </button>
        <button
          onClick={() => setActivesection("bookadd")}
          className={`border-2 p-2 ${Activesection === "bookadd" ? "bg-blue-600 text-white border-blue-600" : "border-gray-200"}`}
        >
          Book status
        </button>
        <button
          onClick={() => setActivesection("purchase")}
          className={`border-2 p-2 ${Activesection === "purchase" ? "bg-blue-600 text-white border-blue-600" : "border-gray-200"}`}
        >
          Purchase History
        </button>
      </div>

      {Activesection === "sellbook" && (
        <div className="flex justify-center items-center mt-10 pb-20">
          <div className="bg-[#0a1a2f] w-[1000px] rounded-xl shadow-2xl p-8">
            <h1 className="text-center mb-10 text-3xl font-semibold text-white">
              List Your Book for Sale
            </h1>

            <form id="form1">
              <div className="flex gap-10">
                <div className="w-1/2 flex flex-col gap-5">
                  <input
                    className="bg-white/10 text-white border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-lg p-3 transition-all"
                    placeholder="Book Title"
                    onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                    type="text"
                  />
                  <input
                    className="bg-white/10 text-white border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-lg p-3 transition-all"
                    placeholder="Author"
                    onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
                    type="text"
                  />
                  <input
                    className="bg-white/10 text-white border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-lg p-3 transition-all"
                    placeholder="No of pages"
                    onChange={(e) => setBookData({ ...bookData, numberofPage: Number(e.target.value) })}
                    type="number"
                  />
                  <input
                    className="bg-white/10 text-white border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-lg p-3 transition-all"
                    placeholder="Image url"
                    onChange={(e) => setBookData({ ...bookData, imageUrl: e.target.value })}
                    type="text"
                  />
                  <input
                    className="bg-white/10 text-white border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-lg p-3 transition-all"
                    placeholder="Price"
                    onChange={(e) => setBookData({ ...bookData, price: Number(e.target.value) })}
                    type="number"
                  />
                  <input
                    className="bg-white/10 text-white border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-lg p-3 transition-all"
                    placeholder="Discounted Price"
                    onChange={(e) => setBookData({ ...bookData, discountPrice: Number(e.target.value) })}
                    type="number"
                  />
                  <textarea
                    className="bg-white/10 text-white border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-lg p-3 transition-all h-32"
                    placeholder="Abstract / Description"
                    onChange={(e) => setBookData({ ...bookData, abstract: e.target.value })}
                  />
                </div>

                <div className="w-1/2 flex flex-col gap-5">
                  <input
                    className="bg-white/10 text-white border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-lg p-3 transition-all"
                    placeholder="Publisher"
                    onChange={(e) => setBookData({ ...bookData, publisher: e.target.value })}
                    type="text"
                  />
                  <input
                    className="bg-white/10 text-white border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-lg p-3 transition-all"
                    placeholder="Language"
                    onChange={(e) => setBookData({ ...bookData, language: e.target.value })}
                    type="text"
                  />
                  <input
                    className="bg-white/10 text-white border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-lg p-3 transition-all"
                    placeholder="ISBN"
                    onChange={(e) => setBookData({ ...bookData, isbn: e.target.value })}
                    type="text"
                  />
                  <input
                    className="bg-white/10 text-white border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-lg p-3 transition-all"
                    placeholder="Category"
                    onChange={(e) => setBookData({ ...bookData, category: e.target.value })}
                    type="text"
                  />

                  <div className="flex flex-col gap-4">
                    <p className="text-white/70 text-sm">Upload Book Images (Max 3)</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <label htmlFor="imgUpload" className="cursor-pointer">
                        <div className="w-32 h-40 border-2 border-dashed border-white/20 hover:border-blue-400 rounded-lg flex items-center justify-center overflow-hidden transition-all">
                          {preview ? (
                            <img className="w-full h-full object-cover" src={preview} alt="main-preview" />
                          ) : (
                            <span className="text-white/40">Main</span>
                          )}
                        </div>
                        <input onChange={imageupload} className="hidden" type="file" id="imgUpload" accept="image/*" />
                      </label>

                      <div className="flex gap-2">
                        {previewList.map((eachimg, index) => (
                          <div key={index} className="w-20 h-24 rounded border border-white/10 overflow-hidden">
                            <img className="w-full h-full object-cover" src={eachimg} alt={`preview-${index}`} />
                          </div>
                        ))}
                        {previewList.length < 3 && (
                          <label htmlFor="imgup" className="cursor-pointer">
                            <div className="w-16 h-16 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all">
                              <span className="text-2xl text-white">+</span>
                            </div>
                            <input className="hidden" onChange={imageupload} type="file" id="imgup" accept="image/*" />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-10 gap-5">
                    <button type="reset" className="flex-1 py-3 px-6 rounded-lg font-semibold bg-gray-600 hover:bg-gray-700 text-white transition-all shadow-lg">
                      Reset
                    </button>
                    <button type="button" onClick={onAddBookClick} className="flex-1 py-3 px-6 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg" title="Submit your book listing">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {Activesection === "bookadd" && (
        <div className="mt-10 px-32 pb-20">
          <h2 className="text-2xl font-semibold mb-6">Books You've Listed</h2>
          {soldebookdata.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {soldebookdata.map((book) => (
                <div key={book._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transform hover:scale-105 transition-all">
                  <div className="h-56 overflow-hidden">
                    <img className="w-full h-full object-cover" src={book.imageUrl} alt={book.title} />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1 truncate">{book.title}</h3>
                    <p className="text-gray-500 mb-2">{book.author}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-blue-600 font-bold">₹{book.price}</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full uppercase font-semibold">Active</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <img className="w-48 opacity-50" src="https://i.pinimg.com/originals/07/58/49/075849c4c046e7b2951a31b0df30da06.gif" alt="Empty" />
              <p className="mt-4 text-gray-5gh00 text-lg">You haven't added any books for sale yet.</p>
              <button onClick={() => setActivesection("sellbook")} className="mt-6 text-blue-600 font-semibold hover:underline">Start selling now</button>
            </div>
          )}
        </div>
      )}

      {Activesection === "purchase" && (
        <div className="mt-10 px-32 pb-20">
          <h2 className="text-2xl font-semibold mb-6">Your Purchase History</h2>
          {purchasedBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {purchasedBooks.map((purchase) => (
                <div key={purchase._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transform hover:scale-105 transition-all">
                  <div className="h-56 overflow-hidden">
                    <img className="w-full h-full object-cover" src={purchase.bookImage} alt={purchase.bookName} />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1 truncate">{purchase.bookName}</h3>
                    <p className="text-gray-500 mb-2 truncate">{purchase.bookDesc}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-blue-600 font-bold">₹{purchase.bookDiscountPrice}</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full uppercase font-semibold">Purchased</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <img className="w-48 opacity-50" src="https://i.pinimg.com/originals/07/58/49/075849c4c046e7b2951a31b0df30da06.gif" alt="Empty" />
              <p className="mt-4 text-gray-500 text-lg">No book purchased yet.</p>
              <button
                onClick={addDemoPurchase}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md active:scale-95"
              >
                Add Demo Purchase (Testing)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;