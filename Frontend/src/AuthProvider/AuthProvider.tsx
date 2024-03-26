import React, {useState, useContext, createContext, useEffect, useCallback} from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../backendConnection';


export interface AuthDataProps {
        name: string;
        email: string;
        role: string | "admin" | "staff"
}

const AuthContext =  createContext< null| any>(null)

export const AuthProvider = ({children}:any) => {

    const navigate = useNavigate()
  
    const [authData, setAuthData] = useState<AuthDataProps | null>({name: "", email: "", role: ""})
    const [role, setRole] = useState<string>("")

     const registerAdmin = (userName:string, name:string, email:string, password:string) => {
        const user = {
            name,
            email,
            role: "admin"
           } 
        
          localStorage.setItem("user", JSON.stringify(user as unknown as string))
          if(!userName || !email || !name || !password) {
            toast.error("Please fill in the important details")
            return;
          }
          toast.success("Successfully registered")
          setRole(user.role)
          setAuthData(user as unknown as AuthDataProps)
          navigate("/admin")
     }


     const registerStaff = (userName:string, name:string, email:string, password:string) => {
        const user = {
            name,
            userName,
            email,
            role: "staff"
           } 
        
          localStorage.setItem("user", JSON.stringify(user as unknown as string))
          if(!userName || !email || !name || !password) {
            toast.error("Please fill in the important details")
            return;
          }
          toast.success("Successfully registered")
          navigate("/staff")
          setRole(user.role)
          setAuthData(user as unknown as AuthDataProps)
     }


  const logout = () => {
    localStorage.clear()
    setAuthData(null)
    console.log("testing")
  }


  return <AuthContext.Provider value={{authData, registerAdmin, registerStaff, role, logout}}>
       {children}
    </AuthContext.Provider>
  
}

export const UseGlobalAuth  = () => {
    return useContext(AuthContext)
}