import React from 'react'

const AtmSubtitle = ({ children, size = 'medium', color = 'dark' }) => {
  const sizeClasses = {
    large: 'text-4xl my-16',
    medium: 'text-4xl my-8',
    small: 'text-2xl my-4'
  }
  
  const colorClasses = {
    white: 'text-white',
    dark: 'text-stone-800',
    gray: 'text-gray-600'
  }

  return (
    <p className={`font-light font-tilt-neon ${sizeClasses[size]} ${colorClasses[color]}`}>
      {children}
    </p>
  )
}

export default AtmSubtitle
