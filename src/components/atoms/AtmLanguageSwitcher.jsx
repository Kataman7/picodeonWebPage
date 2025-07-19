import React from 'react'
import { useTranslation } from '../../hooks/useTranslation'

const AtmLanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, availableLanguages } = useTranslation()

  const languageConfig = {
    fr: { 
      flag: '/assets/images/fr.svg', 
      label: 'FR'
    },
    en: { 
      flag: '/assets/images/uk.svg', 
      label: 'EN'
    }
  }

  return (
    <div className="flex items-center space-x-2">
      {availableLanguages.map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`relative flex items-center justify-center w-12 h-8 rounded-md overflow-hidden transition-all duration-200 border-2 ${
            currentLanguage === lang
              ? 'border-blue-400 shadow-lg'
              : 'border-white border-opacity-30 hover:border-opacity-50'
          }`}
        >
          <img 
            src={languageConfig[lang]?.flag}
            alt={`${lang} flag`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  )
}

export default AtmLanguageSwitcher
