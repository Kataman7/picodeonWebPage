import { useState, useEffect } from 'react'

// Fichiers de traductions
import fr from '../locales/fr.json'
import en from '../locales/en.json'

const translations = {
  fr,
  en
}

// Détection automatique de la langue du navigateur
const getDefaultLanguage = () => {
  const browserLang = navigator.language.split('-')[0]
  return translations[browserLang] ? browserLang : 'fr' // français par défaut
}

// État global pour la langue (pour forcer le re-render de tous les composants)
let globalLanguage = localStorage.getItem('language') || getDefaultLanguage()
const listeners = new Set()

const notifyListeners = () => {
  listeners.forEach(listener => listener())
}

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState(globalLanguage)

  useEffect(() => {
    const listener = () => {
      setCurrentLanguage(globalLanguage)
    }
    
    listeners.add(listener)
    
    return () => {
      listeners.delete(listener)
    }
  }, [])

  // Fonction pour récupérer une traduction
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[currentLanguage]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key // Retourne la clé si la traduction n'existe pas
  }

  // Fonction pour changer la langue
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      globalLanguage = lang
      localStorage.setItem('language', lang)
      notifyListeners()
    }
  }

  return {
    t,
    currentLanguage,
    changeLanguage,
    availableLanguages: Object.keys(translations)
  }
}
