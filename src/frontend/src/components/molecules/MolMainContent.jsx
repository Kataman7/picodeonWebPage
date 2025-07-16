import React from 'react'
import AtmThreeViewer from '../atoms/AtmThreeViewer'
import MolTextContent from './MolTextContent'
import { useTranslation } from '../../hooks/useTranslation'

const MolMainContent = () => {
  const { t } = useTranslation()

  const allContent = [
    t('picodeon.description'),
    t('picodeon.features.intuitive'),
    t('picodeon.features.readyToUse'),
    t('picodeon.features.firmware'),
    t('picodeon.features.versions'),
    t('picodeon.features.switches'),
    t('picodeon.features.keycaps'),
    t('picodeon.features.connectivity')
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left text content - all content */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <MolTextContent paragraphs={allContent} />
      </div>
      
      {/* Right 3D viewer */}
      <div className="flex justify-center">
        <div className="w-full h-[90vh] max-w-2xl max-h-[780px]">
          <AtmThreeViewer />
        </div>
      </div>
    </div>
  )
}

export default MolMainContent
