import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    // Pour l'instant pas de slices, mais on garde Redux pour une évolution future
  },
})

export default store
