"use client"

import { Link, useLocation } from "react-router-dom";

interface DashboardLinkProps {
          to: string;
          title: string;
          icon?: React.ReactNode;
          handleSidebarToggle: () => void;
}

export default function DashboardLink({ handleSidebarToggle, icon, to, title }: DashboardLinkProps) {
          const { pathname } = useLocation();

          return (
                    <Link className={`flex items-center gap-2 rounded-lg shadow-sm border text-sm md:text-base py-3 px-3 md:py-3.5 sm:hover:bg-primary sm:hover:text-white dark:sm:hover:text-black duration-300 ${pathname === to ? "bg-primary text-white dark:text-black" : "text-black dark:text-white"}`}
                              to={to}
                              onClick={typeof window !== "undefined" && window.innerWidth < 1024 ? handleSidebarToggle : undefined}>
                              {icon} {title}
                    </Link>
          )
}