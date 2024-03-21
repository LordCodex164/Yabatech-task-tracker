import React from 'react'
import { Navigate } from 'react-router-dom'
import { UseGlobalAuth } from '../../AuthProvider/AuthProvider'

const AdminComponent = () => {

  const {authData} = UseGlobalAuth()

  if(!authData || authData.role !== "admin") {
   return <Navigate to={"/auth"}/>
  }
  

  return (
    <div>
      AdminComponent
    </div>
  )
}

export default AdminComponent