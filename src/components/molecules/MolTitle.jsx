import React from 'react'

const MolTitle = ({ text, level = 1, className = "" }) => {
  const baseClasses = "font-tilt-neon"
  const levelClasses = {
    1: "text-6xl my-12",
    2: "text-4xl my-8",
    3: "text-2xl my-4"
  }
  
  const Tag = `h${level}`
  
  return (
    <Tag className={`${baseClasses} ${levelClasses[level]} ${className}`}>
      {text}
    </Tag>
  )
}

export default MolTitle
