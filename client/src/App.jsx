import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ReportIssue from './pages/ReportIssue'
import MyIssues from './pages/MyIssues'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path='/report' element={
        <ProtectedRoute>
          <ReportIssue />
        </ProtectedRoute>
      } />

      <Route path='/myissues' element={
        <ProtectedRoute>
          <MyIssues />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App