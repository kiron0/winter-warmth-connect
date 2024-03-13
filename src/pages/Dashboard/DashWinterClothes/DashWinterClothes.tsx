import CustomToastMessage from "@/components/custom-toast-message";
import DashboardTitle from "@/components/dashboard-title";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
          Table,
          TableBody,
          TableCell,
          TableHead,
          TableHeader,
          TableRow
} from "@/components/ui/table";
import { useDeleteWinterClothMutation, useGetWinterClothesQuery } from "@/redux/features/clothes/clothesApi";
import { TCloth } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiPencil, BiTrashAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import EditWinterCloth from "./EditWinterCloth";

export default function DashWinterClothes() {
          const { data, isLoading, refetch } = useGetWinterClothesQuery(undefined);
          const clothes = data?.data as TCloth[];

          const [clothModal, setClothModal] = useState<TCloth | null>(null);

          const [deleteCloth] = useDeleteWinterClothMutation();

          const handleDelete = async (id: string) => {
                    Swal.fire({
                              title: 'Are you sure?',
                              text: 'You will not be able to recover this cloth!',
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonText: 'Yes, delete it!',
                              cancelButtonText: 'No, keep it',
                    }).then(async (result) => {
                              if (result.isConfirmed) {
                                        const result = await deleteCloth(id);

                                        const data = 'data' in result ? result.data : null;

                                        if (data?.success) {
                                                  toast.custom(() => (
                                                            <CustomToastMessage
                                                                      title="Success"
                                                                      subtitle={data?.message}
                                                            />
                                                  ));
                                                  refetch();
                                        } else {
                                                  toast.custom(() => (
                                                            <CustomToastMessage
                                                                      title="Error"
                                                                      subtitle={data?.message}
                                                            />
                                                  ))
                                        }
                              }
                    });
          };

          if (isLoading) return <Loading />;

          return (
                    <div>
                              <DashboardTitle
                                        title="Winter Clothes Management"
                                        subtitle="A list of your winter clothes."
                              />
                              <Table>
                                        <TableHeader>
                                                  <TableRow>
                                                            <TableHead className="w-[100px]">Title</TableHead>
                                                            <TableHead>Category</TableHead>
                                                            <TableHead>Size</TableHead>
                                                            <TableHead className="text-right">Edit</TableHead>
                                                            <TableHead className="text-right">Delete</TableHead>
                                                  </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                                  {
                                                            clothes?.length > 0 ? (
                                                                      <>
                                                                                {clothes?.map((cloth: TCloth) => (
                                                                                          <TableRow key={cloth?._id}>
                                                                                                    <TableCell className="font-medium">{cloth?.title}</TableCell>
                                                                                                    <TableCell className="capitalize">{cloth?.category}</TableCell>
                                                                                                    <TableCell>
                                                                                                              {cloth?.size?.map((size, index) => (
                                                                                                                        <span key={index} className="capitalize bg-gray-100 rounded-md shadow-sm px-2 py-1 text-xs mr-2">{size}</span>
                                                                                                              ))}
                                                                                                    </TableCell>
                                                                                                    <TableCell className="text-right">
                                                                                                              {
                                                                                                                        clothModal ? (
                                                                                                                                  <EditWinterCloth
                                                                                                                                            button={<Button size="sm" className="px-3 h-8 text-xs" onClick={() => setClothModal(cloth)}><BiPencil /></Button>}
                                                                                                                                            clothModal={clothModal}
                                                                                                                                            setClothModal={setClothModal}
                                                                                                                                            refetch={refetch}
                                                                                                                                  />
                                                                                                                        ) : (
                                                                                                                                  <Button size="sm" className="px-3 h-8 text-xs" onClick={() => setClothModal(cloth)}><BiPencil /></Button>
                                                                                                                        )
                                                                                                              }
                                                                                                    </TableCell>
                                                                                                    <TableCell className="text-right">
                                                                                                              <Button size="sm" className="px-3 h-8 text-xs" onClick={() => handleDelete(cloth?._id as string)}>
                                                                                                                        <BiTrashAlt />
                                                                                                              </Button>
                                                                                                    </TableCell>
                                                                                          </TableRow>
                                                                                ))}
                                                                      </>
                                                            ) : (
                                                                      <TableRow>
                                                                                <TableCell colSpan={5} className="text-center">No winter clothes found.</TableCell>
                                                                      </TableRow>
                                                            )
                                                  }
                                        </TableBody>
                              </Table>

                              <Link to="/dashboard/create-winter-clothes">
                                        <Button size="sm" className="mt-5 text-xs">Add Winter Cloth</Button>
                              </Link>
                    </div>
          )
}