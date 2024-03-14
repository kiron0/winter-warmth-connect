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
import {
          Form,
          FormControl,
          FormField,
          FormItem,
          FormLabel,
          FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
          Select,
          SelectContent,
          SelectGroup,
          SelectItem,
          SelectLabel,
          SelectTrigger,
          SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateWinterClothMutation } from "@/redux/features/clothes/clothesApi";
import { updateWinterClotheFormSchema } from "@/schema";
import { TCloth } from "@/types";
import { categories, sizes } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiArrowLongLeft } from "react-icons/hi2";
import { z } from "zod";

type EditWinterClothProps = {
          button: ReactNode,
          clothModal: TCloth | null
          setClothModal: (cloth: TCloth | null) => void
}

export default function EditWinterCloth({ button, clothModal, setClothModal }: EditWinterClothProps) {
          const [updateWinterCloth] = useUpdateWinterClothMutation();
          const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

          const form = useForm<z.infer<typeof updateWinterClotheFormSchema>>({
                    resolver: zodResolver(updateWinterClotheFormSchema),
                    defaultValues: {
                              image: null,
                              category: "",
                              title: "",
                              size: "",
                              description: "",
                    },
          }) as UseFormReturn<z.infer<typeof updateWinterClotheFormSchema>>;

          async function onSubmit(values: z.infer<typeof updateWinterClotheFormSchema>) {
                    const { image, title, category, description } = values;

                    if (image?.size && image?.size > 2097152) {
                              return form.setError("image", {
                                        type: "manual",
                                        message: "Image size should be less than 2MB",
                              });
                    }

                    const formData = new FormData();
                    formData.append("_id", clothModal?._id ?? "");
                    formData.append("image", image ?? clothModal?.image ?? "");
                    formData.append("title", title ?? clothModal?.title ?? "");
                    formData.append("category", category ?? clothModal?.category ?? "");
                    formData.append("size", selectedSizes ? JSON.stringify(selectedSizes) : JSON.stringify(clothModal?.size) ?? "");
                    formData.append("description", description ?? clothModal?.description ?? "");

                    try {
                              const result = await updateWinterCloth(formData).unwrap();

                              if (result?.success) {
                                        toast.custom(() => (
                                                  <CustomToastMessage
                                                            title='Success'
                                                            subtitle={result?.message}
                                                  />
                                        ));

                                        setClothModal(null);
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

          useEffect(() => {
                    if (clothModal) {
                              form.setValue("title", clothModal?.title);
                              form.setValue("category", clothModal?.category);
                              form.setValue("description", clothModal?.description);
                              form.setValue("size", clothModal?.size[0]);
                              setSelectedSizes(clothModal?.size);
                    }
          }, [clothModal, form]);

          return (
                    <>
                              <Dialog>
                                        <DialogTrigger asChild>
                                                  {button}
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[550px] w-[95%] rounded-md">
                                                  <DialogHeader>
                                                            <DialogTitle>Edit - {clothModal?.title}</DialogTitle>
                                                            <DialogDescription>
                                                                      Make changes to cloth info here. Click update when you're done.
                                                            </DialogDescription>
                                                  </DialogHeader>
                                                  <div>
                                                            <Form {...form}>
                                                                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 h-80 md:h-96 overflow-y-auto scrollbar-hide">
                                                                                <FormField
                                                                                          control={form.control}
                                                                                          name="image"
                                                                                          render={({ field }) => (
                                                                                                    <FormItem>
                                                                                                              <FormLabel className="flex items-center gap-2">Image {form.formState.errors.image ? <><HiArrowLongLeft className="text-red-500" /> <FormMessage /></> : <span className="text-red-500">*</span>}</FormLabel>
                                                                                                              <FormControl>
                                                                                                                        <Input
                                                                                                                                  type="file"
                                                                                                                                  accept="image/jpeg, image/png, image/jpg"
                                                                                                                                  placeholder="Upload an image"
                                                                                                                                  className="focus-visible:outline-none focus-visible:ring-0"
                                                                                                                                  onChange={(e) => e.target.files && field.onChange(e.target.files[0] as File)}
                                                                                                                        />
                                                                                                              </FormControl>
                                                                                                    </FormItem>
                                                                                          )}
                                                                                />
                                                                                <FormField
                                                                                          control={form.control}
                                                                                          name="title"
                                                                                          render={({ field }) => (
                                                                                                    <FormItem>
                                                                                                              <FormLabel className="flex items-center gap-2">Title {form.formState.errors.size ? <><HiArrowLongLeft className="text-red-500" /> <FormMessage /></> : <span className="text-red-500">*</span>}</FormLabel>
                                                                                                              <FormControl>
                                                                                                                        <Input type="text" placeholder="Enter title" className="focus-visible:outline-none focus-visible:ring-0" {...field} />
                                                                                                              </FormControl>
                                                                                                    </FormItem>
                                                                                          )}
                                                                                />
                                                                                <FormField
                                                                                          control={form.control}
                                                                                          name="category"
                                                                                          render={({ field }) => (
                                                                                                    <FormItem className="w-full">
                                                                                                              <FormLabel className="flex items-center gap-2">Category {form.formState.errors.category ? <><HiArrowLongLeft className="text-red-500" /> <FormMessage /></> : <span className="text-red-500">*</span>}</FormLabel>
                                                                                                              <FormControl>
                                                                                                                        <Select onValueChange={field.onChange} defaultValue={clothModal?.category}>
                                                                                                                                  <SelectTrigger className="w-full focus-visible:outline-none focus-visible:ring-0">
                                                                                                                                            <SelectValue placeholder="Select category" />
                                                                                                                                  </SelectTrigger>
                                                                                                                                  <SelectContent>
                                                                                                                                            <SelectGroup>
                                                                                                                                                      <SelectLabel>Select category</SelectLabel>
                                                                                                                                                      {
                                                                                                                                                                categories?.map((category) => (
                                                                                                                                                                          <SelectItem key={category?.id} value={category?.value}>{category?.name}</SelectItem>
                                                                                                                                                                ))
                                                                                                                                                      }
                                                                                                                                            </SelectGroup>
                                                                                                                                  </SelectContent>
                                                                                                                        </Select>
                                                                                                              </FormControl>
                                                                                                    </FormItem>
                                                                                          )}
                                                                                />
                                                                                <FormField
                                                                                          control={form.control}
                                                                                          name="size"
                                                                                          render={({ field }) => (
                                                                                                    <FormItem className="w-full">
                                                                                                              <FormLabel className="flex items-center gap-2">Size {form.formState.errors.size ? <><HiArrowLongLeft className="text-red-500" /> <FormMessage /></> : <span className="text-red-500">*</span>}</FormLabel>
                                                                                                              <FormControl>
                                                                                                                        <div>
                                                                                                                                  <Select
                                                                                                                                            onValueChange={(value) => {
                                                                                                                                                      field.onChange(value);
                                                                                                                                                      setSelectedSizes((prev) => [...prev, value]);
                                                                                                                                            }}
                                                                                                                                            defaultValue={clothModal?.size[0]}
                                                                                                                                  >
                                                                                                                                            <SelectTrigger className="w-full focus-visible:outline-none focus-visible:ring-0">
                                                                                                                                                      <SelectValue placeholder="Select size" />
                                                                                                                                            </SelectTrigger>
                                                                                                                                            <SelectContent>
                                                                                                                                                      <SelectGroup>
                                                                                                                                                                <SelectLabel>Select size</SelectLabel>
                                                                                                                                                                {
                                                                                                                                                                          sizes?.map((size) => {
                                                                                                                                                                                    if (!selectedSizes?.includes(size?.value)) {
                                                                                                                                                                                              return (
                                                                                                                                                                                                        <SelectItem key={size?.id} value={size?.value}>{size?.name}</SelectItem>
                                                                                                                                                                                              )
                                                                                                                                                                                    } else {
                                                                                                                                                                                              return (
                                                                                                                                                                                                        <SelectItem key={size?.id} value={size?.value} disabled>{size?.name}</SelectItem>
                                                                                                                                                                                              )
                                                                                                                                                                                    }
                                                                                                                                                                          })
                                                                                                                                                                }
                                                                                                                                                      </SelectGroup>
                                                                                                                                            </SelectContent>
                                                                                                                                  </Select>

                                                                                                                                  <div className="flex flex-wrap gap-2 mt-3">
                                                                                                                                            {
                                                                                                                                                      selectedSizes?.map((size) => (
                                                                                                                                                                <span key={size} className="px-2 py-1 bg-gray-100 rounded-md text-xs font-semibold cursor-pointer"
                                                                                                                                                                          onClick={() => {
                                                                                                                                                                                    if (selectedSizes?.length > 1) {
                                                                                                                                                                                              setSelectedSizes((prev) => prev.filter((s) => s !== size))
                                                                                                                                                                                    } else {
                                                                                                                                                                                              toast.custom(() => (
                                                                                                                                                                                                        <CustomToastMessage
                                                                                                                                                                                                                  title='Warning'
                                                                                                                                                                                                                  subtitle="At least one size is required"
                                                                                                                                                                                                                  subtitleClassName="text-black"
                                                                                                                                                                                                        />
                                                                                                                                                                                              ));
                                                                                                                                                                                    }
                                                                                                                                                                          }}
                                                                                                                                                                >
                                                                                                                                                                          {sizes?.find((s) => s?.value === size)?.name}
                                                                                                                                                                </span>
                                                                                                                                                      ))
                                                                                                                                            }
                                                                                                                                  </div>
                                                                                                                        </div>
                                                                                                              </FormControl>
                                                                                                    </FormItem>
                                                                                          )}
                                                                                />
                                                                                <FormField
                                                                                          control={form.control}
                                                                                          name="description"
                                                                                          render={({ field }) => (
                                                                                                    <FormItem>
                                                                                                              <FormLabel className="flex items-center gap-2">Description {form.formState.errors.description ? <><HiArrowLongLeft className="text-red-500" /> <FormMessage /></> : <span className="text-red-500">*</span>}</FormLabel>
                                                                                                              <FormControl>
                                                                                                                        <Textarea typeof="text" placeholder="Enter description" className="resize-none h-52 focus-visible:outline-none focus-visible:ring-0" {...field} />
                                                                                                              </FormControl>
                                                                                                    </FormItem>
                                                                                          )}
                                                                                />
                                                                                <div className="flex justify-end">
                                                                                          <Button loading={form.formState.isSubmitting} type="submit" size="sm" className="text-xs">Update</Button>
                                                                                </div>
                                                                      </form>
                                                            </Form>
                                                  </div>
                                        </DialogContent>
                              </Dialog>
                    </>
          )
}