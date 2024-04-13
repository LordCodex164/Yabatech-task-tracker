import axios from "axios"
import toast from "react-hot-toast"

const BASE_URL = "http://localhost:8000/api"

export const testApi = async() => {
    try {
        const response = await axios.get(`${BASE_URL}`)
        return response.data
      } catch (error:any) {
        toast.error(error?.message)
        throw new Error(error?.message)
      }
}