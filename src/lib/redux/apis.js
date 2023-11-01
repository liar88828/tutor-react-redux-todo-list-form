import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi( {
  reducerPath: 'api',
  tagTypes: [ 'Post', 'User' ],
  baseQuery: fetchBaseQuery(
    { baseUrl: 'http://localhost:3500' } ),
  endpoints: builder => ( {} )

} )

