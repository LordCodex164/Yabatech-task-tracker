import React, {useState, useContext, createContext, Children} from 'react'


interface AuthDataProps {
        name: string;
        email: string;
        role: "admin" | "staff"
}

const AuthContext =  createContext< null| any>(null)

export const AuthProvider = ({children}:any) => {
  
    const [authData, setAuthData] = useState<AuthDataProps[]>([])

     const register = (name:string, email:string) => {

     }

  return (
    <AuthContext.Provider value={authData}>
       {children}
    </AuthContext.Provider>
  )
}

export const UseGlobalAuth  = () => {
    return useContext(AuthContext)
}