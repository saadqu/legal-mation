
import { configureStore } from '@reduxjs/toolkit';
import authorReducer from '../features/Authors/authorSlice';
import bookReducer from '../features/Books/bookSlice';

export const store = configureStore({
  reducer: {
    authors: authorReducer,
    books: bookReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;