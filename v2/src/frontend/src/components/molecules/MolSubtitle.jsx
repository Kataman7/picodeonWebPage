import React from 'react'

const MolSubtitle = ({ text, className = "" }) => {
  return (
    <p className={`text-4xl text-stone-800 font-light my-16 font-tilt-neon ${className}`}>
      {text}
    </p>
  )
}

export default MolSubtitle
