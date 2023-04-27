import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ['User'],
    }),
    getProducts: build.query({
      query: () => {
        const params = { populate: 'productId', limit: 50 }
        return { url: `client/products/stats`, params }
      },
      providesTags: ['Products'],
    }),
    getCustomers: build.query({
      query: () => {
        const params = { limit: 50 }
        return { url: `client/customers`, params }
      },
      providesTags: ['Customers'],
    }),
    getTransactions: build.query({
      query: () => {
        const params = { limit: 20, populate: 'products userId' }
        return { url: `client/transactions`, params }
      },
      providesTags: ['Customers'],
    }),
  }),
})
export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
} = api
