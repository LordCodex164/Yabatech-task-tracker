import React, {useState, useContext, createContext, useEffect, useCallback} from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../backendConnection';
import { register, Signin } from '../backend/Auth';

export interface AuthDataProps {
        name: string;
        email: string;
        role: string | "admin" | "staff"
}

const AuthContext =  createContext< null| any>(null)

export const AuthProvider = ({children}:any) => {

    const navigate = useNavigate()
  
    const [authData, setAuthData] = useState<AuthDataProps | null>()
    const [isLoading, setIsloading] = useState<boolean>(false)
    const [role, setRole] = useState<string>("")

     const registerAdmin = async (username:string, fullName:string, email:string, password:string, isAdmin:true):Promise<void> => {
        const user = {
            fullName,
            username,
            email,
            password,
            isAdmin
           } 
           setIsloading(true)
          if(!username || !email || !fullName || !password) {
            toast.error("Please fill in the important details")
            return;
          }
          try {
          const data = await register(user)
          console.log(data)
          toast.success("Successfully registered")
          setAuthData(data as unknown as AuthDataProps)
          setTimeout(() => {
            navigate("/auth")
          }, 500)
          } catch (error:any) {
            toast.error(error?.message || error.message.data)
            throw new Error(error?.message)
          }
          
          
     }


     const registerStaff = async (username:string, fullName:string, email:string, password:string, isAdmin:false):Promise<void> => {
      const user = {
        fullName,
        username,
        email,
        password,
        isAdmin
       }
          localStorage.setItem("user", JSON.stringify(user as unknown as string))
          if(!username || !email || !fullName || !password) {
            toast.error("Please fill in the important details")
            return;
          }
          try {
            const data = await register(user)
            toast.success("Successfully registered")
            setAuthData(data as unknown as AuthDataProps)
            setTimeout(() => {
              navigate("/auth")
            }, 500)
            } catch (error:any) {
              toast.error(error?.message || error.message.data)
              throw new Error(error?.message)
            }    
     }

     const login = async (email:string, password:string) => {
     
      const user = {
        email,
        password,
       }
      
       if(!email || !password) {
        toast.error("Please fill in the important details")
        return;
      }
      try {
        const data = await Signin(user)
        const {token} = data
        console.log(data)

      } catch (error:any) {
        toast.error(error?.message || error.message.data)
        throw new Error(error?.message)
      }

     }


  const logout = () => {
    localStorage.clear()
    setAuthData(null)
    console.log("testing")
  }


  return <AuthContext.Provider value={{authData, registerAdmin, registerStaff, login, role, logout}}>
       {children}
    </AuthContext.Provider>
  
}

export const UseGlobalAuth  = () => {
    return useContext(AuthContext)
}