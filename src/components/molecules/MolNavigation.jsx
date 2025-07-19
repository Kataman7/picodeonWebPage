import React from 'react'
import AtmNavigationLink from '../atoms/AtmNavigationLink'

const MolNavigation = () => {
  const navItems = [
    { href: "#viewer", text: "Découvrir" },
    { href: "#buy", text: "Acheter" },
    { href: "#footer", text: "Contact" }
  ]

  return (
    <nav>
      <ul className="flex justify-center space-x-6 py-2">
        {navItems.map((item, index) => (
          <li key={index}>
            <AtmNavigationLink href={item.href} text={item.text} />
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MolNavigation
