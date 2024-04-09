import axios from "axios"
import toast from "react-hot-toast"

const BASE_URL = "http://localhost:8000/api"

export const register = async (data : {fullName: string; username:string, email: string, password:string, isAdmin:boolean}) => {
    const  {fullName, username, email, password, isAdmin} = data
    const user = {
        fullName,
        username,
        email,
        password,
        isAdmin
    }
    try {
       const response = await axios.post(`${BASE_URL}/auth/register`, user)
       return response.data
    } catch (error:any) {
        toast.error(error?.message)
    }
}

export const Signin = async (data : {email: string, password:string}) => {
   const {email, password} = data
    const body = {
        email,
        password
    }
    try {
       const response = await axios.post(`${BASE_URL}/auth/login`, body, {
        withCredentials: true
       })
       return response
    } catch (error:any) {
        toast.error(error?.message)
        throw new Error(error?.message)
    }
}

