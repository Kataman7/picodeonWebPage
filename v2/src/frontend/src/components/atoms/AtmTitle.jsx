import React from 'react'

const AtmTitle = ({ children, size = 'large', color = 'white' }) => {
  const sizeClasses = {
    large: 'text-6xl my-12',
    medium: 'text-4xl my-8',
    small: 'text-2xl my-4'
  }
  
  const colorClasses = {
    white: 'text-white',
    dark: 'text-stone-800',
    gray: 'text-gray-600'
  }

  return (
    <h1 className={`font-tilt-neon ${sizeClasses[size]} ${colorClasses[color]}`}>
      {children}
    </h1>
  )
}

export default AtmTitle
