import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userSlice from './features/userSlice';
import i18nSlice from './features/i18nSlice';
import globalSlice from './features/globalSlice';

const store = configureStore({
  reducer: {
    global: globalSlice,
    user: userSlice,
    i18n: i18nSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// 计算dispatch 的类型
export type AppDispatch = typeof store.dispatch;

// 全局hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
