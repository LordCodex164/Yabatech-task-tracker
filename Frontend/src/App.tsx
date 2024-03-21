import { useState } from 'react'
import './App.css'
import Router from './router'
import {Toaster} from "react-hot-toast"

function App() {

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
