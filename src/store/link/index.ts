import { LINKS_URL } from '@/core/utils/constants';
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
      query: (linkId) => ({
        url: `${LINKS_URL}/${linkId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createLink: builder.mutation({
      query: () => ({
        url: `${LINKS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Link'],
    }),
    updateLink: builder.mutation({
      query: (data) => ({
        url: `${LINKS_URL}/${data.linkId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Link'],
    }),
    deleteLink: builder.mutation({
      query: (linkId) => ({
        url: `${LINKS_URL}/${linkId}`,
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
