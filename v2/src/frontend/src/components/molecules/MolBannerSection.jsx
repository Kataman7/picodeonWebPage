import React from 'react'
import AtmTextBlock from '../atoms/AtmTextBlock'

const MolBannerSection = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <AtmTextBlock size="large" color="white" align="center">
        Le PicoDeon repose sur une conception modulaire et durable, pensée pour être <strong>facilement démontable et
        réparable</strong>. Il est composé d'un <strong>PCB principal</strong>, d'un <strong>microcontrôleur RP2040
        Zero</strong>, d'une <strong>plaque supérieure</strong> et d'un <strong>socle vissé</strong>, l'ensemble étant
        maintenu solidement par des <strong>entretoises (standoffs)</strong> en laiton. Ce montage en "sandwich" assure à
        la fois rigidité, simplicité d'assemblage et longévité. En cas de besoin, chaque composant peut être remplacé ou
        ajusté avec un minimum d'outillage, garantissant ainsi un instrument fait pour durer.
      </AtmTextBlock>
    </div>
  )
}

export default MolBannerSection
