import React from 'react'
import AtmStripeBuyButton from '../atoms/AtmStripeBuyButton'

const MolPurchaseSection = () => {
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
            <li className="mb-1">• Le PicoDeon (non hotswap)</li>
            <li className="mb-1">• L'étui de transport rigide</li>
            <li className="mb-1">• Un câble USB-C</li>
            <li className="mb-1 text-green-600 font-bold">🚚 Frais de port gratuits</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-6 text-stone-600 text-sm opacity-70">
        Paiement sécurisé Stripe. Vous recevrez un mail de confirmation une fois que le vendeur
        aura vu et validé la commande.
      </div>
    </div>
  )
}

export default MolPurchaseSection
