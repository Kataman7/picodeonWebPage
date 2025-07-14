import React from 'react'
import AtmTextBlock from '../atoms/AtmTextBlock'
import AtmMarkdownText from '../atoms/AtmMarkdownText'
import { useTranslation } from '../../hooks/useTranslation'

const MolBannerSection = () => {
  const { t } = useTranslation()

  return (
    <div className="w-full bg-stone-800 py-2">
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <AtmTextBlock size="large" color="white" align="center">
          <AtmMarkdownText>{t('picodeon.banner.description')}</AtmMarkdownText>
        </AtmTextBlock>
      </div>
    </div>
  )
}

export default MolBannerSection
