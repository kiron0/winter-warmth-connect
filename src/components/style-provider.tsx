import Navbar from '@/pages/Home/Navbar';
import { currentUserDetails } from "@/redux/features/user/userSlice";
import { useAppSelector } from "@/redux/hooks";

export default function StyleProvider({ children }: { children: React.ReactNode }) {
          const user = useAppSelector(currentUserDetails);

          return (
                    <div className="w-full max-w-7xl mx-auto">
                              <Navbar user={user} />
                              <div className='pt-5 md:pt-10 pb-16'>
                                        {children}
                              </div>
                    </div>
          )
}