import React from 'react'
import AtmImage from '../atoms/AtmImage'

const MolImageGrid = () => {
  const galleryImages = [
    {
      src: "/assets/images/picodeon_alu1.jpg",
      alt: "Photo 1"
    },
    {
      src: "/assets/images/picodeon_alu3.png",
      alt: "Photo 3"
    },
    {
      src: "/assets/images/picodeon_alu2.jpg",
      alt: "Photo 2"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {galleryImages.map((image, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
              <AtmImage 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MolImageGrid
