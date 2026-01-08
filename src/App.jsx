
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import AllBooks from './pages/Allbooks'
import Career from './pages/Career'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import PNF from './pages/PNF'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import Loader from './components/Loader'
import Editprofile from './components/Editprofile'
import Adminbooks from './Admin/Pages/Adminbooks'
import Admincareers from './Admin/Pages/Admincareers'
import Adminhome from './Admin/Pages/Adminhome'
import Adminsettings from './Admin/Pages/Adminsettings'
import Adminapplicationview from './Admin/Pages/Adminapplicationview'
import ViewsingleBook from './pages/ViewsingleBook'
import Paymentfailure from './pages/Paymentfailure'
import Paymentsucess from './pages/Paymentsucess'


function App() {

  const [showhome, setshowhome] = useState(false)

  setTimeout(()=>{
    setshowhome(true);
  },5000)



  return (
    <>
   

<Routes> 
 
  <Route path='/' element={showhome?<Home/> :<Loader/> }/>
  <Route path='/allbooks'  element={<AllBooks/>}/>
  <Route path='/allbooks/:id' element={<ViewsingleBook/>}/>
  <Route   path='/career' element={<Career/>}/>
<Route path='/contact' element={<Contact/>}/>
<Route path='/profile' element={<Profile/>} />
<Route path='/login' element={<Auth/>}/>
<Route path='/register' element={<Auth   insideRegisterUser={true}/>} />
<Route path='/editprofile' element={<Editprofile/>} />
<Route path='/admin-books' element={<Adminbooks/>}/>
<Route path='/admin-career' element={<Admincareers/>}/>
<Route path='/admin-home' element={<Adminhome/>}/>
<Route path='/admin-settings' element={<Adminsettings/>} />
<Route path='/admin-applications' element={<Adminapplicationview/>}/>
<Route path='/*' element={<PNF/>}/>
<Route path='/payment-success' element={<Paymentsucess/>}/>
<Route path='/payment-failure' element={<Paymentfailure/>}/>  
</Routes>
<Footer/>
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>

      </>
  )
}

export default App
