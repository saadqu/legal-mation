import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../interface';
import { booksApiSlice } from '../api/booksApiSlice';

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [],
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    addBooks(state, action: PayloadAction<Book>) {
      state.books.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      booksApiSlice.endpoints.getBooks.matchFulfilled,
      (state, { payload }) => {
        state.books = payload.books;
      }
    );
  },
});

export const { setBooks, addBooks } = bookSlice.actions;

export default bookSlice.reducer;
