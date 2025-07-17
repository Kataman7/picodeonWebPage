import React from 'react'
import { useTranslation } from '../../hooks/useTranslation'

const AtmGoogleForm = () => {
  const { t } = useTranslation()
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-4 py-4">
      <div className="text-center text-stone-700 text-base md:text-lg mb-2">
        {t('picodeon.wishlist.explanation')}
      </div>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLScfnDtxE776MoqA1KyLX3CAkz_gZBlQBujhoET4o6zXONTAxg/viewform?usp=dialog"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition-all duration-200 text-lg font-tilt-neon"
      >
        {t('picodeon.wishlist.button')}
      </a>
    </div>
  )
}

export default AtmGoogleForm