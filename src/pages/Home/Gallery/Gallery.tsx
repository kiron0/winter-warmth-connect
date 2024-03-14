import Loading from "@/components/loading";
import ScrollToTop from "@/components/scroll-to-top";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetGalleryImagesQuery } from "@/redux/features/gallery/galleryApi";
import { TGallery } from "@/types";
import { useState } from "react";
import { Link } from "react-router-dom";
import GalleryModal from "./GalleryModal";

interface GalleryProps {
          isResetStyle?: boolean;
          isRenderedAll?: boolean;
          className?: string;
          hiddenViewMore?: boolean;
          scrollToTop?: boolean;
}

export default function Gallery({ isResetStyle, isRenderedAll, className, hiddenViewMore, scrollToTop }: GalleryProps) {
          const [selectedImage, setSelectedImage] = useState<string | null>(null);

          const { data, isLoading } = useGetGalleryImagesQuery(undefined);

          const gallery = data?.data as TGallery[];

          return (
                    <div className={`${isResetStyle ? "" : "pb-10 md:px-12 my-10 px-6 md:my-16 py-12"}`}>
                              <div className="pb-12">
                                        <h1 className='text-2xl md:text-3xl lg:text-4xl py-4 text-center font-lemonMilk text-primary'>Gallery</h1>
                                        <p className='w-full mx-auto text-base md:text-lg text-center font-monospaceTypewriter text-primary px-1'>
                                                  Be amazed by the transformative impact we're making in the lives of those struggling with winter clothing insecurity. Check out our gallery now.
                                        </p>
                              </div>
                              {
                                        isLoading ? (
                                                  <Loading />
                                        ) : (
                                                  <>
                                                            {
                                                                      gallery?.length > 0 ? (
                                                                                <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", className)}>
                                                                                          {
                                                                                                    gallery?.slice(0, isRenderedAll ? gallery.length : 6)?.map((item) => (
                                                                                                              <img key={item?._id} src={item?.image?.url} alt={item?.image?.url} draggable={false} className='w-full h-60 object-cover object-center rounded-3xl border-4 shadow-md select-none sm:cursor-pointer'
                                                                                                                        onClick={() => setSelectedImage(item?.image?.url)}
                                                                                                              />
                                                                                                    ))
                                                                                          }
                                                                                </div>
                                                                      ) : (
                                                                                <div className='flex items-center justify-center w-full h-96 bg-gray-100 rounded-3xl shadow-md select-none'>
                                                                                          <p className='text-center text-lg font-monospaceTypewriter text-black'>
                                                                                                    No images to display
                                                                                          </p>
                                                                                </div>
                                                                      )
                                                            }
                                                  </>
                                        )
                              }
                              {
                                        gallery?.length > 6 && !hiddenViewMore && (
                                                  <div className="flex justify-center mt-10">
                                                            <Link to='/gallery'>
                                                                      <Button variant="default" size="default" className="text-xs">View More</Button>
                                                            </Link>
                                                  </div>
                                        )
                              }
                              {selectedImage && gallery?.length > 0 && (
                                        <GalleryModal
                                                  src={selectedImage}
                                                  setSelectedImage={setSelectedImage}
                                                  data={gallery}
                                                  isRenderedAll={isRenderedAll}
                                        />
                              )}
                              {
                                        scrollToTop && <ScrollToTop />
                              }
                    </div>
          )
}