import { useState } from 'react'
import './App.css'
import {redirect} from "react-router-dom"
import { useUserStore } from './state/useUserStore'
import Router from './router'
import {Toaster} from "react-hot-toast"

function App() {

const {} = useUserStore()

  return (
    <>
     <Router/>
     <Toaster
      reverseOrder={true}
      gutter={5}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#F1F8F5',
          color: '##212121',
          width: 726,
          height: 72,
          maxWidth: "826px",
          textAlign: "left",
          left: "50%"
        },
      }}
      />
    </>
  )
}

export default App
