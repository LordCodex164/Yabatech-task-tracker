import React from 'react'
import {Routes, Route} from "react-router-dom"



const Router = () => {
  return (
   <Routes>
   
        {/* Authentication Route */}
        <Route path='auth'>
           <Route path='register' />
        </Route>

         {/* Staff Route */}
         <Route path='staff'>
           <Route path='*' />
        </Route>

         {/* Admin Route */}
         <Route path='admin'>
           <Route path='register' />
        </Route>
   </Routes>
  )
}

export default Router