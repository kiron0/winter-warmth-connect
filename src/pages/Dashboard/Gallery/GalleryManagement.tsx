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
import GalleryModal from "@/pages/Home/Gallery/GalleryModal";
import { useDeleteGalleryImageMutation, useGetGalleryImagesQuery } from "@/redux/features/gallery/galleryApi";
import { TGallery } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiTrashAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function GalleryManagement() {
          const { data, isLoading, refetch } = useGetGalleryImagesQuery(undefined);
          const [selectedImage, setSelectedImage] = useState<string | null>(null);

          const gallery = data?.data as TGallery[];

          const [deleteImage] = useDeleteGalleryImageMutation();

          const handleDelete = async (id: string) => {
                    Swal.fire({
                              title: 'Are you sure?',
                              text: 'You will not be able to recover this image!',
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonText: 'Yes, delete it!',
                              cancelButtonText: 'No, keep it',
                    }).then(async (result) => {
                              if (result.isConfirmed) {
                                        const result = await deleteImage(id);

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
                                        title="Gallery"
                                        subtitle="Manage your gallery here."
                              />

                              <Table>
                                        <TableHeader>
                                                  <TableRow>
                                                            <TableHead>No</TableHead>
                                                            <TableHead>ID</TableHead>
                                                            <TableHead>Image</TableHead>
                                                            <TableHead className="text-right">Delete</TableHead>
                                                  </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                                  {
                                                            gallery?.length > 0 ? (
                                                                      <>
                                                                                {gallery?.map((image: TGallery, index: number) => (
                                                                                          <TableRow key={image?._id}>
                                                                                                    <TableCell>{index + 1}</TableCell>
                                                                                                    <TableCell>gallery-{image?._id?.slice(-8)}</TableCell>
                                                                                                    <TableCell className="font-medium">
                                                                                                              <div className="w-16 h-16 bg-gray-300 rounded-lg border-2 border-gray-600 cursor-pointer" onClick={() => setSelectedImage(image?.image?.url)}>
                                                                                                                        <img src={image?.image?.url} alt={image?.image?.url} className="w-full h-full object-cover object-center rounded-lg" />
                                                                                                              </div>
                                                                                                    </TableCell>
                                                                                                    <TableCell className="text-right">
                                                                                                              <Button size="sm" className="px-3 h-8 text-xs" onClick={() => handleDelete(image?._id as string)}>
                                                                                                                        <BiTrashAlt />
                                                                                                              </Button>
                                                                                                    </TableCell>
                                                                                          </TableRow>
                                                                                ))}
                                                                      </>
                                                            ) : (
                                                                      <TableRow>
                                                                                <TableCell colSpan={4} className="text-center">No image found</TableCell>
                                                                      </TableRow>
                                                            )

                                                  }
                                        </TableBody>
                              </Table>
                              {selectedImage && gallery?.length > 0 && (
                                        <GalleryModal
                                                  src={selectedImage}
                                                  setSelectedImage={setSelectedImage}
                                                  data={gallery}
                                                  isRenderedAll
                                        />
                              )}

                              <Link to="/dashboard/add-new-image">
                                        <Button size="sm" className="mt-5 text-xs">Add New Image</Button>
                              </Link>
                    </div>
          )
}