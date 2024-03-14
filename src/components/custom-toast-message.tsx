
import Logo from "@/assets/logo.webp";
import { cn } from "@/lib/utils";

type ToastProps = {
          title: string,
          subtitle: string,
          titleClassName?: string,
          subtitleClassName?: string,
};

export default function CustomToastMessage({ title, subtitle, titleClassName, subtitleClassName }: ToastProps) {
          return (
                    <div className={`animate-leave shadow-xl rounded-lg bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border pointer-events-auto w-full flex`}
                              style={{ padding: '0.75rem 1rem', width: '20rem', borderRadius: '0.5rem' }}
                    >
                              <div className="flex-1 w-0">
                                        <div className="flex items-center justify-center gap-3">
                                                  <div className="flex-shrink-0">
                                                            <img
                                                                      draggable={false}
                                                                      className="h-10 w-10 select-none"
                                                                      src={Logo}
                                                                      alt={'Winger Clothes Management Logo'}
                                                            />
                                                  </div>
                                                  <div className="ml-3 w-0 flex-1 py-1.5">
                                                            <p className={cn("text-sm font-semibold text-primary", titleClassName)}>
                                                                      {title}
                                                            </p>
                                                            <p className={cn("mt-1 text-sm text-primary", subtitleClassName)}>
                                                                      {subtitle}
                                                            </p>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}
