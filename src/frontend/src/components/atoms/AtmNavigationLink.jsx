import React from 'react'

const AtmNavigationLink = ({ href, text }) => {
  return (
    <a 
      className="text-white hover:underline transition-all duration-200 font-tilt-neon" 
      href={href}
    >
      {text}
    </a>
  )
}

export default AtmNavigationLink
