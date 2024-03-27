import axios from "axios"
import toast from "react-hot-toast"

const BASE_URL = "https://task-tracker-server-bmfb.onrender.com"

export const register = async (fullName:string, username:string, email:string, password:string) => {
    const user = {
        fullName,
        username,
        email,
        password
    }
    try {
       const response = await axios.post(`${BASE_URL}/auth/register`, user)
       return response.data
    } catch (error:any) {
        toast.error(error?.message)
    }
}

export const Login = async (email:string, password:string) => {
    const body = {
        email,
        password
    }
    try {
       const response = await axios.post(`${BASE_URL}/auth/login`, body)
       return response.data
    } catch (error:any) {
        toast.error(error?.message)
        throw new Error(error?.message)
    }
}