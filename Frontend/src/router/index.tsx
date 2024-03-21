import React, {useState} from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import Register from '../components/auth/Register'
import Login from "../components/auth/Login"
import DashBoardLayout from '../layouts/DashboardLayout'
import StaffComponent from '../components/StaffComponent'
import AdminComponent from '../components/AdminComponent'
import { UseGlobalAuth } from '../AuthProvider/AuthProvider'
import AssignComponent from '../components/AdminComponent/Assign'
import Profile from '../components/Profile/Profile'

const Router = () => {

  return (

   <Routes>
   
        {/* Authentication Route */}
        <Route path='auth'>
           <Route path='Register' element={<Register/>}/>
           <Route path='' element={<Login/>}/>
        </Route>

       <Route path='' element={<DashBoardLayout/>}>
  
         {/* Staff Route */}
         <Route path='staff'>
           <Route path='' element={<StaffComponent/>} />
        </Route>

         {/* Admin Route */}
         <Route path='admin'>
           <Route path='' element={<AdminComponent/>}/>
           <Route path='assign' element={<AssignComponent/>}/>
        </Route>

        <Route path='/profile/*' element={<Profile/>}/>

      </Route>
        
   </Routes>
  )
}

export default Router