import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import constants from '../../constants';
import { Book, BookResponse, SingleBook, UpdateBookRequest } from '../../interface';

const URL_PATH = '/books';

export const booksApiSlice = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/${constants.NAMESPACE}` }),
  endpoints: (builder) => ({
    getBooks: builder.query<BookResponse, void>({
      query: () => URL_PATH,
    }),
    getBook: builder.query<SingleBook, number | string>({
      query: (id) => `${URL_PATH}/${id}`,
    }),
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (author: Book) => ({
        url: URL_PATH,
        method: 'POST',
        body: author,
      }),
    }),
    updateBook: builder.mutation<Book, UpdateBookRequest>({
      query: ({ book, id }) => ({
        url: `${URL_PATH}/${id}`,
        method: 'PATCH',
        body: book,
      }),
    }),
    deleteBook: builder.mutation<Book, number | string>({
      query: (id) => ({
        url: `${URL_PATH}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApiSlice;
