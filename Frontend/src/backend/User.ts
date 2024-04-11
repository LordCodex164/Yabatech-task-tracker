import axios from "axios"
import toast from "react-hot-toast"
import Cookies from "js-cookie"
import { useCookies } from "react-cookie";

const BASE_URL = "https://yabatech-task-tracker.onrender.com/api/user"



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

export const getUserInfo = async (token:string) => {
    console.log(token)
    try {
        const response = await axios.get(`${BASE_URL}/getLoggedInUser`, {
            withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
           })
        return response.data
    } catch (error:any) {
        toast.error(error?.message)
        throw new Error(error)
    }
}

export const updateSpecificUser = async (id:number) => {
    try {
        const response = await axios.put(`${BASE_URL}/update/${id}`, {
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

