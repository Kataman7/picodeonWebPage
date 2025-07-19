import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from '../routes/routes'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App
