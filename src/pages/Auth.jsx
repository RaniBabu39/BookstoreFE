import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { googleAuth, registerUser } from '../services/AllApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser } from '../services/AllApi'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Header from '../components/Header'
import { AuthContext } from '../context/AuthContext'



const Auth = ({ insideRegisterUser }) => {

  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const {saveToken} = useContext(AuthContext)


  const onRegisterClick = async () => {
    try {
      let apires = await registerUser(registerData);
      if (apires.status === 201) {
        // localStorage.setItem('token', apires.data.token)
        saveToken(apires.data.token)
        localStorage.setItem('user',JSON.stringify(apires.data.user))
        toast.success("sucessfuly registered")
        navigate('/login');
      }else{
        toast(apires.response.data.message)
      }
    } catch (error) {
  if (error.response && error.response.data && error.response.data.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error("Something went wrong");
  }
  console.log(error);
}
  };

const onLoginClick = async () => {
  try {
    let { email, password } = registerData; // Only use email and password
    let reqBody = { email, password };

    let apiResponse = await loginUser(reqBody);
    if (apiResponse.status === 200) {
      
      // SAVE TOKEN AND USER
      saveToken(apiResponse.data.token);
      localStorage.setItem("user", JSON.stringify(apiResponse.data.user));

      toast("Login successfulll");

console.log("API RESPONSE ", apiResponse);

        if(apiResponse.data.user.userType=="Admin"){ ///Admin@gmail.com
          navigate('/admin-home')
        }else{
          navigate('/')
        } 
    } else {
      toast(apiResponse.response.data.message);
    }
  } catch (err) {
    console.log(err);
    toast.error("Login failed!");
  }
};

const googledecode= async(credId)=>{
  const decode =jwtDecode(credId)
  console.log(decode)

  let reqBody={
  userName:decode.name,
  email:decode.email,
  profilePic:decode.picture
  
}
let apires = await googleAuth(reqBody)
if (apires.status === 200 || apires.status === 201) {
  // localStorage.setItem("token" , apires.data.token)
  saveToken(apires.data.token)
  localStorage.setItem("user", JSON.stringify(apires.data.user))

  toast("login sucess")
  navigate("/")
}

else{
  toast("error occurred in the server")
}

}



  return (
    <>
<Header/>
    <div

 
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url("https://i.pinimg.com/1200x/fb/c5/99/fbc59971ab9fea744589b2d1127b46b9.jpg")`
      }}
    >

      
      <div className="text-center bg-yellow-900 w-[400px] h-auto p-6 rounded-lg shadow-lg">

        <h2 className="text-center mt-5 text-4xl">
          <FontAwesomeIcon icon={faUser} />
        </h2>

        <h1 className="text-white text-xl font-bold mt-3">
          {insideRegisterUser ? "REGISTER" : "LOGIN"}
        </h1>

        <div className="items-center">
          {insideRegisterUser && (
            <input
            name="userName"
              onChange={e => setRegisterData({ ...registerData, userName: e.target.value })}
              className="mt-3 bg-white rounded w-full h-12 px-3"
              placeholder="Enter username"
              type="text"
            />
          )}

          <input
            name="email"
            onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
            className="mt-3 bg-white rounded w-full h-12 px-3"
            placeholder="Enter email"
            type="text"
          />

          <input
            name="password"
            type="password"
            onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
            className="mt-3 bg-white rounded w-full h-12 px-3"
            placeholder="Enter password"
          />

          <div className="text-center mt-2">
            <p className="text-xs text-white">* Never share your password with others</p>
            <a className="text-xs text-white" href="">Forget password</a>
          </div>

          {insideRegisterUser ? (
            <button
              onClick={onRegisterClick}
              className="bg-green-400 rounded mt-5 p-2 w-1/2"
            >
              Register
            </button>
          ) : (
            <button onClick={onLoginClick}
              className="bg-green-400 rounded mt-5 p-2 w-1/2"
            >
              Login
            </button>
          )}

          <div className="mt-6">
        

           {/* googleo auth */}
           <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
    googledecode(credentialResponse.credential)
  }}
  onError={() => {
    toast("Google Authentication Failed")
    console.log('Login Failed');
  }}
/>

            {insideRegisterUser ? (
              <h2  className="mt-4 text-white">Already a user? <a href="">Login</a></h2>
            ) : (
              <h2 className="mt-4 text-white">New user? <a href="">Register</a></h2>
            )}
          </div>

        </div>
      </div>
      
    </div>
  
      </>
  );
};
  

export default Auth;