import React from 'react'
import AtmTitle from '../atoms/AtmTitle'
import AtmLanguageSwitcher from '../atoms/AtmLanguageSwitcher'
import MolNavigation from './MolNavigation'
import { useTranslation } from '../../hooks/useTranslation'

const MolHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="relative">
      {/* Sélecteur de langue en haut à droite */}
      <div className="absolute top-4 right-4">
        <AtmLanguageSwitcher />
      </div>
      
      <div className="text-center py-12">
        <AtmTitle size="large" color="white">{t('picodeon.title')}</AtmTitle>
        <MolNavigation />
      </div>
    </div>
  )
}

export default MolHeader
