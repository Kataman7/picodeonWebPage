import React from 'react'
import AtmStripeBuyButton from '../atoms/AtmStripeBuyButton'
import { useTranslation } from '../../hooks/useTranslation'

const MolPurchaseSection = () => {
  const { t } = useTranslation()

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="flex-1 min-w-[220px] flex justify-center">
          <AtmStripeBuyButton 
            buyButtonId="buy_btn_1RaGxtJZfZQQklYe8QtfVsek"
            publishableKey="pk_live_51Oi2OuJZfZQQklYeXdoDS7KYnXvXtZlKJeorFfYBsWvfnNyPyG7JORdHB1dgX0PRmyUJxjhiw3VbtPVpZqmqomf800mFVcl4Ih"
          />
        </div>
        <div className="flex-1 min-w-[220px]">
          <ul className="text-lg leading-relaxed text-stone-800 font-tilt-neon">
            <li className="mb-1">• {t('picodeon.purchase.items.picodeon')}</li>
            <li className="mb-1">• {t('picodeon.purchase.items.case')}</li>
            <li className="mb-1">• {t('picodeon.purchase.items.cable')}</li>
            <li className="mb-1 text-green-600 font-bold">{t('picodeon.purchase.items.shipping')}</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-6 text-stone-600 text-sm opacity-70">
        {t('picodeon.purchase.payment')}
      </div>
    </div>
  )
}

export default MolPurchaseSection
