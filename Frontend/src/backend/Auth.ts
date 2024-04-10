import axios from "axios"

const BASE_URL = "https://yabatech-task-tracker.onrender.com/api";

export const register = async (data: { fullName: string; username: string; email: string; password: string; isAdmin: boolean }) => {
  const { fullName, username, email, password, isAdmin } = data;
  const user = {
    fullName,
    username,
    email,
    password,
    isAdmin
  };
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      },
    });

    return response.json();
  } catch (error: any) {
    // Handle error
    console.error(error);
    throw new Error(error?.message);
  }
};

export const signIn = async (data: { email: string; password: string }) : Promise<any> => {
  const { email, password } = data;
  const body = {
    email,
    password
  };

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      mode: "no-cors" 
    })
    return response.json()

  } catch (error: any) {
    // Handle error
    console.error(error);
    throw new Error(error?.message);
  }
};
