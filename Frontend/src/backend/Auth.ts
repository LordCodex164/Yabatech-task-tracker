const BASE_URL = "http://localhost:8000/api";

interface UserData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  uniqueId: string
}

interface SignInData {
  email: string;
  password: string;
}

// Function to register a user using Fetch API
export const register = async (data:UserData) => {
  const { fullName, username, email, password, isAdmin, uniqueId } = data;
  const user = {
    fullName,
    username,
    email,
    password,
    isAdmin,
    uniqueId
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

export const signOut = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include" // Include credentials in the request
    })
    return response.json()
  } catch (error) {
    
  }
}