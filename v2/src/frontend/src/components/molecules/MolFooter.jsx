import React from 'react'
import AtmNavigationLink from '../atoms/AtmNavigationLink'
import AtmCopyright from '../atoms/AtmCopyright'

const MolFooter = () => {
  const footerLinks = [
    { href: "#discover", text: "Découvrir" },
    { href: "#buy", text: "Acheter" },
    { href: "#", text: "Discord" },
    { href: "#", text: "GitHub" }
  ]

  const FooterLink = ({ href, text }) => (
    <a 
      className="text-stone-800 hover:underline transition-all duration-200 font-tilt-neon" 
      href={href}
    >
      {text}
    </a>
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-4 opacity-80">
        <FooterLink href="mailto:contact@picokeebs.com" text="contact@picokeebs.com" />
      </div>
      <div className="flex flex-wrap justify-center gap-8 mb-4">
        {footerLinks.map((link, index) => (
          <FooterLink key={index} href={link.href} text={link.text} />
        ))}
      </div>
      <AtmCopyright>
        © 2025 PicoKeebs. Tous droits réservés.
      </AtmCopyright>
    </div>
  )
}

export default MolFooter
