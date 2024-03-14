"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TUserDetails } from "@/types"
import { getFallBackImageName } from "@/utils/getImageName"
import { LogOut } from "lucide-react"
import { RefObject } from "react"
import { ModeToggle } from "./mode-toggle"

type TProfileDropdownProps = {
  handleLogout: () => void,
  avatarRef: RefObject<HTMLDivElement>,
  user: TUserDetails,
}

export default function ProfileDropdown({ user, handleLogout, avatarRef }: TProfileDropdownProps) {
  return (
    <div className="absolute -right-5 top-[4.5rem] md:top-[4.7rem] cursor-default" ref={avatarRef}>
      <div className="bg-background shadow-md border rounded-2xl p-2 w-72 z-[999] relative">
        <div className="absolute top-1 right-1 md:hidden">
          <ModeToggle />
        </div>
        <div className="flex justify-center items-center my-4">
          <Avatar className="size-16 border rounded-full">
            <AvatarImage alt={user?.email} src={user?.image} />
            <AvatarFallback>{getFallBackImageName(user?.image) || "X"}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold">{user?.username}</h1>
          <p className="text-gray-500 dark:text-gray-100 text-sm">{user?.email}</p>
          <h1 className="text-gray-500 dark:text-gray-100 my-2 text-center text-sm md:text-balance">
            Welcome to <br /> <span className="font-semibold">Winter Management System</span>
          </h1>
        </div>
        <hr className="my-2" />
        <ul>
          <li className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </li>
        </ul>
      </div>
    </div>
  )
}