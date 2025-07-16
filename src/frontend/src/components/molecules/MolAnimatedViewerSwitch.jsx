import React, { useEffect, useState } from 'react'
import AtmThreeAnimatedViewer from '../atoms/AtmThreeAnimatedViewer'
import AtmThreeAnimatedViewerMobile from '../atoms/AtmThreeAnimatedViewerMobile'

const MolAnimatedViewerSwitch = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 800px)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile ? <AtmThreeAnimatedViewerMobile /> : <AtmThreeAnimatedViewer />
}

export default MolAnimatedViewerSwitch
