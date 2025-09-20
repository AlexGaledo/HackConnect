import { useContext, useEffect, useState } from 'react'
import './App.css'
import './css/landing.css'
import './css/dashboard.css'
import './css/events.css'
import Landing_page from './pages/landing'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Header from './components/header'
import RouteLock from './components/routelock'
import { AuthContext } from './components/appwrapper'
import ErrorPage from './pages/errorpage'
import EventPage from './pages/events'
import Splasher from './components/splash'


function App() {
  const {authStatus} = useContext(AuthContext);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
    {authStatus&&<Header/>}
    <Routes>  
      <Route path='/'element={showSplash?<Splasher/>:<Landing_page/>}/>
      <Route path='*' element={<ErrorPage/>}/>
      <Route path='/dashboard' element={<RouteLock><Dashboard/></RouteLock>}/>
      <Route path='/events' element={<RouteLock><EventPage/></RouteLock>}/>
    </Routes> 
    </>
  )
}

export default App
