import { HiArrowLongLeft } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

interface DashboardTitleProps {
          title: string;
          subtitle: string;
          isBackVisible?: boolean;
}

export default function DashboardTitle({ title, subtitle, isBackVisible }: DashboardTitleProps) {
          const navigate = useNavigate();

          const back = () => {
                    navigate(-1);
          }

          return (
                    <section>
                              <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                                        {isBackVisible && (
                                                  <Link to="#" onClick={() => back()}>
                                                            <HiArrowLongLeft className="sm:cursor-pointer" />
                                                  </Link>
                                        )}
                                        {title}
                              </h1>
                              <p className="text-gray-500 text-sm md:text-base mb-5">{subtitle}</p>
                    </section>
          )
}