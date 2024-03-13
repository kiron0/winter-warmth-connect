import ClothCard from "@/components/cloth-card";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useGetWinterClothesQuery } from "@/redux/features/clothes/clothesApi";
import { TCloth } from "@/types";
import { Link } from "react-router-dom";

export default function Clothes() {
          const { data, isLoading } = useGetWinterClothesQuery(undefined);

          const clothes = data?.data;

          return (
                    <div>
                              <div className="pb-12">
                                        <h1 className='text-2xl md:text-3xl lg:text-4xl py-4 text-center font-lemonMilk text-black'>Winter Clothes</h1>
                                        <p className='w-full mx-auto text-base md:text-lg text-center font-monospaceTypewriter text-black px-1'>
                                                  Winter is coming. Get ready with our winter clothes collection. We have a wide range of winter clothes for distribution.
                                        </p>
                              </div>
                              {
                                        isLoading ? (
                                                  <Loading />
                                        ) : (
                                                  <>
                                                            {
                                                                      clothes?.length > 0 ? (
                                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-3 lg:mx-0">
                                                                                          {clothes?.slice(0, 6).map((cloth: TCloth) => (
                                                                                                    <ClothCard key={cloth?._id} cloth={cloth} />
                                                                                          ))}
                                                                                </div>
                                                                      ) : (
                                                                                <div className="flex justify-center">
                                                                                          <p className="text-lg text-gray-500 font-monospaceTypewriter">No clothes found</p>
                                                                                </div>
                                                                      )
                                                            }
                                                  </>
                                        )
                              }

                              {
                                        clothes?.length > 6 && (
                                                  <div className="flex justify-center mt-10">
                                                            <Link to='/winter-clothes'>
                                                                      <Button variant="default" size="default" className="text-xs">View More</Button>
                                                            </Link>
                                                  </div>
                                        )
                              }
                    </div>
          )
}