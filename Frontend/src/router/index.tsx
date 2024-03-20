import React, {useState} from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import Register from '../components/auth/Register'
import Login from "../components/auth/Login"
import DashBoardLayout from '../layouts/DashboardLayout'
import StaffComponent from '../components/StaffComponent'
import AdminComponent from '../components/AdminComponent'


const Router = () => {
  const [userRole, setUserRole] = useState<string>("")
  const user:any = JSON.parse(localStorage.getItem("user") as unknown as any)


  
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
           <Route path='' element={user?.role == "staff" && <StaffComponent/>} />
        </Route>

         {/* Admin Route */}
         <Route path='admin'>
           <Route path='' element={ user?.role == "admin" && <AdminComponent/>}/>
        </Route>

      </Route>
        
   </Routes>
  )
}

export default Router