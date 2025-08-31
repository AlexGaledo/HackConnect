import { useState } from 'react'
import './App.css'
import Landing_page from './pages/landing'
import { Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Landing_page/>}/>
    </Routes> 
    </>
  )
}

export default App
