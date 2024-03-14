import Loading from "@/components/loading";
import StyleProvider from "@/components/style-provider";
import { Button } from "@/components/ui/button";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useGetWinterClothByIdQuery } from "@/redux/features/clothes/clothesApi";
import { TCloth } from "@/types";
import { HandHelping } from "lucide-react";
import { useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import DonateModal from "./DonateModal";

export default function SingleWinterClothes() {
          useScrollToTop();
          const navigate = useNavigate();
          const [clothModal, setClothModal] = useState<TCloth | null>(null);

          const params = useParams<{ id: string }>();
          const { id } = params;

          const { data, isLoading } = useGetWinterClothByIdQuery(id as string);

          const cloth = data?.data as TCloth;

          return (
                    <StyleProvider>
                              {
                                        isLoading ? <Loading /> : (
                                                  <div className="mx-3 sm:mx-2">
                                                            <div className="flex justify-start items-center gap-3 my-4 sm:my-8">
                                                                      <Button
                                                                                size="sm"
                                                                                variant="default"
                                                                                className="text-xs flex items-center gap-2"
                                                                                onClick={() => navigate(-1)}
                                                                      >
                                                                                <HiArrowLongLeft size={18} />
                                                                                Back
                                                                      </Button>
                                                            </div>
                                                            <div className="flex flex-col md:flex-row justify-between items-center gap-10 my-4 sm:my-8 w-full">
                                                                      <div className="w-full md:w-1/2">
                                                                                <img
                                                                                          src={cloth?.image?.url}
                                                                                          alt={cloth?.title}
                                                                                          className="w-full h-96 object-cover object-center shadow-md border rounded-lg"
                                                                                />
                                                                      </div>
                                                                      <div className="w-full md:w-1/2 space-y-5">
                                                                                <h1 className="text-2xl sm:text-3xl font-bold">{cloth?.title}</h1>
                                                                                <p className="text-base">{cloth?.description}</p>
                                                                                <p className="text-sm capitalize">Category: {cloth?.category}</p>
                                                                                <p className="text-sm">Size: {cloth?.size?.map((size, index) => (
                                                                                          <span key={index} className="bg-primary text-primary-foreground ml-2 rounded-md shadow-sm px-2 py-1 text-xs">{size}</span>
                                                                                ))}</p>
                                                                                <div className="flex justify-end pt-5">
                                                                                          {
                                                                                                    clothModal ? (
                                                                                                              <DonateModal
                                                                                                                        button={<Button size="sm" className="text-xs flex items-center gap-1" onClick={() => setClothModal(cloth)}>Donate Now <HandHelping size={15} /></Button>}
                                                                                                                        clothModal={clothModal}
                                                                                                                        setClothModal={setClothModal}
                                                                                                              />
                                                                                                    ) : (
                                                                                                              <Button size="sm" className="text-xs flex items-center gap-1" onClick={() => setClothModal(cloth)}>Donate Now <HandHelping size={15} /></Button>
                                                                                                    )
                                                                                          }
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        )
                              }
                    </StyleProvider>
          )
}