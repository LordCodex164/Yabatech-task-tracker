import React, {useEffect, useState} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideMenu from '../../components/SideMenu/SideMenu'
import { UseGlobalAuth } from '../../AuthProvider/AuthProvider'

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
    <div className='flex justify-between min-h-screen'>
      <SideMenu/>
      <div id='detail'>
        <Outlet/>
      </div>
    </div>
    
    </>
  )
}

export default MainLayout 