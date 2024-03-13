import CustomToastMessage from "@/components/custom-toast-message";
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
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { registerFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

export default function Register() {
          const [isLoading, setIsLoading] = useState<boolean>(false);
          const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

          const navigate = useNavigate();

          const [register] = useRegisterMutation();

          const form = useForm<z.infer<typeof registerFormSchema>>({
                    resolver: zodResolver(registerFormSchema),
                    defaultValues: {
                              username: "",
                              email: "",
                              password: "",
                    },
          });

          async function onSubmit(values: z.infer<typeof registerFormSchema>) {
                    const { username, email, password } = values;

                    if (username && email && password) {
                              try {
                                        setIsLoading(true);
                                        const res = await register({ username, email, password }).unwrap();

                                        if (res?.success) {
                                                  form.reset();
                                                  toast.custom(() => (
                                                            <CustomToastMessage
                                                                      title="Success"
                                                                      subtitle="You have successfully registered!"
                                                            />
                                                  ), {
                                                            position: window.innerWidth > 768 ? 'top-center' : 'bottom-center'
                                                  });

                                                  setIsLoading(false);
                                                  navigate("/login");
                                        }
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              } catch (err: any) {
                                        setIsLoading(false);
                                        toast.custom(() => (
                                                  <CustomToastMessage
                                                            title="Error"
                                                            subtitle={err?.data?.message}
                                                  />
                                        ), {
                                                  position: window.innerWidth > 768 ? 'top-center' : 'bottom-center'
                                        });
                              }
                    }
          }
          return (
                    <div className="flex flex-col justify-center items-center h-screen">
                              <div className="w-full px-2 md:px-0 flex justify-center">
                                        <Form {...form}>
                                                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 border shadow-md px-5 pb-5 rounded-2xl w-full md:w-1/2 lg:w-1/3 xl:w-1/4  relative">
                                                            <div className='absolute top-2 left-2'>
                                                                      <Link to="/" className='flex items-center gap-1 font-semibold'>
                                                                                <Button size="sm" variant="outline" className="px-2 h-7 text-xs">
                                                                                          <GoHome size={15} />
                                                                                </Button>
                                                                      </Link>
                                                            </div>
                                                            <div className="text-center mb-5">
                                                                      <h1 className="text-2xl md:text-3xl font-bold">Register</h1>
                                                                      <small>Enter your username, email and password to register</small>
                                                            </div>
                                                            <FormField
                                                                      control={form.control}
                                                                      name="username"
                                                                      render={({ field }) => (
                                                                                <FormItem>
                                                                                          <FormLabel className="flex items-center gap-2">Username {form.formState.errors.username ? <><HiArrowLongLeft className="text-red-500" /> <FormMessage /></> : <span className="text-red-500">*</span>}</FormLabel>
                                                                                          <FormControl>
                                                                                                    <Input type="text" placeholder="Enter your username" className="py-5 md:py-6 focus-visible:outline-none focus-visible:ring-0" {...field} />
                                                                                          </FormControl>
                                                                                </FormItem>
                                                                      )}
                                                            />
                                                            <FormField
                                                                      control={form.control}
                                                                      name="email"
                                                                      render={({ field }) => (
                                                                                <FormItem>
                                                                                          <FormLabel className="flex items-center gap-2">Email {form.formState.errors.email ? <><HiArrowLongLeft className="text-red-500" /> <FormMessage /></> : <span className="text-red-500">*</span>}</FormLabel>
                                                                                          <FormControl>
                                                                                                    <Input type="email" placeholder="Enter your email" className="py-5 md:py-6 focus-visible:outline-none focus-visible:ring-0" {...field} />
                                                                                          </FormControl>
                                                                                </FormItem>
                                                                      )}
                                                            />
                                                            <FormField
                                                                      control={form.control}
                                                                      name="password"
                                                                      render={({ field }) => (
                                                                                <FormItem>
                                                                                          <FormLabel className="flex items-center gap-2">Password {form.formState.errors.password ? <><HiArrowLongLeft className="text-red-500" /> <FormMessage /></> : <span className="text-red-500">*</span>}</FormLabel>
                                                                                          <FormControl>
                                                                                                    <div className="relative">
                                                                                                              <Input type={isShowPassword ? "text" : "password"} placeholder="Enter your password" className="py-5 md:py-6 focus-visible:outline-none focus-visible:ring-0" {...field} />
                                                                                                              <p className="text-xs pt-3 absolute">
                                                                                                                        Already have an account? <Link to="/login" className="font-semibold hover:text-blue-600 duration-300">Login</Link>
                                                                                                              </p>
                                                                                                              <div className="eye absolute right-4 top-3 md:top-4 sm:cursor-pointer z-10 select-none"
                                                                                                                        onClick={() => setIsShowPassword((state) => !state)}>
                                                                                                                        {isShowPassword ? <FaRegEye size={21} className='text-black dark:text-white' /> : <FaRegEyeSlash size={21} className='text-black dark:text-white' />}
                                                                                                              </div>
                                                                                                    </div>
                                                                                          </FormControl>
                                                                                </FormItem>
                                                                      )}
                                                            />
                                                            <div className="flex justify-end">
                                                                      <Button loading={isLoading} type="submit" size="sm" className="text-xs">Submit</Button>
                                                            </div>
                                                  </form>
                                        </Form>
                              </div>
                    </div>
          )
}