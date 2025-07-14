import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PagPicodeon from '../pages/PagPicodeon'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/picodeon" replace />} />
      <Route path="/picodeon" element={<PagPicodeon />} />
      <Route path="*" element={<Navigate to="/picodeon" replace />} />
    </Routes>
  )
}

export default AppRoutes
