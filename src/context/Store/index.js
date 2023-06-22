import { configureStore } from '@reduxjs/toolkit'
import { supplyCategoryApi } from '../Api/Common'

import modalReducer from '../Slices/Modal/ModalSlice'

export const store = configureStore({
  reducer: {
    [supplyCategoryApi.reducerPath]: supplyCategoryApi.reducer,
    modal: modalReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(supplyCategoryApi.middleware)
})
