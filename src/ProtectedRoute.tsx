import React from 'react'
import { Component } from 'react'
import { Route, RoutesProps } from 'react-router-dom'

interface ProtectedRouteInterface{

}

const ProtectedRoute = ({component: Component, ...rest} : any) => {

    const user = getUser()

  return (
   <Route
    render={(props: RoutesProps) => (
        <Component {...props} />
    )}
   />
  )
}

export default ProtectedRoute