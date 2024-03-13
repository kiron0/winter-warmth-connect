import { APP_NAME } from "@/constants";
import { TUserDetails } from "@/types";
import { HiArrowLongRight } from "react-icons/hi2";
import { MdOutlineWavingHand } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Banner({ user }: { user: TUserDetails | null }) {
          return (
                    <div className='pb-20 pt-12 md:pt-20 md:mx-4'>
                              <div className='flex justify-center items-center pb-10 z-0'>
                                        {
                                                  !user?.email ? (
                                                            <Link to={'/register'} className='border px-3 py-1 rounded-full text-xs md:text-sm flex items-center gap-2 group'><span className='font-bold'>NEW</span><span className='sm:hover:text-primary duration-300 font-semibold flex items-center gap-1'> Join Now <HiArrowLongRight className='sm:group-hover:ml-1 duration-300' /></span></Link>
                                                  ) : (
                                                            <Link to={'/dashboard'} className='border px-3 py-1 rounded-full text-xs md:text-sm flex items-center gap-2 group'><span className='font-bold'>NEW</span><span className='sm:hover:text-primary duration-300 font-semibold flex items-center gap-1'> Dashboard <HiArrowLongRight className='sm:group-hover:ml-1 duration-300' /></span></Link>
                                                  )
                                        }
                              </div>
                              <h1 className='hidden md:block text-3xl md:text-6xl text-center font-semibold font-lemonMilk px-2'>
                                        Join us in keeping hearts <br /> warm and bodies cozy
                              </h1>
                              <h1 className='md:hidden text-3xl md:text-6xl text-center font-semibold font-lemonMilk px-2'>
                                        Join us in keeping hearts warm and bodies cozy
                              </h1>
                              <p className='hidden md:block pt-5 md:pt-12 w-full lg:w-11/12 mx-auto text-base md:text-lg text-center font-monospaceTypewriter px-3 md:px-0'>
                                        {APP_NAME} aims to provide essential warmth to those in need during cold seasons. By collecting and distributing coats, jackets, gloves, and other winter wear, we strive to ensure that vulnerable individuals and families are equipped to withstand harsh weather conditions. Through community support and donations, we work towards creating a world where everyone has access to the warmth and protection they deserve, fostering compassion and solidarity in the coldest of times.
                              </p>
                              <p className='md:hidden pt-5 md:pt-12 w-full lg:w-11/12 mx-auto text-base md:text-lg text-center font-monospaceTypewriter px-3 md:px-0'>
                                        {APP_NAME} provides warmth to those in need during cold seasons. We collect and distribute winter wear to vulnerable individuals and families, ensuring they are equipped to withstand harsh weather conditions. Through community support, we strive to create a world where everyone can access the warmth and protection they deserve.
                              </p>
                              <div className='flex justify-center gap-5 pt-12 md:pt-16 duration-300'>
                                        {
                                                  !user?.email ? (
                                                            <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
                                                                      <Link to={'/register'} className="font-lemonMilk border py-2.5 px-5 bg-primary text-white rounded-full text-sm md:text-base">
                                                                                Join Now
                                                                      </Link>
                                                                      <Link to={'/login'} className="font-lemonMilk z-0 border py-2.5 px-5 rounded-full text-sm md:text-base duration-300 sm:hover:bg-primary sm:hover:text-white">
                                                                                Login
                                                                      </Link>
                                                            </div>
                                                  ) : (
                                                            <div className='flex flex-col justify-center items-center gap-4'>
                                                                      <h1 className='py-2 px-5 rounded-full font-bold text-lg md:text-xl border border-gray-400 flex items-center gap-2 select-none'>
                                                                                Welcome back, {user?.username?.slice(0, 6)} <MdOutlineWavingHand className='inline-block text-xl' />
                                                                      </h1>
                                                                      <Link to={'/dashboard'} className="py-2 px-5 rounded-full font-bold text-lg md:text-xl bg-primary text-white">
                                                                                Dashboard
                                                                      </Link>
                                                            </div>
                                                  )
                                        }
                              </div>
                              <div className='mb-0 mt-12 md:mt-20 lg:mt-24 md:mb-20 flex justify-center items-center'>
                                        <div className='hidden before:content-[""] before:absolute before:rounded-full before:h-2 before:w-2 before:top-[6px] before:left-1/2 before:bg-primary before:-translate-x-2/4 before:opacity-100 before:animate-[mouse_1.5s_infinite] md:flex relative w-[1.93rem] h-10 border-2 border-primary rounded-full'></div>
                              </div>
                    </div>
          )
}