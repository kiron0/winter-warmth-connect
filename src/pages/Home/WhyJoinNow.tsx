import { TUserDetails } from "@/types";
import { Link } from "react-router-dom";

export default function WhyJoinNow({ user }: { user: TUserDetails }) {
          return (
                    <div className='pb-10 md:px-12 my-16 px-6 md:my-24 border border-r-0 lg:border-r py-12 lg:rounded-3xl'>
                              <div className='flex flex-col'>
                                        <h1 className='text-primary text-2xl md:text-6xl text-center font-lemonMilk'>
                                                  Why Join Now?
                                        </h1>
                                        <p className='text-primary pt-5 md:pt-8 w-full lg:w-4/5 mx-auto text-base md:text-lg text-center font-monospaceTypewriter'>
                                                  Our platform offers a unique opportunity to make a meaningful impact by participating in our winter clothes distribution initiative. By joining us today, you can provide warmth and comfort to those in need during the cold months. Joining now means being part of a community-driven effort to create positive change and uplift lives, spreading warmth and hope where needed most. Together, let's make a difference this winter.
                                        </p>
                                        <div className='flex justify-center gap-5 pt-10'>
                                                  {
                                                            !user?.email ? (
                                                                      <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
                                                                                <Link to={'/register'} className="font-lemonMilk border py-2.5 px-5 bg-primary text-primary-foreground rounded-full text-sm md:text-base">
                                                                                          Join Now
                                                                                </Link>
                                                                                <Link to={'/login'} className="font-lemonMilk z-0 border py-2.5 px-5 rounded-full text-sm md:text-base duration-300 sm:hover:bg-primary sm:hover:text-white">
                                                                                          Login
                                                                                </Link>
                                                                      </div>
                                                            ) : (
                                                                      <div className='flex flex-col justify-center items-center'>
                                                                                <Link to={'/dashboard'} className="py-2 px-5 rounded-full font-bold text-lg md:text-xl bg-primary text-primary-foreground">
                                                                                          Dashboard
                                                                                </Link>
                                                                      </div>
                                                            )
                                                  }
                                        </div>
                              </div>
                    </div>
          )
}