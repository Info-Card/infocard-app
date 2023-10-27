import { PROFILES_URL } from '@/core/utils/constants';
import { apiSlice } from '../api';

export const profileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfiles: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${PROFILES_URL}/my-profiles`,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Profile'],
    }),
    getProfile: builder.query({
      query: (profileId) => ({
        url: `${PROFILES_URL}/${profileId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProfile: builder.mutation({
      query: () => ({
        url: `${PROFILES_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Profile'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${PROFILES_URL}/${data.profileId}`,
        method: 'PUT',
        body: data,
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
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = profileSlice;
