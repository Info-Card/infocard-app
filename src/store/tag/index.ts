import { TAGS_URL } from '@/configs/constants';
import { apiSlice } from '../api';

export const tagSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyTags: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${TAGS_URL}/my-tags`,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Tag'],
    }),
    getTag: builder.query({
      query: (tagId) => ({
        url: `${TAGS_URL}/${tagId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createTag: builder.mutation({
      query: () => ({
        url: `${TAGS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Tag'],
    }),
    updateTag: builder.mutation({
      query: ({ id, body }) => ({
        url: `${TAGS_URL}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Tag'],
    }),
    deleteTag: builder.mutation({
      query: (tagId) => ({
        url: `${TAGS_URL}/${tagId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tag'],
    }),
    linkTag: builder.query({
      query: (tagId) => ({
        url: `${TAGS_URL}/link/${tagId}`,
      }),
    }),
    unLinkTag: builder.query({
      query: (tagId) => ({
        url: `${TAGS_URL}/unlink/${tagId}`,
      }),
    }),
  }),
});

export const {
  useGetMyTagsQuery,
  useGetTagQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
  useLazyLinkTagQuery,
  useLazyUnLinkTagQuery,
} = tagSlice;
