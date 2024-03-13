import { baseApi } from '@/redux/api/baseApi';

const analyticsApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getAnalytics: builder.query({
                              query: () => ({
                                        url: '/analytics',
                              }),
                    }),
          }),
});

export const { useGetAnalyticsQuery } = analyticsApi;