import { ReactNode } from "react";

type DashboardCardProps = {
          title: string,
          description: string,
          icon: ReactNode,
          percentage?: string
}

export default function OverviewCard({ title, description, icon, percentage }: DashboardCardProps) {
          return (
                    <div className="shadow-sm border rounded-2xl flex justify-between p-5 py-8">
                              <div>
                                        <p className="font-bold text-base mb-2">{title}</p>
                                        <h3 className="text-2xl font-bold">{description}</h3>
                                        {percentage ? <small className="text-gray-500 text-xs">{percentage}</small>
                                                  : <small className="text-gray-500 text-xs">20.1% from last month</small>}
                              </div>
                              <div>
                                        {icon}
                              </div>
                    </div>
          )
}