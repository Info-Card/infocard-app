import { LINKS_URL } from '@/core/utils/constants';
import { apiSlice } from '../api';

export const tagSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: LINKS_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Tag'],
    }),
    getTag: builder.query({
      query: (tagId) => ({
        url: `${LINKS_URL}/${tagId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createTag: builder.mutation({
      query: () => ({
        url: `${LINKS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Tag'],
    }),
    updateTag: builder.mutation({
      query: (data) => ({
        url: `${LINKS_URL}/${data.tagId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Tag'],
    }),
    deleteTag: builder.mutation({
      query: (tagId) => ({
        url: `${LINKS_URL}/${tagId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tag'],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetTagQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagSlice;
