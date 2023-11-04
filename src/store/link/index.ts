import { LINKS_URL } from '@/configs/constants';
import { apiSlice } from '../api';

export const linkSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLinks: builder.query({
      query: ({ profile, page, limit }) => ({
        url: LINKS_URL,
        params: { profile, page, limit },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Link'],
    }),
    getLink: builder.query({
      query: (id) => ({
        url: `${LINKS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createLink: builder.mutation({
      query(body) {
        return {
          url: LINKS_URL,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Link'],
    }),
    updateLink: builder.mutation({
      query: ({ id, body }) => ({
        url: `${LINKS_URL}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Link'],
    }),
    deleteLink: builder.mutation({
      query: (id) => ({
        url: `${LINKS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Link'],
    }),
  }),
});

export const {
  useGetLinksQuery,
  useGetLinkQuery,
  useCreateLinkMutation,
  useUpdateLinkMutation,
  useDeleteLinkMutation,
} = linkSlice;
