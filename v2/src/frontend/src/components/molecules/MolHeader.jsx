import React from 'react'
import AtmTitle from '../atoms/AtmTitle'
import MolNavigation from './MolNavigation'

const MolHeader = () => {
  return (
    <div className="text-center py-12">
      <AtmTitle size="large" color="white">Le PicoDeon</AtmTitle>
      <MolNavigation />
    </div>
  )
}

export default MolHeader
