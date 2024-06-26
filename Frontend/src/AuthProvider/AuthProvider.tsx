import {useState, useContext, createContext, useEffect} from 'react'
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { register, signIn } from '../backend/Auth';
import { getUserInfo } from '../backend/User';
import { signOut } from '../backend/Auth';

export interface AuthDataProps {
        name: string;
        email: string;
        role: string | "admin" | "staff"
}

interface userData {
  username: string,
  email: string,
  fullName: string,
  isAdmin: boolean
}

const AuthContext =  createContext< null| any>(null)

export const AuthProvider = ({children}:any) => {

    const navigate = useNavigate()
    const [authData, setAuthData] = useState<AuthDataProps | null>()
    const [userData, setUserData] = useState<userData | null>(null)

    const registerAdmin = async (username:string, fullName:string, email:string, password:string, isAdmin:true, uniqueId:string):Promise<void> => {
        const user = {
            fullName,
            username,
            email,
            password,
            isAdmin,
            uniqueId
           } 
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

     const registerStaff = async (username:string, fullName:string, email:string, password:string, isAdmin:false, uniqueId: string):Promise<void> => {
      const user = {
        fullName,
        username,
        email,
        password,
        isAdmin,
        uniqueId
       }
          localStorage.setItem("user", JSON.stringify(user as unknown as string))
          if(!username || !email || !fullName || !password) {
            toast.error("Please fill in the important details")
            return;
          }
          try {
            const data = await register(user)
            console.log("data",data)
            toast.success("Successfully registered")
            setTimeout(() => {
              navigate("/auth")
            }, 500)
            } catch (error:any) {
              toast.error(error?.message || error.message.data)
              throw new Error(error?.message)
            }    
     }

      const login = async (email: string, password: string) => {
      if (!email || !password) {
          toast.error('Please fill in the important details');
          return;
      }
      try {
          const response = await signIn({ email, password });
          if(response && response !== null) {
            setUserData(response);
            if(response.isAdmin) {
                localStorage.setItem('cookieToken', JSON.stringify(response.isAdmin));
                navigate("/admin")
            }
            else if(response.isAdmin == false) {
              navigate("/staff")
            }
            else {
              toast.error("wrong password")
            }
        } else {
            // Handle case where response is null or missing expected data
            toast.error('Invalid response data. Please try again.');
        }
      } catch (error:any) {
          toast.error(error?.message || error.message.data);
          throw new Error(error?.message);
      }
  };

  

  useEffect(() => {
     const getItem = JSON.parse(localStorage.getItem("cookieToken") as unknown as string)
     if(getItem){
     }
  }, [])
    useEffect(() => {

     const handleGetUserInfo = async() => {
      const data = await getUserInfo()
      console.log("data", data)
      const {fullName, username, email, isAdmin} = data
      setUserData({
        fullName,
        username,
        email,
        isAdmin
      })
      if(data.isAdmin) {
        navigate("/admin")
      }
      else {
        navigate("/staff")
      }
    }
    handleGetUserInfo()
    }, [])
     
   
  const logout = async() => {
    await signOut ()
    navigate("/auth")
  }

  return <AuthContext.Provider value={{authData, registerAdmin, registerStaff, login, logout, userData}}>
       {children}
    </AuthContext.Provider>
  
}

export const UseGlobalAuth  = () => {
    return useContext(AuthContext)
}