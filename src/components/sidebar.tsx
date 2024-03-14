"use client"

import Logo from "@/assets/logo.png";
import DashboardLink from "@/components/dashboard-link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/constants";
import { LogOut } from "lucide-react";
import { BiSolidTShirt } from "react-icons/bi";
import { FaQuoteLeft } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import { IoImage } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Sidebar({ handleSidebarToggle, handleLogout }: { handleSidebarToggle: () => void, handleLogout: () => void }) {
          return (
                    <>
                              <div className="my-5">
                                        <Link to="/" className="flex flex-col justify-center items-center">
                                                  <img
                                                            alt="Logo"
                                                            className="w-20 md:w-24"
                                                            src={Logo}
                                                  />
                                                  <h1 className="mt-2 text-xl font-semibold text-black dark:text-white">{APP_NAME}</h1>
                                                  <p className="text-sm text-black dark:text-white text-center">
                                                            Winter clothes management system
                                                  </p>
                                        </Link>
                              </div>
                              <hr className="mb-5" />
                              <div className="w-full h-full">
                                        <div className="h-[calc(100vh-18.5rem)] md:h-[calc(100vh-20rem)] overflow-y-auto scrollbar-hide w-full">
                                                  <nav className="space-y-3">
                                                            <DashboardLink
                                                                      title="Dashboard"
                                                                      to="/dashboard"
                                                                      icon={<MdSpaceDashboard size={22} />}
                                                                      handleSidebarToggle={handleSidebarToggle}
                                                            />
                                                            <DashboardLink
                                                                      title="Winter Clothes"
                                                                      to="/dashboard/winter-clothes"
                                                                      icon={<GiClothes size={22} />}
                                                                      handleSidebarToggle={handleSidebarToggle}
                                                            />
                                                            <DashboardLink
                                                                      title="Create Winter Clothes"
                                                                      to="/dashboard/create-winter-clothes"
                                                                      icon={<BiSolidTShirt size={20} />}
                                                                      handleSidebarToggle={handleSidebarToggle}
                                                            />
                                                            <DashboardLink
                                                                      title="Create Testimonial"
                                                                      to="/dashboard/create-testimonial"
                                                                      icon={<FaQuoteLeft size={20} />}
                                                                      handleSidebarToggle={handleSidebarToggle}
                                                            />
                                                            <DashboardLink
                                                                      title="Gallery"
                                                                      to="/dashboard/gallery"
                                                                      icon={<IoImage size={20} />}
                                                                      handleSidebarToggle={handleSidebarToggle}
                                                            />
                                                  </nav>
                                        </div>
                                        <div className="pt-3 flex w-full">
                                                  <Button variant="outline" className={`w-full flex justify-start items-center gap-2 text-sm md:text-base text-primary h-12 md:h-[3.5rem]`}
                                                            onClick={() => {
                                                                      typeof window !== "undefined" && window.innerWidth < 1024 ? handleSidebarToggle : undefined;
                                                                      handleLogout();
                                                            }}>
                                                            <LogOut size={20} /> Logout
                                                  </Button>
                                        </div>
                              </div>
                    </>
          )
}