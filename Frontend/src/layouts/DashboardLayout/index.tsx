import React, {useEffect, useState} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideMenu from '../../components/SideMenu/SideMenu'
import { UseGlobalAuth } from '../../AuthProvider/AuthProvider'
import TopBar from '../../components/TopBar/TopBar'

const MainLayout = () => {

  const [user, setUser] = useState([])

/*  using localstorage
  const user = localStorage.getItem                           
*/

const {userData} = UseGlobalAuth()

useEffect(() => {
  console.log(userData)
 setUser(userData)
}, [])

console.log(user)

if(!user) {
  <Navigate to={"/auth"}/>
}

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