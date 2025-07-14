import React from 'react'

const AtmSubtitle = ({ children, size = 'medium', color = 'dark' }) => {
  const sizeClasses = {
    large: 'text-4xl',
    medium: 'text-4xl',
    small: 'text-2xl'
  }
  
  const colorClasses = {
    white: 'text-white',
    dark: 'text-stone-800',
    gray: 'text-gray-600'
  }

  return (
    <p className={`mt-10 font-light font-tilt-neon ${sizeClasses[size]} ${colorClasses[color]}`}>
      {children}
    </p>
  )
}

export default AtmSubtitle
