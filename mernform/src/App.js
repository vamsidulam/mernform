import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Welcome from './components/Welcome'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        
        <Route path='/welcome' element={
          <ProtectedRoute>
            <Welcome/>
          </ProtectedRoute>
        } />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App