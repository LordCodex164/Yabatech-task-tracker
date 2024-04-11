import axios, { AxiosResponse } from "axios";

// Define the base URL
const BASE_URL = "http://localhost:8000/api";

interface UserData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface SignInData {
  email: string;
  password: string;
}

// Function to register a user using Axios
export const register = async (data: UserData): Promise<any> => {
  const { fullName, username, email, password, isAdmin } = data;
  const user = {
    fullName,
    username,
    email,
    password,
    isAdmin
  };

  try {
    const response: AxiosResponse = await axios.post(`${BASE_URL}/auth/register`, user, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return response.data;
  } catch (error: any) {
    // Handle error
    console.error(error);
    throw new Error(error?.message);
  }
};

// Function to sign in a user using Axios
export const signIn = async (data: SignInData): Promise<any> => {
  const { email, password } = data;
  const body = {
    email,
    password
  };

  try {
    const response: AxiosResponse = await axios.post(`${BASE_URL}/auth/login`, body, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true  // Include credentials in the request
    });

    return response.data;
  } catch (error: any) {
    // Handle error
    console.error(error);
    throw new Error(error?.message);
  }
};