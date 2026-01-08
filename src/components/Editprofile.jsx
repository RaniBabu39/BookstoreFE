import React, { useEffect, useState } from "react";
import { Button, Label, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { toast } from "react-toastify";
import { updateProfile } from "../services/AllApi";

const EditProfile = ({ setRefresh }) => {
  const [editDate, seteditDate] = useState({
    _id: "",
    userName: "",
    password: "",
    confirmpassword: "",
    bio: "",
    profilePic: ""
  });

  const [preview, setpreview] = useState(
    "https://img.freepik.com/free-vector/rectangle-shape-location-pin-with-image_78370-8215.jpg?semt=ais_hybrid&w=740&q=80"
  );
  const [openModal, setOpenModal] = useState(false);

  const updateUser = async () => {
    try {
      if (editDate.password === editDate.confirmpassword) {
        let token = localStorage.getItem("token");

        let header = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };

        //formdata is used becaus eheewe we have an file to be saved in the file thats why
        let reqBody = new FormData();

        for (let key in editDate) {
          // console.log(key,editDate[key])

          //adding each key value pair to the form data
          reqBody.append(key, editDate[key]);
        }

        let apiResponse = await updateProfile(editDate._id, reqBody, header);

        console.log(apiResponse);
        if (apiResponse.status === 200) {
          toast.success("Successfully updated the profile");

          localStorage.setItem('user', JSON.stringify(apiResponse.data.updateUser));
          setRefresh(prev => !prev);
          setOpenModal(false);

        } else {
          toast.error("Can't update the profile");
        }


      } else {
        toast.error("password not match to confirm pass");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occued while updating the profile");
    }
  };

  //
  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData && userData !== "undefined") {
      const parsedUser = JSON.parse(userData);
      seteditDate({
        _id: parsedUser._id || "",
        userName: parsedUser.userName || "",
        password: "",
        confirmpassword: "",
        bio: parsedUser.bio || "",
        profilePic: parsedUser.profilePic || ""
      });
      if (parsedUser.profilePic) {
        setpreview(parsedUser.profilePic);
      } else {
        setpreview(
          "https://img.freepik.com/free-vector/rectangle-shape-location-pin-with-image_78370-8215.jpg?semt=ais_hybrid&w=740&q=80"
        );
      }
    } else {
      console.log("No user data found in localStorage");
      seteditDate({
        _id: "",
        userName: "",
        password: "",
        confirmpassword: "",
        bio: "",
        profilePic: ""
      });
      setpreview(
        "https://img.freepik.com/free-vector/rectangle-shape-location-pin-with-image_78370-8215.jpg?semt=ais_hybrid&w=740&q=80"
      );
    }
  }, []);

  const onCloseModal = () => {
    setOpenModal(false);
    setpreview(
      editDate.profilePic
        ? editDate.profilePic
        : "https://img.freepik.com/free-vector/rectangle-shape-location-pin-with-image_78370-8215.jpg?semt=ais_hybrid&w=740&q=80"
    );
  };
  const handleImageUpload = (e) => {
    seteditDate({ ...editDate, profilePic: e.target.files[0] });

    setpreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>


      <button
        onClick={() => {
          const userData = localStorage.getItem("user");
          if (userData && userData !== "undefined") {
            const parsedUser = JSON.parse(userData);
            seteditDate({
              _id: parsedUser._id || "",
              userName: parsedUser.userName || "",
              password: "",
              confirmpassword: "",
              bio: parsedUser.bio || "",
              profilePic: parsedUser.profilePic || ""
            });
            if (parsedUser.profilePic) {
              setpreview(parsedUser.profilePic);
            } else {
              setpreview(
                "https://img.freepik.com/free-vector/rectangle-shape-location-pin-with-image_78370-8215.jpg?semt=ais_hybrid&w=740&q=80"
              );
            }
          } else {
            seteditDate({
              _id: "",
              userName: "",
              password: "",
              confirmpassword: "",
              bio: "",
              profilePic: ""
            });
            setpreview(
              "https://img.freepik.com/free-vector/rectangle-shape-location-pin-with-image_78370-8215.jpg?semt=ais_hybrid&w=740&q=80"
            );
          }
          setOpenModal(true);
        }}
        className="bg-blue-800 text-white px-5 py-2 mt-5 rounded hover:bg-blue-900 transition"
      >
        Edit
      </button>

      <Modal
        className="w-150"
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
      >
        <div className="p-4">
          <ModalHeader className="border-b pb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Profile
            </h3>
          </ModalHeader>

          <ModalBody>
            <div className="space-y-5 py-4 ">
              <div className=" justify-content-center text-center">
                <Label className="block mb-2 font-medium">
                  <input
                    onChange={(e) => handleImageUpload(e)}
                    className="hidden"
                    type="file"
                    name=""
                    id="imgup"
                  />
                  <img className="rounded-full w-40 ms-40" src={preview} />
                </Label>

                <div className="">
                  <input
                    onChange={(e) =>
                      seteditDate({ ...editDate, userName: e.target.value })
                    }
                    value={editDate?.userName}
                    className="bg-white p-2 w-100 mt-10 rounded "
                    placeholder="User Name"
                    type="text"
                  />
                  <input
                    onChange={(e) =>
                      seteditDate({ ...editDate, password: e.target.value })
                    }
                    value={editDate?.password}
                    className="bg-white p-2 w-100 mt-10 rounded "
                    placeholder=" Enter New Password"
                    type="text"
                  />
                  <input
                    onChange={(e) =>
                      seteditDate({
                        ...editDate,
                        confirmpassword: e.target.value,
                      })
                    }
                    value={editDate?.confirmpassword}
                    className="bg-white p-2 w-100 mt-10 rounded text-black "
                    placeholder="Confirm New  Password"
                    type="text"
                  />
                  <textarea
                    onChange={(e) =>
                      seteditDate({ ...editDate, bio: e.target.value })
                    }
                    value={editDate?.bio}
                    className="bg-white p-2 w-100 mt-10 rounded text-black "
                    placeholder="Bio"
                    type="text"
                  />
                </div>
              </div>

              <Button
                onClick={updateUser}
                className="w-full bg-green-600 hover:bg-green-700 border-none transition"
              >
                Save
              </Button>

              <Button
                onClick={onCloseModal}
                className="w-full bg-red-500 hover:bg-red-600 border-none transition"
              >
                Cancel
              </Button>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

export default EditProfile;
