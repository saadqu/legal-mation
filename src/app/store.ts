import { configureStore } from '@reduxjs/toolkit';
import authorReducer from '../features/Authors/authorSlice';
import bookReducer from '../features/Books/bookSlice';
import { authorsApiSlice } from '../features/api/authorsApiSlice';
import { booksApiSlice } from '../features/api/booksApiSlice';

export const store = configureStore({
  reducer: {
    authors: authorReducer,
    books: bookReducer,
    [authorsApiSlice.reducerPath]: authorsApiSlice.reducer,
    [booksApiSlice.reducerPath]: booksApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authorsApiSlice.middleware,
      booksApiSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
