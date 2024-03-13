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
import { useCreateWinterClothMutation } from "@/redux/features/clothes/clothesApi";
import { createWinterClotheFormSchema } from "@/schema";
import { categories, sizes } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function DashCreateWinterClothes() {
          const [createWinterCloth] = useCreateWinterClothMutation();
          const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

          const navigate = useNavigate();

          const form = useForm<z.infer<typeof createWinterClotheFormSchema>>({
                    resolver: zodResolver(createWinterClotheFormSchema),
                    defaultValues: {
                              image: null,
                              category: "",
                              title: "",
                              size: "",
                              description: "",
                    },
          }) as UseFormReturn<z.infer<typeof createWinterClotheFormSchema>>;

          async function onSubmit(values: z.infer<typeof createWinterClotheFormSchema>) {
                    const { image, title, category, description } = values;

                    if (image?.size && image?.size > 2097152) {
                              return form.setError("image", {
                                        type: "manual",
                                        message: "Image size should be less than 2MB",
                              });
                    }

                    const formData = new FormData();
                    formData.append("image", image);
                    formData.append("title", title);
                    formData.append("category", category);
                    formData.append("size", JSON.stringify(selectedSizes));
                    formData.append("description", description);

                    try {
                              const result = await createWinterCloth(formData).unwrap();

                              if (result?.success) {
                                        toast.custom(() => (
                                                  <CustomToastMessage
                                                            title='Success'
                                                            subtitle={result?.message}
                                                  />
                                        ));

                                        form.reset();
                                        navigate('/dashboard/winter-clothes');
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
                                        title="Add Winter Cloth"
                                        subtitle="Enter the details of the winter cloth you want to add."
                                        isBackVisible
                              />
                              <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                                  <FormField
                                                            control={form.control}
                                                            name="image"
                                                            render={({ field }) => (
                                                                      <FormItem>
                                                                                <FormLabel className="flex items-center gap-2">Image {form.formState.errors.image ? <><HiArrowLongLeft className="text-red-500" /> <FormMessage /></> : <span className="text-red-500">*</span>}</FormLabel>
                                                                                <FormControl>
                                                                                          <Input
                                                                                                    type="file"
                                                                                                    accept="image/*"
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
                                                                                          <Select onValueChange={field.onChange}>
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
                                                            <Button loading={form.formState.isSubmitting} type="submit" size="sm" className="text-xs">Submit</Button>
                                                  </div>
                                        </form>
                              </Form>
                    </div>
          )
}