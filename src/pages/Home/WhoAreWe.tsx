import BG from "@/assets/who-are-we.jpg";
import { APP_NAME } from "@/constants";

export default function WhoAreWe() {
          return (
                    <div className='pb-10 md:px-12 my-10 px-6 md:my-16 py-12'>
                              <div className="pb-12">
                                        <h1 className='text-2xl md:text-3xl lg:text-4xl py-4 text-center font-lemonMilk text-black'>Who Are We</h1>
                                        <p className='w-full mx-auto text-base md:text-lg text-center font-monospaceTypewriter text-black px-1'>
                                                  Learn more about our mission, vision, and values. How we are working to make a difference in the lives of those facing winter clothing insecurity.
                                        </p>
                              </div>
                              <div>
                                        <img src={BG} draggable={false} alt="who-are-we" className='w-full h-96 object-cover object-top rounded-3xl border-4 shadow-md mb-5' />
                                        <div className="mt-8 w-full space-y-7">
                                                  <p className='text-base md:text-lg font-monospaceTypewriter text-black px-1'>
                                                            We are {APP_NAME}, a community-driven initiative dedicated to ensuring that no one faces the bitter cold of winter without the warmth and protection they deserve. Founded by a group of passionate individuals who recognized the pressing need for accessible winter clothing resources in our community, we have come together with a shared vision of creating a world where everyone has the essential clothing they need to stay safe and comfortable during the chilly months.
                                                  </p>
                                                  <p className='text-base md:text-lg font-monospaceTypewriter text-black px-1'>
                                                            Our team is comprised of volunteers, donors, and partners who are united by a common commitment to compassion, equity, and social justice. We believe that by working collaboratively and harnessing the collective power of our community, we can make a meaningful impact in the lives of those facing winter clothing insecurity.
                                                  </p>
                                                  <p className='text-base md:text-lg font-monospaceTypewriter text-black px-1'>
                                                            At {APP_NAME}, we are more than just an organization – we are a movement fueled by empathy, solidarity, and a shared sense of responsibility towards our neighbors in need. Together, we are dedicated to spreading warmth, kindness, and hope, one winter garment at a time.
                                                  </p>
                                        </div>
                              </div>
                    </div>
          )
}