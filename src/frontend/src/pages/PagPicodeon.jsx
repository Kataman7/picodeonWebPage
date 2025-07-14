import React from 'react'
import OrgPicodeonHeader from '../components/organisms/OrgPicodeonHeader'
import MolHeroSection from '../components/molecules/MolHeroSection'
import OrgPicodeonMainContent from '../components/organisms/OrgPicodeonMainContent'
import MolBannerSection from '../components/molecules/MolBannerSection'
import AtmThreeAnimatedViewer from '../components/atoms/AtmThreeAnimatedViewer'
import MolPurchaseSection from '../components/molecules/MolPurchaseSection'
import MolImageGrid from '../components/molecules/MolImageGrid'
import OrgPicodeonFooter from '../components/organisms/OrgPicodeonFooter'

const PagPicodeon = () => {
  return (
    <div className="picodeon-page">
      <OrgPicodeonHeader />
      <MolHeroSection />
      <OrgPicodeonMainContent />
      <MolBannerSection />
      <AtmThreeAnimatedViewer />
      <MolPurchaseSection />
      <MolImageGrid />
      <OrgPicodeonFooter />
    </div>
  )
}

export default PagPicodeon
