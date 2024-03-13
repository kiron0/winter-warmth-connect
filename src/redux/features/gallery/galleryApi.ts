import { baseApi } from '@/redux/api/baseApi';

const galleryApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getGalleryImages: builder.query({
                              query: () => ({
                                        url: '/gallery/all',
                                        method: 'GET',
                              }),
                    }),
                    createGalleryImage: builder.mutation({
                              query: (clothInfo) => ({
                                        url: '/gallery/create',
                                        method: 'POST',
                                        body: clothInfo,
                              }),
                    }),
                    deleteGalleryImage: builder.mutation({
                              query: (id: string) => ({
                                        url: `/gallery/delete?id=${id}`,
                                        method: 'DELETE',
                              }),
                    }),
          }),
});

export const {
          useGetGalleryImagesQuery,
          useCreateGalleryImageMutation,
          useDeleteGalleryImageMutation,
} = galleryApi;