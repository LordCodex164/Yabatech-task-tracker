import {useState, useContext, createContext, useEffect} from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { register, signIn } from '../backend/Auth';
import { getUserInfo } from '../backend/User';
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import {testApi} from "../backend/test"

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
    const [isLoading, setIsloading] = useState<boolean>(false)
    const [userData, setUserData] = useState<userData | null>(null)
    const [role, setRole] = useState<string>("")
    const [allStaffs, setAllStaffs] = useState([])
    const [cookies, setCookies] = useCookies()
    const [token, setToken] = useState()

    const tokenState = cookies.access_token;
    const {decodedToken} = useJwt(tokenState)

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

     useEffect(() => {
        testApi()
     }, [])

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
          console.log(response)
          setUserData(response);
         localStorage.setItem('cookieToken', JSON.stringify((decodedToken as any).isAdmin));
          if(response) {
            if(response?.isAdmin === true) {
            navigate("/admin")
          }
          navigate("/staff")
          }
          else{
            toast.success("it is well")
          }
              
      } catch (error:any) {
          toast.error(error?.message || error.message.data);
          throw new Error(error?.message);
      }
  };

  useEffect(() => {
     const getItem = JSON.parse(localStorage.getItem("cookieToken") as unknown as string)
     if(getItem){
      console.log(getItem)
     }
  }, [])
    useEffect(() => {

     const handleGetUserInfo = async() => {
      const data = await getUserInfo()
      const {fullName, username, email, isAdmin} = data
      setUserData({
        fullName,
        username,
        email,
        isAdmin
      })
    }
    handleGetUserInfo()
    }, [])
     
   
  const logout = () => {
   setCookies("acesss_token", null)
  }




  return <AuthContext.Provider value={{authData, registerAdmin, registerStaff, login, role, logout, userData}}>
       {children}
    </AuthContext.Provider>
  
}

export const UseGlobalAuth  = () => {
    return useContext(AuthContext)
}