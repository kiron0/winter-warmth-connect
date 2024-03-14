import { NavLink } from "react-router-dom";

type NavLinkItemProps = {
          title: string;
          path: string;
}

export default function NavLinkItem({ title, path }: NavLinkItemProps) {
          return (
                    <NavLink
                              to={path}
                              className={({ isActive }) =>
                                        isActive ? "bg-primary text-primary-foreground transition duration-300 py-2 px-3 rounded-full" : `border transition duration-300 py-2 px-3 rounded-full sm:hover:bg-primary sm:hover:text-primary-foreground`
                              }
                    >
                              {title}
                    </NavLink>
          )
}