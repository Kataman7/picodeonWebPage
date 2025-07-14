import React from 'react'
import AtmThreeViewer from '../atoms/AtmThreeViewer'
import MolTextContent from './MolTextContent'

const MolMainContent = () => {
  const leftContent = [
    "Le **PicoDeon** est un contrôleur MIDI compact et silencieux, inspiré des **claviers chromatiques d'accordéon**. Il n'écrit pas de texte : chaque touche envoie un signal MIDI, permettant de jouer avec n'importe quel synthétiseur ou logiciel audio.",
    "Grâce à sa **disposition en colonnes**, il offre une expérience de jeu fluide, intuitive et expressive. Il s'adresse autant aux accordéonistes qu'aux musiciens curieux d'explorer une interface musicale originale.",
    "Le PicoDeon est assemblé à la main et livré **prêt à l'emploi** avec un **étui de transport** et un **câble USB-C**. Il fonctionne immédiatement avec tous les systèmes compatibles MIDI.",
    "Le **firmware est mis à jour régulièrement**, et certaines touches sont prévues pour accueillir de futures fonctionnalités. Le projet et les firmwares sont disponibles sur le **GitHub du créateur**."
  ]

  const rightContent = [
    "Le PicoDeon existe en deux versions : l'une avec un **châssis en aluminium** (blanche), l'autre en **FR4** (noire), montée avec **entretoises et vis en laiton**. Ces deux modèles sont également robustes et pensés pour durer.",
    "Il est équipé de **switches Outemu White Silent**, silencieux et réactifs. La version **hot-swap** permet de les retirer sans soudure, et accepte tous les **switches MX compatibles**.",
    "Les **keycaps en PBT** fournis sont également remplaçables par n'importe quel **keycap MX**, offrant une personnalisation complète, aussi bien visuelle que tactile.",
    "Avec son port **USB-C** et un **firmware libre et évolutif**, le PicoDeon s'intègre facilement à tout environnement de production musicale."
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Left text content */}
      <div className="lg:order-1 space-y-6 text-gray-700 leading-relaxed">
        <MolTextContent paragraphs={leftContent} />
      </div>
      
      {/* Center 3D viewer */}
      <div className="lg:order-2 flex justify-center">
        <div className="w-full max-w-md h-96 md:h-[500px]">
          <AtmThreeViewer />
        </div>
      </div>
      
      {/* Right text content */}
      <div className="lg:order-3 space-y-6 text-gray-700 leading-relaxed">
        <MolTextContent paragraphs={rightContent} />
      </div>
    </div>
  )
}

export default MolMainContent
