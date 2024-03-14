import CustomToastMessage from "@/components/custom-toast-message";
import ProfileDropdown from "@/components/profile-dropdown";
import Sidebar from "@/components/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { APP_NAME } from "@/constants";
import useAuth from "@/hooks/useAuth";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { getFallBackImageName } from "@/utils/getImageName";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Dashboard() {
          const [avatarOpen, setAvatarOpen] = useState<boolean>(false);
          const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
          const sidebarRef = useRef<HTMLDivElement>(null);
          const avatarRef = useRef<HTMLDivElement>(null);

          const { isValidUser: user } = useAuth();

          const dispatch = useAppDispatch();

          const navigate = useNavigate();

          const handleLogout = () => {
                    dispatch(logout());
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

          useEffect(() => {
                    const handleOutsideClick = (event: MouseEvent) => {
                              if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                                        setIsSidebarOpen(false);
                              }
                    };

                    document.addEventListener('mousedown', handleOutsideClick);
                    return () => {
                              document.removeEventListener('mousedown', handleOutsideClick);
                    };
          }, [isSidebarOpen]);

          useEffect(() => {
                    const handleOutsideClick = (event: MouseEvent) => {
                              if (avatarOpen && avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
                                        setAvatarOpen(false);
                              }
                    };

                    document.addEventListener('mousedown', handleOutsideClick);
                    return () => {
                              document.removeEventListener('mousedown', handleOutsideClick);
                    };
          }, [avatarOpen]);

          const handleSidebarToggle = () => {
                    setIsSidebarOpen(!isSidebarOpen);
          };

          return (
                    <div className="flex h-screen">
                              <aside className="w-[22rem] bg-white dark:bg-gray-700 shadow-md border-r p-5 text-white hidden xl:block overflow-y-hidden" ref={sidebarRef}>
                                        <Sidebar handleSidebarToggle={handleSidebarToggle} handleLogout={handleLogout} />
                              </aside>
                              <main className="flex-1 overflow-y-auto scrollbar-hide p-2">
                                        <header className="flex items-center justify-between bg-white dark:bg-gray-700 shadow-md border py-4 md:py-5 px-5 rounded-2xl sticky top-0 z-50">
                                                  <div className="flex items-center gap-5">
                                                            <div className="group xl:hidden">
                                                                      <div className="border rounded-lg cursor-pointer sm:group-hover:bg-black sm:group-hover:text-white duration-300"
                                                                                onClick={handleSidebarToggle}
                                                                      >
                                                                                <MdSpaceDashboard size={30} className="mx-3 md:mx-4 my-2 md:my-2.5" />
                                                                      </div>
                                                            </div>
                                                            <h2 className="hidden xl:flex text-xl md:text-2xl font-bold justify-center items-center gap-2">Welcome to <Link to="/">{APP_NAME}</Link></h2>
                                                  </div>
                                                  <h2 className="xl:hidden flex text-base md:text-lg font-bold justify-center items-center gap-2"><span className="hidden xl:flex">Welcome to </span><Link to="/">{APP_NAME}</Link></h2>
                                                  <div className="cursor-pointer relative border rounded-full p-1" onClick={() => setAvatarOpen(!avatarOpen)}>
                                                            <Avatar className="size-9 md:size-10">
                                                                      <AvatarImage alt={user?.email} src={user?.image} />
                                                                      <AvatarFallback>{getFallBackImageName(user?.image) || "X"}</AvatarFallback>
                                                            </Avatar>
                                                            {
                                                                      avatarOpen && (
                                                                                <ProfileDropdown user={user} handleLogout={handleLogout} avatarRef={avatarRef} />
                                                                      )
                                                            }
                                                  </div>
                                        </header>
                                        <section className="mt-3 ml-1">
                                                  <Outlet />
                                        </section>
                              </main>
                              <aside className={`fixed inset-y-0 left-0 z-50 w-[85%] md:w-[22rem] bg-white dark:bg-gray-700 shadow-2xl md:shadow-md border-r p-5 transition-all ease-in-out duration-300 text-white xl:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`} ref={sidebarRef}>
                                        <Sidebar handleSidebarToggle={handleSidebarToggle} handleLogout={handleLogout} />
                              </aside>
                    </div>
          )
}