import React from 'react'

const parseMarkdown = (text) => {
  if (!text) return text
  
  // Parse **text** pour <strong>text</strong>
  const parts = text.split(/(\*\*.*?\*\*)/)
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Enlève les ** et retourne du texte en gras
      const boldText = part.slice(2, -2)
      return <strong key={index}>{boldText}</strong>
    }
    return part
  })
}

const AtmMarkdownText = ({ children }) => {
  return <>{parseMarkdown(children)}</>
}

export default AtmMarkdownText
