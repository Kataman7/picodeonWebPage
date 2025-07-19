import React from 'react'

const MolFooterLinks = ({ links }) => {
  const FooterLink = ({ href, text }) => (
    <a 
      className="text-stone-800 hover:underline transition-all duration-200 font-tilt-neon" 
      href={href}
    >
      {text}
    </a>
  )

  return (
    <div className="flex flex-wrap justify-center gap-8 mb-4">
      {links.map((link, index) => (
        <FooterLink key={index} href={link.href} text={link.text} />
      ))}
    </div>
  )
}

export default MolFooterLinks
