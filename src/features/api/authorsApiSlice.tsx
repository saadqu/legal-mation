import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import constants from '../../constants'
import { AuthorResponse } from '../../interface'

// Define our single API slice object
export const authorsApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: constants.NAMESPACE }),
  endpoints: builder => ({
    getAuthors: builder.query<AuthorResponse, void>({
      query: () => '/authors'
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetAuthorsQuery } = authorsApiSlice