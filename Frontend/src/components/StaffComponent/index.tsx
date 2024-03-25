import React from 'react'
import { Navigate } from 'react-router'
import { AuthDataProps, UseGlobalAuth } from '../../AuthProvider/AuthProvider'


const StaffComponent = () => {

  const {authData} = UseGlobalAuth()

  if(!authData || authData.role !== "staff") {
   return <Navigate to={"/auth"}/>
  }
  
  return (
    <div>
      StaffComponent
    </div>
  )
}

export default StaffComponent