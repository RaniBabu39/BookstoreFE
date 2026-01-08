import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <GoogleOAuthProvider clientId="188335962318-bhrdmn9qpjec4rkku3bqaplseuf5r84j.apps.googleusercontent.com">
    <BrowserRouter>
  
  
    <AuthProvider>
       <App />
    </AuthProvider>
    </BrowserRouter>
   </GoogleOAuthProvider>
   
  </StrictMode>,
)
