import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import constants from '../../constants';
import { Author, AuthorResponse, UpdateAuthorRequest } from '../../interface';

const URL_PATH = '/authors';

export const authorsApiSlice = createApi({
  reducerPath: 'authorsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/${constants.NAMESPACE}` }),
  endpoints: (builder) => ({
    getAuthors: builder.query<AuthorResponse, void>({
      query: () => URL_PATH,
    }),
    getAuthor: builder.query<{ authors: Author }, number | string>({
      query: (id) => `${URL_PATH}/${id}`,
    }),
    addAuthor: builder.mutation<Author, Partial<Author>>({
      query: (author: Author) => ({
        url: URL_PATH,
        method: 'POST',
        body: author,
      }),
    }),
    updateAuthor: builder.mutation<Author, UpdateAuthorRequest>({
      query: ({ author, id }) => ({
        url: `${URL_PATH}/${id}`,
        method: 'PATCH',
        body: author,
      }),
    }),
    deleteAuthor: builder.mutation<Author, number | string>({
      query: (id) => ({
        url: `${URL_PATH}/${id}`,
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
