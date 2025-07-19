import React, { useEffect } from 'react'

const AtmButton = ({ buyButtonId, publishableKey }) => {
  useEffect(() => {
    // Load Stripe buy button script if not already loaded
    if (!document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://js.stripe.com/v3/buy-button.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  return (
    <stripe-buy-button 
      buy-button-id={buyButtonId}
      publishable-key={publishableKey}
    />
  )
}

export default AtmButton
