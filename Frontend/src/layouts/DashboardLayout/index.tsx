import React, {useEffect, useState} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideMenu from '../../components/SideMenu/SideMenu'
import { UseGlobalAuth } from '../../AuthProvider/AuthProvider'
import TopBar from '../../components/TopBar/TopBar'

interface User {
  name: string, 
  email: string, 
  role: string
}

const MainLayout = () => {

  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
/*  using localstorage
  const user = localStorage.getItem                           
*/

const {userData} = UseGlobalAuth()

useEffect(() => {
 setUser(userData)
 console.log(user)
}, [])

useEffect(() => {
 if(user?.role === "admin"){
  setIsAdmin(true)
 }
}, [])

console.log(user)

if(!user) {
  <Navigate to={"/auth"}/>
}

  return (
    <>
    <div className='flex min-h-screen w-full'>
      <SideMenu admin={isAdmin}/>
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