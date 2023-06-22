import { configureStore } from '@reduxjs/toolkit'
import { finishApi,  } from '../Api/Common'
import { supplyCategoryApi,  } from '../Api/Common'
import modalReducer from '../Slices/Modal/ModalSlice'


export const store = configureStore({
  reducer: {
    [supplyCategoryApi.reducerPath]: supplyCategoryApi.reducer,
    modal: modalReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(supplyCategoryApi.middleware),

  reducer: {
      [finishApi.reducerPath]: finishApi.reducer,
      modal: modalReducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(finishApi.middleware)
})
