import { RootState, AppDispatch } from './store'
import { useSelector as useS, useDispatch as useD, TypedUseSelectorHook } from 'react-redux'

export const useDispatch = () => useD<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useS