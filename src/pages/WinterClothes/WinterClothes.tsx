import ClothCard from "@/components/cloth-card";
import Loading from "@/components/loading";
import StyleProvider from "@/components/style-provider";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useGetWinterClothesQuery } from "@/redux/features/clothes/clothesApi";
import { TCloth } from "@/types";

export default function WinterClothes() {
          useScrollToTop();

          const { data, isLoading } = useGetWinterClothesQuery(undefined);

          const clothes = data?.data;

          return (
                    <StyleProvider>
                              <div className="pb-12">
                                        <h1 className='text-2xl md:text-3xl lg:text-4xl py-4 text-center font-lemonMilk text-primary'>Winter Clothes</h1>
                                        <p className='w-full mx-auto text-base md:text-lg text-center font-monospaceTypewriter text-primary px-1'>
                                                  Winter is coming. Get ready with our winter clothes collection. We have a wide range of winter clothes for distribution.
                                        </p>
                              </div>
                              {
                                        isLoading ? (
                                                  <Loading />
                                        ) : (
                                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-3 lg:mx-0">
                                                            {clothes?.map((cloth: TCloth) => (
                                                                      <ClothCard key={cloth?._id} cloth={cloth} />
                                                            ))}
                                                  </div>
                                        )
                              }
                    </StyleProvider>
          )
}