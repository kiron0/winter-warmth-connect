import CustomToastMessage from "@/components/custom-toast-message";
import { Button } from "@/components/ui/button";
import {
          Dialog,
          DialogContent,
          DialogDescription,
          DialogHeader,
          DialogTitle,
          DialogTrigger
} from "@/components/ui/dialog";
import { currentUserDetails } from "@/redux/features/user/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { TCloth } from "@/types";
import { ReactNode } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type DonateModalProps = {
          button: ReactNode,
          clothModal: TCloth | null
          setClothModal: (cloth: TCloth | null) => void
}

export default function DonateModal({ button, clothModal, setClothModal }: DonateModalProps) {
          const user = useAppSelector(currentUserDetails);
          const navigate = useNavigate();

          const handleSubmit = async () => {
                    setClothModal(null);
                    navigate("/dashboard");
                    toast.custom(() => (
                              <CustomToastMessage
                                        title="Success"
                                        subtitle="Your donation has been successfully submitted!"
                              />
                    ));
          }

          return (
                    <>
                              <Dialog
                                        open={clothModal ? true : false}
                                        onOpenChange={() => setClothModal(null)}
                              >
                                        <DialogTrigger asChild>
                                                  {button}
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[550px] w-[95%] rounded-md">
                                                  <DialogHeader>
                                                            <DialogTitle>Donate - {clothModal?.title}</DialogTitle>
                                                            <DialogDescription>
                                                                      See the details of the cloth you want to donate
                                                            </DialogDescription>
                                                  </DialogHeader>
                                                  <div className="flex flex-col gap-5">
                                                            <div className="flex flex-col gap-5">
                                                                      <img
                                                                                src={clothModal?.image?.url}
                                                                                alt={clothModal?.title}
                                                                                draggable={false}
                                                                                className="w-24 h-24 object-cover select-none object-center shadow-md border rounded-lg"
                                                                      />
                                                                      <h1 className="text-xl sm:text-2xl font-bold">{clothModal?.title}</h1>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                      <p className="text-sm"><span className="font-bold">Size: </span>{clothModal?.size?.map((size, index) => (
                                                                                <span key={index} className="capitalize bg-gray-100 ml-2 rounded-md shadow-sm px-2 py-1 text-xs">{size}</span>
                                                                      ))}</p>
                                                                      <p className="text-sm capitalize"><span className="font-bold">Category: </span>{clothModal?.category}</p>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                      <p className="text-sm"><span className="font-bold">Description:</span> {clothModal?.description}</p>
                                                            </div>
                                                            {
                                                                      user?.email ? (
                                                                                <>
                                                                                          <div className="space-y-3">
                                                                                                    <div className="flex justify-between items-center">
                                                                                                              <img src={user?.image} draggable={false} alt={user?.username} className="w-10 h-10 select-none object-cover object-center shadow-md border rounded-lg" />
                                                                                                    </div>
                                                                                                    <div className="flex flex-wrap justify-between items-center">
                                                                                                              <p className="text-sm"><span className="font-bold">Donated by: </span>{user?.username}</p>
                                                                                                              <p className="text-sm"><span className="font-bold">Email: </span>{user?.email}</p>
                                                                                                    </div>
                                                                                          </div>
                                                                                          <div className="flex justify-end gap-3">
                                                                                                    <Button
                                                                                                              size="sm"
                                                                                                              variant="outline"
                                                                                                              onClick={() => setClothModal(null)}
                                                                                                    >
                                                                                                              Cancel
                                                                                                    </Button>
                                                                                                    <Button
                                                                                                              size="sm"
                                                                                                              onClick={handleSubmit}
                                                                                                    >
                                                                                                              Proceed
                                                                                                    </Button>
                                                                                          </div>
                                                                                </>
                                                                      ) : (
                                                                                <div className="flex justify-end gap-3">
                                                                                          <Button
                                                                                                    size="sm"
                                                                                                    variant="outline"
                                                                                                    onClick={() => setClothModal(null)}
                                                                                          >
                                                                                                    Cancel
                                                                                          </Button>
                                                                                          <Button
                                                                                                    size="sm"
                                                                                                    onClick={() => navigate("/login")}
                                                                                          >
                                                                                                    Login
                                                                                          </Button>
                                                                                </div>
                                                                      )
                                                            }
                                                  </div>
                                        </DialogContent>
                              </Dialog>
                    </>
          )
}