import { baseApi } from '@/redux/api/baseApi';

const clothesApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getWinterClothes: builder.query({
                              query: () => ({
                                        url: '/clothes/all',
                                        method: 'GET',
                              }),
                              providesTags: ['clothes'],
                    }),
                    getWinterClothById: builder.query({
                              query: (id: string) => ({
                                        url: `/clothes/single?clothId=${id}`,
                                        method: 'GET',
                              }),
                    }),
                    createWinterCloth: builder.mutation({
                              query: (clothInfo) => ({
                                        url: '/clothes/create',
                                        method: 'POST',
                                        body: clothInfo,
                              }),
                              invalidatesTags: ['clothes'],
                    }),
                    deleteWinterCloth: builder.mutation({
                              query: (id: string) => ({
                                        url: `/clothes/delete?id=${id}`,
                                        method: 'DELETE',
                              }),
                              invalidatesTags: ['clothes'],
                    }),
                    updateWinterCloth: builder.mutation({
                              query: (clothInfo) => ({
                                        url: '/clothes/update',
                                        method: 'PUT',
                                        body: clothInfo,
                              }),
                              invalidatesTags: (_result, _error, arg) => ([
                                        { type: 'clothes', id: arg._id },
                              ]),
                    }),
          }),
});

export const {
          useGetWinterClothesQuery,
          useGetWinterClothByIdQuery,
          useCreateWinterClothMutation,
          useDeleteWinterClothMutation,
          useUpdateWinterClothMutation,
} = clothesApi;