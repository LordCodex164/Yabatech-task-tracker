import axios from "axios"
import toast from "react-hot-toast"

const BASE_URL = "https://yabatech-task-tracker.onrender.com/api"


export const createTasks = async (data: {taskName: string, description: string, assignedUser: string | undefined, deadLine: string, taskStatus: string}) => {
   const {taskName, description, assignedUser, deadLine, taskStatus} = data
   const taskData = {
    taskName,
    description,
    assignedUser,
    deadLine,
    taskStatus
   }
    try {
       const response = await axios.post(`${BASE_URL}/task/createTask`, taskData)
       return response
    } catch (error:any) {
        toast.error(error?.message)
        throw new Error(error?.message)
    }
}

export const getSpecificTask = async (id:number) => {
  try {
    const response = await axios.get(`${BASE_URL}/task/getTask/${id}`)
    return response.data
  } catch (error:any) {
    toast.error(error?.message)
    throw new Error(error?.message)
  }
}

export const updateTask = async (id:number, data:{taskStatus: string}) => {
   
    try {
       const response = await axios.put(`${BASE_URL}/task/updateTask/${id}`, data)
       return response.data
    } catch (error:any) {
        toast.error(error?.message)
        throw new Error(error?.message)
    }
}

export const deleteTask = async (id:number) => {
   
  try {
     const response = await axios.delete(`${BASE_URL}/task/deleteTask/${id}`)
     return response.data
  } catch (error:any) {
      toast.error(error?.message)
      throw new Error(error?.message)
  }
}

export const getAllTasks = async (username:string) => {
   
     try {
        const response = await axios.post(`${BASE_URL}/user/getUserTasks/${username}`)
        return response
     } catch (error:any) {
         toast.error(error?.message)
         throw new Error(error?.message)
     }
 }
 