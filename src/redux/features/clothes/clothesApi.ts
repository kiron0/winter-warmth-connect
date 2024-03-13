import { baseApi } from '@/redux/api/baseApi';

const clothesApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getWinterClothes: builder.query({
                              query: () => ({
                                        url: '/clothes/all',
                                        method: 'GET',
                              }),
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
                    }),
                    deleteWinterCloth: builder.mutation({
                              query: (id: string) => ({
                                        url: `/clothes/delete?id=${id}`,
                                        method: 'DELETE',
                              }),
                    }),
                    updateWinterCloth: builder.mutation({
                              query: (clothInfo) => ({
                                        url: '/clothes/update',
                                        method: 'PUT',
                                        body: clothInfo,
                              }),
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