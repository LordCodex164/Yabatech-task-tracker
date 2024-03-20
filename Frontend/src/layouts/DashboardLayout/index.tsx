import React, {useState} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideMenu from '../../components/SideMenu/SideMenu'

const MainLayout = () => {


/*  using localstorage
  const user = localStorage.getItem                           
*/

const user = JSON.parse(localStorage.getItem("user") as unknown as any)

if(!user?.role) {
  return <Navigate to="auth"/>
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