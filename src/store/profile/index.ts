import { PROFILES_URL } from '@/configs/constants';
import { apiSlice } from '../api';
import { toFormData } from 'axios';

export const profileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfiles: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${PROFILES_URL}/my-profiles`,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
    }),
    getProfile: builder.query({
      query: (profileId) => ({
        url: `${PROFILES_URL}/${profileId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getPublicProfile: builder.query({
      query: (profileId) => ({
        url: `${PROFILES_URL}/public/${profileId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProfile: builder.mutation({
      query: (body) => ({
        url: `${PROFILES_URL}`,
        method: 'POST',
        body: toFormData(body),
      }),
      invalidatesTags: ['Profile'],
    }),
    updateProfile: builder.mutation({
      query: ({ id, body }) => ({
        url: `${PROFILES_URL}/${id}`,
        method: 'PATCH',
        body: toFormData(body),
      }),
      invalidatesTags: ['Profile'],
    }),
    updateVideos: builder.mutation({
      query: ({ id, body }) => ({
        url: `${PROFILES_URL}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
    deleteProfile: builder.mutation({
      query: (profileId) => ({
        url: `${PROFILES_URL}/${profileId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetMyProfilesQuery,
  useGetProfileQuery,
  useGetPublicProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUpdateVideosMutation,
} = profileSlice;
