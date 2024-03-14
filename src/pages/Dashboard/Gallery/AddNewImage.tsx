import CustomToastMessage from "@/components/custom-toast-message";
import DashboardTitle from "@/components/dashboard-title";
import { Button } from "@/components/ui/button";
import {
          Form,
          FormControl,
          FormField,
          FormItem,
          FormLabel,
          FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateGalleryImageMutation } from "@/redux/features/gallery/galleryApi";
import { addNewImageSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function AddNewImage() {
          const [addNewImage] = useCreateGalleryImageMutation();

          const navigate = useNavigate();

          const form = useForm<z.infer<typeof addNewImageSchema>>({
                    resolver: zodResolver(addNewImageSchema),
                    defaultValues: {
                              image: null || "",
                    },
          }) as UseFormReturn<z.infer<typeof addNewImageSchema>>;

          async function onSubmit(values: z.infer<typeof addNewImageSchema>) {
                    const { image } = values;

                    if (!image) {
                              return form.setError("image", {
                                        type: "manual",
                                        message: "Image is required",
                              });
                    }

                    const formData = new FormData();
                    formData.append("image", image);

                    try {
                              const result = await addNewImage(formData).unwrap();

                              if (result?.success) {
                                        toast.custom(() => (
                                                  <CustomToastMessage
                                                            title='Success'
                                                            subtitle={result?.message}
                                                  />
                                        ));

                                        form.reset();
                                        navigate('/dashboard/gallery');
                              } else {
                                        return toast.custom(() => (
                                                  <CustomToastMessage
                                                            title='Error'
                                                            subtitle={result?.message}
                                                  />
                                        ));
                              }
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } catch (error: any) {
                              return toast.custom(() => (
                                        <CustomToastMessage
                                                  title='Error'
                                                  subtitle={error?.data?.message}
                                        />
                              ));
                    }
          }

          return (
                    <div className="pb-10">
                              <DashboardTitle
                                        title="Add Image"
                                        subtitle="Add a new image to your gallery."
                                        isBackVisible
                              />
                              <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                                  <FormField
                                                            control={form.control}
                                                            name="image"
                                                            render={({ field }) => (
                                                                      <FormItem>
                                                                                <FormLabel className="flex items-center gap-2">Upload Image {form.formState.errors.image ? <><HiArrowLongLeft className="text-red-500" /> <FormMessage /></> : <span className="text-red-500">*</span>}

                                                                                </FormLabel>
                                                                                <FormControl>
                                                                                          <Input
                                                                                                    type="file"
                                                                                                    accept="image/*"
                                                                                                    placeholder="Choose image"
                                                                                                    className="focus-visible:outline-none focus-visible:ring-0"
                                                                                                    onChange={(e) => e.target.files && field.onChange(e.target.files[0] as File)}
                                                                                          />
                                                                                </FormControl>
                                                                      </FormItem>
                                                            )}
                                                  />
                                                  {
                                                            form.watch("image") && (
                                                                      <div className="w-full md:w-1/3 lg:w-1/4 h-80 md:h-96 rounded-md overflow-hidden shadow-md">
                                                                                <img src={URL.createObjectURL(form.watch("image"))} alt="preview" className="w-full h-full object-cover object-center select-none" draggable={false} />
                                                                      </div>
                                                            )
                                                  }
                                                  <div className="flex justify-end">
                                                            <Button loading={form.formState.isSubmitting} type="submit" size="sm" className="text-xs">Submit</Button>
                                                  </div>
                                        </form>
                              </Form>
                    </div>
          )
}