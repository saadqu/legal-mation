import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Author } from '../../interface';

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
});

export const { setAuthors, addAuthor } = authorSlice.actions;

export default authorSlice.reducer;
