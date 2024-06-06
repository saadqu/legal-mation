import { configureStore } from '@reduxjs/toolkit';
import authorReducer from '../features/Authors/authorSlice';
import bookReducer from '../features/Books/bookSlice';
import { authorsApiSlice } from '../features/api/authorsApiSlice';

export const store = configureStore({
  reducer: {
    authors: authorReducer,
    books: bookReducer,
    [authorsApiSlice.reducerPath]: authorsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authorsApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
