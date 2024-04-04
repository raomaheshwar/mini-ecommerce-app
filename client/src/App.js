import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/Auth/Register'
import "react-toastify/dist/ReactToastify.css"
import Login from './pages/Auth/Login';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<PageNotFound/>}/>
     
    </Routes>
    </>
  )
}

export default App