import Loading from "@/components/loading";
import useAuth from "@/hooks/useAuth";
import Home from "@/pages/Home/Home";

export default function MainLayout() {
          const { isLoading } = useAuth();

          return (
                    <>
                              {
                                        isLoading ? (
                                                  <Loading className="h-screen" />
                                        ) : (
                                                  <Home />
                                        )
                              }
                    </>
          )
}