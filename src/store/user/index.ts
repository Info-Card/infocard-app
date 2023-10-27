import { AUTH_URL, USERS_URL } from '@/core/utils/constants';
import { apiSlice } from '../api';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (data: any) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data: any) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: `${AUTH_URL}/me`,
      }),
      keepUnusedDataFor: 5,
    }),
    getUser: builder.query({
      query: (id: string) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data: any) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetMeQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} = userSlice;
