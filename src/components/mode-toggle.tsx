import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "@/components/theme-provider";

export function ModeToggle({ onClose }: { onClose?: () => void }) {
          const { setTheme, theme } = useTheme();

          const handleThemeChange = () => {
                    setTheme(theme === 'light' ? 'dark' : 'light');
                    typeof window !== "undefined" && localStorage.setItem("theme", theme === 'light' ? 'dark' : 'light');
                    onClose && onClose();
          }

          return (
                    <div className={`sm:cursor-pointer flex items-center gap-2 rounded-lg shadow-sm text-sm md:text-base p-2 outline-none border-none`} onClick={handleThemeChange}>
                              {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
                    </div>
          )
}
