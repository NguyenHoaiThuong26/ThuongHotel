import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './route/route-config'

function App() {
 
  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    //   <LoginPage />
    // </div>
    <div className="min-h-screen">
      <AppRoutes />
    </div>
  )
}

export default App
