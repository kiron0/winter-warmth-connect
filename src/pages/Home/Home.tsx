import ScrollToTop from "@/components/scroll-to-top";
import useAuth from "@/hooks/useAuth";
import Banner from "@/pages/Home/Banner";
import Clothes from "@/pages/Home/Clothes";
import Footer from "@/pages/Home/Footer/Footer";
import Gallery from "@/pages/Home/Gallery/Gallery";
import Navbar from "@/pages/Home/Navbar";
import Testimonial from "@/pages/Home/Testimonial";
import WhoAreWe from "@/pages/Home/WhoAreWe";
import WhyJoinNow from "@/pages/Home/WhyJoinNow";

export default function Home() {
          const { isValidUser: user } = useAuth();

          return (
                    <div className="w-full max-w-7xl mx-auto">
                              <Navbar user={user} />
                              <Banner user={user} />
                              <Clothes />
                              <Testimonial />
                              <WhoAreWe />
                              <WhyJoinNow user={user} />
                              <Gallery />
                              <Footer />
                              <ScrollToTop />
                    </div>
          )
}