import React, {useEffect, useState} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideMenu from '../../components/SideMenu/SideMenu'
import TopBar from '../../components/TopBar/TopBar'
import { useCookies } from "react-cookie";
import { UseGlobalAuth } from '../../AuthProvider/AuthProvider';
interface User {
  name: string, 
  email: string, 
  role: string
}

const MainLayout = () => {

  const [cookies, setCookies] = useCookies()

//   const [user, setUser] = useState<User | null>(null)
//   const [isAdmin, setIsAdmin] = useState(false)
// /*  using localstorage
//   const user = localStorage.getItem                           
// */

 const {userData} = UseGlobalAuth()

// useEffect(() => {
//  setUser(userData)
//  console.log(user)
// }, [])

// useEffect(() => {
//  if(user?.role === "admin"){
//   setIsAdmin(true)
//  }
// }, [])

// console.log(user)


  return (
    <>
    <div className='flex min-h-screen w-full'>
      <SideMenu/>
      <div className='w-full'>
        <TopBar/>
        <div id='detail'>
        <Outlet/>
       </div>
      </div>
      
    </div>
    
    </>
  )
}

export default MainLayout 