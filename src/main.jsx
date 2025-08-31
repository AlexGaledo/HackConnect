import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppWrapper from './components/appwrapper'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </StrictMode>
 
)
