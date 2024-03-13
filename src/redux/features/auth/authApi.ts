import { baseApi } from '@/redux/api/baseApi';

const authApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getMe: builder.query({
                              query: () => ({
                                        url: '/users/me'
                              }),
                    }),
                    login: builder.mutation({
                              query: (userInfo) => ({
                                        url: '/auth/login',
                                        method: 'POST',
                                        body: userInfo,
                              }),
                    }),
                    register: builder.mutation({
                              query: (userInfo) => ({
                                        url: '/auth/register',
                                        method: 'POST',
                                        body: userInfo,
                              }),
                    }),
          }),
});

export const { useGetMeQuery, useLoginMutation, useRegisterMutation } = authApi;