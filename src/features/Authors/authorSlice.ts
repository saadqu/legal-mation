import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Author } from '../../interface';
import { authorsApiSlice } from '../api/authorsApiSlice';

interface AuthorState {
  authors: Author[];
}

const initialState: AuthorState = {
  authors: [],
};

const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setAuthors(state, action: PayloadAction<Author[]>) {
      state.authors = action.payload;
    },
    addAuthor(state, action: PayloadAction<Author>) {
      state.authors.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authorsApiSlice.endpoints.getAuthors.matchFulfilled,
      (state, { payload }) => {
        state.authors = payload.authors;
      }
    );
  },
});

export const { setAuthors, addAuthor } = authorSlice.actions;

export default authorSlice.reducer;
