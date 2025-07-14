import React from 'react'
import MolTitle from './MolTitle'
import MolNavigation from './MolNavigation'

const MolHeaderSection = () => {
  return (
    <>
      <MolTitle text="Le PicoDeon" level={1} className="text-white" />
      <MolNavigation />
    </>
  )
}

export default MolHeaderSection
