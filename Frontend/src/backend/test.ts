import axios from "axios"
import toast from "react-hot-toast"

const BASE_URL = "https://task-tracker-server-bmfb.onrender.com"

export const testApi = async() => {
    try {
        const response = await axios.get(`${BASE_URL}`)
        return response.data
      } catch (error:any) {
        toast.error(error?.message)
        throw new Error(error?.message)
      }
}