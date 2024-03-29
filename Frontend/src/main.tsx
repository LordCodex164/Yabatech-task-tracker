import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './AuthProvider/AuthProvider'
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <CookiesProvider>
      <AuthProvider>
       <App />
    </AuthProvider>
    </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
