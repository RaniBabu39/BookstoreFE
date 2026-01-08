import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { toast } from "react-toastify";
import { updateProfile } from "../../services/AllApi";

const Adminsettings = () => {
  const [editadminData, seteditadminData] = useState({
    userName: "",
    password: "",
    confirmpassword: "",
    profilePic: "",
  });

  const [previewImage, setpreviewImage] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
  );

  const handlePreview = (e) => {
    setpreviewImage(URL.createObjectURL(e.target.files[0]));
    seteditadminData({ ...editadminData, profilePic: e.target.files[0] });
  };

  useEffect(() => {
    let adminData = JSON.parse(localStorage.getItem("user"));
    if (adminData) {
      seteditadminData(adminData);
      // Set preview image if profile picture exists
      if (adminData.profilePic) {
        setpreviewImage(adminData.profilePic);
      }
    }
  }, []);

  const onsubmitClick = async () => {
    try {
      if (
        editadminData.userName == "" ||
        editadminData.password == "" ||
        editadminData.confirmpassword == ""
      ) {
        toast.error("Please fill all the fields");
      } else {
        //

        if (editadminData.password == editadminData.confirmpassword) {
          //proceed to api calling

          let token = localStorage.getItem("token");
          let header = {
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type for FormData - axios sets it automatically with boundary
          };

          let reqBody = new FormData();
          // Only append the fields that backend expects
          reqBody.append("userName", editadminData.userName);
          reqBody.append("password", editadminData.password);
          
          // Only append profilePic if it's a File object (new upload)
          if (editadminData.profilePic instanceof File) {
            reqBody.append("profilePic", editadminData.profilePic);
          }

          console.log("Sending update request for user:", editadminData._id);
          console.log("FormData contents:");
          for (let pair of reqBody.entries()) {
            console.log(pair[0], pair[1]);
          }

          let apiResponse = await updateProfile(
            editadminData._id,
            reqBody,
            header
          );
          console.log("Full API Response:", apiResponse);
          console.log("Response Status:", apiResponse.status);
          console.log("Response Data:", apiResponse.data);
          
          // Check if it's an error response
          if (apiResponse.response) {
            // Axios error - the request was made and server responded with error status
            console.log("Error Response:", apiResponse.response);
            toast.error(`Failed to update: ${apiResponse.response.data.message || 'Server error'}`);
          } else if (apiResponse.status == 200) {
            toast.success("Successfully updated!");
            localStorage.setItem(
              "user",
              JSON.stringify(apiResponse.data.updatedUser)
            );
            // Reload the page to show updated data
            window.location.reload();
          } else {
            console.log("Update failed with status:", apiResponse.status);
            toast.error(`Failed to update profile - Status: ${apiResponse.status}`);
          }
        } else {
          toast.error("password and confirm password doesn't match");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating profile");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className=" grid grid-cols-[2fr_5fr]">
        <AdminSidebar />
        <div>
          <h1 className="text-center text-2xl"> Settings</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
                quas quod odit? Harum repellat enim, voluptatum sequi fuga
                sapiente, nobis libero labore rerum animi eligendi distinctio
                iusto voluptate a similique! Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Quo eligendi sunt, corporis optio
                quia quibusdam eos, delectus neque vitae veritatis soluta
                similique ut in itaque molestias accusamus at maiores mollitia?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Mollitia iusto labore, laboriosam aperiam nobis ipsa ducimus
                vero quisquam, tempora rerum porro quasi repellendus sint nisi
                sunt suscipit placeat est? Dicta.
              </p>
            </div>
            <div>
              {/* div for box */}
              <div className="w-auto me-5 h-120 bg-amber-500 rounded-2xl">
                <label htmlFor="imgup">
                  <input
                    onChange={(e) => {
                      handlePreview(e);
                    }}
                    className="hidden"
                    type="file"
                    name=""
                    id="imgup"
                  />
                  <img className="w-25 ms-4" src={previewImage} alt="" />
                </label>

                <div className="flex flex-col gap-5 mt-20">
                  <input
                    value={editadminData.userName}
                    onChange={(e) => {
                      seteditadminData({
                        ...editadminData,
                        userName: e.target.value,
                      });
                    }}
                    placeholder="username"
                    className="bg-white text-black rounded p-2 ms-5 me-5 text-center"
                    type="text"
                  />

                  <input
                    type="password"
                    value={editadminData.password}
                    onChange={(e) => {
                      seteditadminData({
                        ...editadminData,
                        password: e.target.value,
                      });
                    }}
                    placeholder="password"
                    className="bg-white text-black rounded p-2 ms-5 me-5 text-center"
                  />
                  <input
                    value={editadminData.confirmpassword}
                    onChange={(e) => {
                      seteditadminData({
                        ...editadminData,
                        confirmpassword: e.target.value,
                      });
                    }}
                    placeholder="confirm password"
                    className="bg-white text-black rounded p-2 ms-5 me-5 text-center"
                    type="text"
                  />
                </div>

                <div className="text-center flex justify-center gap-5 mt-10">
                  <button className="bg-red-500 p-4 rounded-2xl">RESET</button>
                  <button
                    onClick={onsubmitClick}
                    className="bg-green-400 p-4 rounded-2xl"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminsettings;
