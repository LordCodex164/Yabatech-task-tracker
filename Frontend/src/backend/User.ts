import axios from "axios"
import toast from "react-hot-toast"

const BASE_URL = "https://task-tracker-server-bmfb.onrender.com/api"

export const getUserInfo = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user/getLoggedInUser`)
        console.log(response)
    } catch (error:any) {
        toast.error(error?.message)
    }
}