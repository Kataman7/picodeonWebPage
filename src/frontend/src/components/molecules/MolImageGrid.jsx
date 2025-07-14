import React from 'react'
import AtmImage from '../atoms/AtmImage'
import { useTranslation } from '../../hooks/useTranslation'

const MolImageGrid = () => {
  const { t } = useTranslation()

  const galleryImages = [
    {
      src: "/assets/images/picodeon_alu1.jpg",
      alt: t('picodeon.gallery.alt1')
    },
    {
      src: "/assets/images/picodeon_alu3.png",
      alt: t('picodeon.gallery.alt3')
    },
    {
      src: "/assets/images/picodeon_alu2.jpg",
      alt: t('picodeon.gallery.alt2')
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {galleryImages.map((image, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
              <AtmImage 
                src={image.src} 
                alt={image.alt}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MolImageGrid
