import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

interface SocialIcon {
          urls: {
                    facebook: string,
                    instagram: string,
                    twitter: string,
                    linkedIn: string,
                    youtube: string
          }
}

export default function SocialIcons({ urls }: SocialIcon) {
          const socialIcons = [
                    {
                              url: urls?.facebook,
                              icon: <FaFacebook className='text-xl sm:group-hover:text-primary-foreground duration-300' />
                    },
                    {
                              url: urls?.instagram,
                              icon: <FaInstagram className='text-xl sm:group-hover:text-primary-foreground duration-300' />
                    },
                    {
                              url: urls?.twitter,
                              icon: <FaTwitter className='text-xl sm:group-hover:text-primary-foreground duration-300' />
                    },
                    {
                              url: urls?.youtube,
                              icon: <FaYoutube className='text-xl sm:group-hover:text-primary-foreground duration-300' />
                    }
          ]

          return (
                    <div className='flex justify-start gap-5'>
                              {
                                        socialIcons.map((item, index) => (
                                                  <div className='group sm:cursor-pointer' key={index}>
                                                            <div className='border p-2 rounded-full sm:group-hover:bg-primary duration-300'
                                                                      onClick={() => window.open(item.url, '_blank')}
                                                            >
                                                                      {item.icon}
                                                            </div>
                                                  </div>
                                        ))
                              }
                    </div>
          )
}