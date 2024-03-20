import React from 'react'
import { Component } from 'react'
import { Route, RoutesProps, redirect } from 'react-router-dom'

interface ProtectedRouteInterface{

}

const ProtectedRoute = ({component: Component, role, ...rest} : any) => {

    const admin = localStorage.getItem("admin")

  return (
    <Route
    {...rest}
    render={(props:any) =>
      admin === role ? (
        <Component {...props} />
      ) : (
        redirect("/auth")
      )
    }
  />
  )
}

export default ProtectedRoute