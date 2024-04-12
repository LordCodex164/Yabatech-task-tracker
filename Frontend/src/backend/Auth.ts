const BASE_URL = "https://yabatech-task-tracker.onrender.com/api";

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

// Function to register a user using Fetch API
export const register = async (data:UserData) => {
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
      credentials: "include"
    });

    return await response.json();
  } catch (error:any) {
    // Handle error
    console.error(error);
    throw new Error(error?.message);
  }
};

// Function to sign in a user using Fetch API
export const signIn = async (data:SignInData) => {
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
      credentials: "include" // Include credentials in the request
    });

    return await response.json();
  } catch (error:any) {
    // Handle error
    console.error(error);
    throw new Error(error?.message);
  }
};