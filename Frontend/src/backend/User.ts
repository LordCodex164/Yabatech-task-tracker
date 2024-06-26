import axios from "axios"
import toast from "react-hot-toast"


const BASE_URL = "https://yabatech-task-tracker.onrender.com/api/user"

interface userData {
  fullName: string;
  username: string;
  email:string
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getUsers`, {
            withCredentials: true
           })
        return response.data
    } catch (error:any) {
        toast.error(error?.message)
        throw new Error(error)
    }
}

export const getSpecificUser = async (id:number) => {
    try {
        const response = await axios.get(`${BASE_URL}/getUser/${id}`)
        return response.data
    } catch (error:any) {
        toast.error(error?.message)
        throw new Error(error)
    }
}

export const getUserInfo = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getLoggedInUser`, {
            withCredentials: true,
           })
        return response.data
    } catch (error:any) {
        throw new Error(error?.message)
    }
}

export const updateSpecificUser = async (id:number, data:userData) => {
    try {
        const response = await axios.put(`${BASE_URL}/update/${id}`, data, {
            withCredentials: true
           })
        return response.data
    } catch (error:any) {
        toast.error(error?.message)
        throw new Error(error)
    }
}

export const deleteSpecificUser = async (id:number) => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete/${id}`, {
            withCredentials: true
           })
        return response.data
    } catch (error:any) {
        toast.error(error?.message)
        throw new Error(error)
    }
}

