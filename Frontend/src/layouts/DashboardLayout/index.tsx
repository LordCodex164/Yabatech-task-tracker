import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const DashBoardLayout = () => {

  const user = localStorage.getItem("user")

  if(!user) {
    return <Navigate to="/auth"/>
  }

  return (
    <>
    <div id='detail'>
      <Outlet/>
    </div>
    </>
  )
}

export default DashBoardLayout 