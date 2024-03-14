import Logo from "@/assets/logo.webp";
import { APP_NAME } from "@/constants";
import SocialIcons from './SocialIcons';

export default function Footer() {
          const socialLinks = {
                    facebook: "",
                    instagram: "",
                    twitter: "",
                    linkedIn: "",
                    youtube: ""
          }

          return (
                    <div className='pb-5 mx-3 md:mx-3 lg:mx-0'>
                              <div className='w-full pt-24 text-primary'>
                                        <div className='w-full border px-4 md:px-12 py-4 rounded-3xl'>
                                                  <img src={Logo} draggable={false} alt="logo" className='h-20 w-20 mb-3 select-none rounded-lg' />
                                                  <h1 className='text-2xl md:text-3xl font-bold font-lemonMilk'>{APP_NAME}</h1>
                                                  <p className='font-monospaceTypewriter pt-3'>
                                                            {APP_NAME} provides warmth to those in need during cold seasons. We collect and distribute winter wear to vulnerable individuals and families, ensuring they are equipped to withstand harsh weather conditions. Through community support, we strive to create a world where everyone can access the warmth and protection they deserve.
                                                  </p>
                                                  <ul className='px-4 py-5 list-disc'>
                                                            <li className='font-monospaceTypewriter'><a href="mailto:join@winterwarmthconnect.com" className='duration-300 sm:hover:underline sm:hover:text-gradientPrimary'>join@WinterWarmthConnect.com</a></li>
                                                  </ul>
                                                  <SocialIcons urls={socialLinks} />
                                        </div>
                              </div>

                              <footer className='flex flex-col justify-center items-center h-12 mt-20 gap-4'>
                                        <p className='text-xs md:text-sm text-center font-monospaceTypewriter mx-5 md:mx-auto'>Copyright &copy; {new Date().getFullYear()} <span className='sm:hover:text-gradientPrimary font-bold duration-300 sm:cursor-pointer'>{APP_NAME}</span> - All Rights Reserved.</p>
                              </footer>
                    </div>
          )
}