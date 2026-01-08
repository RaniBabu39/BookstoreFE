import { createContext ,useState} from "react";

export const AuthContext = createContext()
export const AuthProvider = ({children})=>{


    const [token, settoken] = useState(localStorage.getItem('token'))
    const saveToken = (newToken)=>{
        settoken(newToken)
        localStorage.setItem('token', newToken)
    }
const removeToken = ()=>{

    settoken(null)
    localStorage.clear()
}


return (<AuthContext.Provider value={{token,saveToken,removeToken}}>


{children}
</AuthContext.Provider>)
}