import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import constants from '../../constants';
import { Author, AuthorResponse, UpdateAuthorRequest } from '../../interface';

// Define our single API slice object
export const authorsApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `/${constants.NAMESPACE }`}),
  endpoints: (builder) => ({
    getAuthors: builder.query<AuthorResponse, void>({
      query: () => '/authors',
    }),
    getAuthor: builder.query<{ authors: Author }, number | string>({
      query: (id) => `/authors/${id}`,
    }),
    addAuthor: builder.mutation<Author, Partial<Author>>({
      query: (author: Author) => ({
        url: '/authors',
        method: 'POST',
        body: author,
      }),
    }),
    updateAuthor: builder.mutation<Author, UpdateAuthorRequest>({
      query: ({ author, id }) => ({
        url: `/authors/${id}`,
        method: 'PATCH',
        body: author,
      }),
    }),
    deleteAuthor: builder.mutation<Author, number | string>({
        query: (id) => ({
          url: `/authors/${id}`,
          method: 'DELETE',
        }),
      }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetAuthorsQuery,
  useGetAuthorQuery,
  useAddAuthorMutation,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
} = authorsApiSlice;
