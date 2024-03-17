import React from 'react'
import {Routes, Route} from "react-router-dom"
import Register from '../components/auth/Register'
import Login from "../components/auth/Login"
import DashBoardLayout from '../layouts/DashboardLayout'
import StaffComponent from '../components/StaffComponent'
import AdminComponent from '../components/AdminComponent'

const Router = () => {
  return (
   <Routes>
   
        {/* Authentication Route */}
        <Route path='auth'>
           <Route path='register' element={<Register/>}/>
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
        </Route>

      </Route>
        
   </Routes>
  )
}

export default Router