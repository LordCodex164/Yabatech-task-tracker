import React from 'react'
import {Routes, Route} from "react-router-dom"
import Register from '../components/auth/Register'
import Login from "../components/auth/Login"

const Router = () => {
  return (
   <Routes>
   
        {/* Authentication Route */}
        <Route path='auth'>
           <Route path='register' element={<Register/>}/>
           <Route path='login' element={<Login/>}/>
        </Route>

         {/* Staff Route */}
         <Route path='staff'>
           <Route path='/' />
        </Route>

         {/* Admin Route */}
         <Route path='admin'>
           <Route path='register' />
        </Route>
   </Routes>
  )
}

export default Router