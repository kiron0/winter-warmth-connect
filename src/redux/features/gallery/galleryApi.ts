import { baseApi } from '@/redux/api/baseApi';

const galleryApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getGalleryImages: builder.query({
                              query: () => ({
                                        url: '/gallery/all',
                                        method: 'GET',
                              }),
                              providesTags: ['gallery'],
                    }),
                    createGalleryImage: builder.mutation({
                              query: (galleryInfo) => ({
                                        url: '/gallery/create',
                                        method: 'POST',
                                        body: galleryInfo,
                              }),
                              invalidatesTags: ['gallery'],
                    }),
                    deleteGalleryImage: builder.mutation({
                              query: (id: string) => ({
                                        url: `/gallery/delete?id=${id}`,
                                        method: 'DELETE',
                              }),
                              invalidatesTags: ['gallery'],
                    }),
          }),
});

export const {
          useGetGalleryImagesQuery,
          useCreateGalleryImageMutation,
          useDeleteGalleryImageMutation,
} = galleryApi;