import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PagPicodeon from '../pages/PagPicodeon'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PagPicodeon />} />
      <Route path="*" element={<PagPicodeon />} />
    </Routes>
  )
}

export default AppRoutes
