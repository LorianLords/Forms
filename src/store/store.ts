import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice.ts';
export const store = configureStore({
  reducer: {
    forms: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
