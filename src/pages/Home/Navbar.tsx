import Logo from "@/assets/logo.png";
import CustomToastMessage from "@/components/custom-toast-message";
import { ModeToggle } from "@/components/mode-toggle";
import {
          DropdownMenu,
          DropdownMenuContent,
          DropdownMenuItem,
          DropdownMenuLabel,
          DropdownMenuSeparator,
          DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { APP_NAME } from "@/constants";
import { logout } from "@/redux/features/auth/authSlice";
import { clearUserDetails } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TUserDetails } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose } from 'react-icons/ai';
import { BsGrid } from 'react-icons/bs';
import { HiOutlineLogin, HiOutlineLogout, HiOutlineMenuAlt4 } from 'react-icons/hi';
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ user }: { user: TUserDetails | null }) {
          const navigate = useNavigate();

          const dispatch = useAppDispatch();

          const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

          isMobileMenuOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';

          const toggleMobileMenu = () => {
                    setIsMobileMenuOpen(!isMobileMenuOpen);
          };

          const MenuLinks =
                    <>
                              <NavLink
                                        to="/winter-clothes"
                                        className={({ isActive }) =>
                                                  isActive ? "bg-primary text-primary-foreground font-lemonMilk transition duration-300 py-2 px-3 rounded-full" : `border transition duration-300 py-2 px-3 rounded-full sm:hover:bg-primary sm:hover:text-primary-foreground font-lemonMilk`
                                        }
                              >
                                        Winter Clothes
                              </NavLink>
                              <NavLink
                                        to="/gallery"
                                        className={({ isActive }) =>
                                                  isActive ? "bg-primary text-primary-foreground font-lemonMilk transition duration-300 py-2 px-3 rounded-full" : `border transition duration-300 py-2 px-3 rounded-full sm:hover:bg-primary sm:hover:text-primary-foreground font-lemonMilk`
                                        }
                              >
                                        Gallery
                              </NavLink>
                              {
                                        !user?.email && (
                                                  <NavLink
                                                            to="/login"
                                                            className='transition duration-300 py-2 px-3 rounded-full bg-primary text-primary-foreground flex items-center gap-2 font-lemonMilk'>
                                                            <HiOutlineLogin size={18} /> Login
                                                  </NavLink>
                                        )
                              }
                    </>

          const handleLogOut = () => {
                    dispatch(logout());
                    dispatch(clearUserDetails());
                    navigate('/');

                    toast.custom(() => (
                              <CustomToastMessage
                                        title="Success"
                                        subtitle="You have been logged out successfully!"
                              />
                    ), {
                              position: window.innerWidth > 768 ? 'top-center' : 'bottom-center'
                    })
          }

          return (
                    <nav className="w-full mx-auto">
                              <div>
                                        <div className="flex justify-between items-center py-4 mx-3 md:mx-5 lg:mx-0">
                                                  <Link to="/" className="text-2xl font-bold flex items-center">
                                                            <img src={Logo} draggable={false} alt="logo" className='w-8 md:w-10 select-none rounded-lg' />
                                                            <h1 className='font-lemonMilk text-lg lg:text-xl inline-block ml-2'>{APP_NAME}</h1>
                                                  </Link>
                                                  <div className='hidden md:flex duration-300 space-x-4'>
                                                            {MenuLinks}
                                                            {
                                                                      user?.email && (
                                                                                <div className="mt-1">
                                                                                          <DropdownMenu>
                                                                                                    <DropdownMenuTrigger className="focus-visible:outline-none focus-visible:ring-0">
                                                                                                              <div className={`w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden`}>
                                                                                                                        <img
                                                                                                                                  src={user?.image}
                                                                                                                                  alt={user?.email}
                                                                                                                                  draggable={false}
                                                                                                                                  className='w-full h-full object-cover select-none'
                                                                                                                        />
                                                                                                              </div>
                                                                                                    </DropdownMenuTrigger>
                                                                                                    <DropdownMenuContent className="w-[15rem] mr-4 mt-2 space-y-2 rounded-xl relative">
                                                                                                              <div className="absolute top-0 right-0">
                                                                                                                        <ModeToggle />
                                                                                                              </div>
                                                                                                              <DropdownMenuLabel>
                                                                                                                        <div className="flex flex-col justify-center items-center mt-4">
                                                                                                                                  <div className={`w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden`}>
                                                                                                                                            <img
                                                                                                                                                      src={user?.image}
                                                                                                                                                      alt={user?.email}
                                                                                                                                                      draggable={false}
                                                                                                                                                      className='w-full h-full object-cover select-none'
                                                                                                                                            />
                                                                                                                                  </div>
                                                                                                                                  <h3 className='mt-3 text-lg font-semibold'>{user?.username}</h3>
                                                                                                                                  <p className='text-sm'>{user?.email}</p>
                                                                                                                        </div>
                                                                                                              </DropdownMenuLabel>
                                                                                                              <DropdownMenuSeparator />
                                                                                                              <Link to="/dashboard">
                                                                                                                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer sm:hover:bg-accent duration-300 py-2.5 mt-1">
                                                                                                                                  <BsGrid /> Dashboard
                                                                                                                        </DropdownMenuItem>
                                                                                                              </Link>
                                                                                                              <button onClick={handleLogOut} className="w-full">
                                                                                                                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer bg-primary text-primary-foreground py-2.5 duration-300">
                                                                                                                                  <HiOutlineLogout size={16} /> Logout
                                                                                                                        </DropdownMenuItem>
                                                                                                              </button>
                                                                                                    </DropdownMenuContent>
                                                                                          </DropdownMenu>
                                                                                </div>
                                                                      )
                                                            }
                                                  </div>
                                                  <div className="md:hidden flex">
                                                            <button onClick={toggleMobileMenu} className='z-30 dark:text-white'>
                                                                      {isMobileMenuOpen ?
                                                                                (<AiOutlineClose size={30} />)
                                                                                :
                                                                                (<HiOutlineMenuAlt4 size={30} />)
                                                                      }
                                                            </button>
                                                  </div>
                                        </div>
                              </div>
                              {isMobileMenuOpen && (
                                        <div className="md:hidden absolute top-0 w-full z-10">
                                                  <div className="bg-white dark:bg-background dark:text-primary relative flex flex-col justify-start items-center gap-4 px-2 pt-24 h-screen">
                                                            {MenuLinks}
                                                            {
                                                                      user?.email && (
                                                                                <>
                                                                                          <Link to={'/dashboard'} className="py-2 px-3 rounded-full border font-lemonMilk">
                                                                                                    Dashboard
                                                                                          </Link>
                                                                                          <button onClick={() => { handleLogOut(), setIsMobileMenuOpen(!isMobileMenuOpen) }} className="flex items-center gap-2 bg-primary text-primary-foreground py-2 px-3 rounded-full border font-lemonMilk">
                                                                                                    <HiOutlineLogout size={18} /> Logout
                                                                                          </button>
                                                                                </>
                                                                      )
                                                            }
                                                            <ModeToggle />
                                                  </div>
                                        </div>
                              )}
                    </nav>

          )
}