import { Loader } from "lucide-react"

export default function Loading() {
          return (
                    <div className="flex justify-center items-center h-96">
                              <Loader size={30} className="animate-spin" />
                    </div>
          )
}