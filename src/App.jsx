import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import MasterResume from './pages/MasterResume'
import Applications from './pages/Applications'
import Profile from './pages/Profile'
import WorkSpace from './pages/WorkSpace'
import Login from './pages/Login'


function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route   element={<Layout/>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="work-space" element={<WorkSpace/>} />
          <Route path="master-resume" element={<MasterResume />} />
          <Route path="applications" element={<Applications />} />
          <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
