import React, {useState} from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import Register from '../pages/auth/Register'
import Login from "../pages/auth/Login"
import DashBoardLayout from '../layouts/DashboardLayout'
import StaffComponent from '../components/StaffComponent'
import AdminComponent from '../components/AdminComponent'
import { UseGlobalAuth } from '../AuthProvider/AuthProvider'
import AssignComponent from '../components/AdminComponent/Assign'
import Profile from '../pages/Profile/Profile'
import ViewTasks from '../components/StaffComponent/view'
import Root from '../Root'

const Router = () => {

  return (

   <Routes>
   
        {/* Authentication Route */}
        <Route path='auth' element={<Root/>}>
           <Route path='Register' element={<Register/>}/>
           <Route path='' element={<Login/>}/>
        </Route>

       <Route path='' element={<DashBoardLayout/>}>
  
         {/* Staff Route */}
         <Route path='/staff'>
           <Route path='' element={<StaffComponent/>} />
           <Route path='viewTask' element={<ViewTasks/>}/>
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