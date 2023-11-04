import { PRODUCTS_URL } from '@/configs/constants';
import { apiSlice } from '../api';

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ profile, page, limit }) => ({
        url: PRODUCTS_URL,
        params: { profile, page, limit },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query(body) {
        return {
          url: PRODUCTS_URL,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productSlice;
