import { useContext, useState } from 'react'
import './App.css'
import './css/landing.css'
import Landing_page from './pages/landing'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Header from './components/header'
import RouteLock from './components/routelock'
import { AuthContext} from './components/appwrapper'
import ErrorPage from './pages/errorpage'






function App() {
  const {authStatus} = useContext(AuthContext);

  return (
    <>
    {authStatus&&<Header/>}
    <Routes>  
      <Route path='/'element={<Landing_page/>}/>
      <Route path='*' element={<ErrorPage/>}/>
      <Route path='/dashboard' element={<RouteLock><Dashboard/></RouteLock>}/>
    </Routes> 
    </>
  )
}

export default App
