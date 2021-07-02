import { configureStore } from '@reduxjs/toolkit'
import storageReducer from './storageSlice'
import ankiReducer from "./ankiSlice"
const store = configureStore({
  reducer: {
    storage:storageReducer,
    anki:ankiReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch