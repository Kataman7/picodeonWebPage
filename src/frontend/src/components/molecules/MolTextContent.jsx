import React from 'react'
import AtmMarkdownText from '../atoms/AtmMarkdownText'

const MolTextContent = ({ paragraphs }) => {
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          <AtmMarkdownText>{paragraph}</AtmMarkdownText>
        </p>
      ))}
    </>
  )
}

export default MolTextContent
