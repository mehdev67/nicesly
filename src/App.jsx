import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NiceslyWebsite from './components/NiceslyWebsite'
import MemberDashboard from './components/MemberDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<NiceslyWebsite />} />
        <Route path="/dashboard/*" element={<MemberDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
