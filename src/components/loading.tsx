import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"

export default function Loading({ className }: { className?: string }) {
          return (
                    <div className={cn("flex justify-center items-center h-96", className)}>
                              <Loader size={30} className="animate-spin" />
                    </div>
          )
}