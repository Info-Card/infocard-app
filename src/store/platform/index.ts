import { PLATFORMS_URL } from '@/core/utils/constants';
import { apiSlice } from '../api';

export const platformSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlatform: builder.query({
      query: (platformId) => ({
        url: `${PLATFORMS_URL}/${platformId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetPlatformQuery } = platformSlice;
