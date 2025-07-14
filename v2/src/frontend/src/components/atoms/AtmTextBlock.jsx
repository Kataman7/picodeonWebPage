import React from 'react'

const AtmTextBlock = ({ children, size = 'medium', color = 'white', align = 'center' }) => {
  const sizeClasses = {
    large: 'text-xl',
    medium: 'text-lg',
    small: 'text-sm'
  }
  
  const colorClasses = {
    white: 'text-white',
    dark: 'text-stone-800',
    gray: 'text-gray-600'
  }

  const alignClasses = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
    justify: 'text-justify'
  }

  return (
    <p className={`font-tilt-neon leading-relaxed ${sizeClasses[size]} ${colorClasses[color]} ${alignClasses[align]}`}>
      {children}
    </p>
  )
}

export default AtmTextBlock
