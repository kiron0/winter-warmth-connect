import DashboardCard from "@/components/dashboard-card";
import DashboardTitle from "@/components/dashboard-title";
import Loading from "@/components/loading";
import OverviewCard from "@/components/overview-card";
import PieChart from "@/components/pie-chart";
import { useGetAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoImage } from "react-icons/io5";

export default function Index() {
          const { data, isLoading } = useGetAnalyticsQuery(undefined);
          const analytics = data?.data;

          return (
                    <>
                              <DashboardTitle title='Dashboard' subtitle='Overview' />
                              {
                                        isLoading ? (
                                                  <Loading />
                                        ) : (
                                                  <div className='pb-10'>
                                                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                                                                      <OverviewCard
                                                                                title="Total Winter Clothes"
                                                                                description={analytics?.clothes?.total || 0}
                                                                                icon={<FaPeopleGroup />}
                                                                                percentage={`${analytics?.clothes?.percentage || 0}% from total clothes`}
                                                                      />
                                                                      <OverviewCard
                                                                                title="Total Users"
                                                                                description={analytics?.users?.total || 0}
                                                                                icon={<FaPeopleGroup />}
                                                                                percentage={`${analytics?.users?.percentage || 0}% from total users`}
                                                                      />
                                                                      <OverviewCard
                                                                                title="Total Gallery Images"
                                                                                description={analytics?.gallery?.total || 0}
                                                                                icon={<IoImage />}
                                                                                percentage={`${analytics?.gallery?.percentage || 0}% from total images`}
                                                                      />
                                                            </div>
                                                            <div className='mt-10'>
                                                                      <DashboardCard title='Visual overview' className='w-full md:w-2/3 lg:w-1/3'>
                                                                                <PieChart chartData={analytics?.pieChartData} />
                                                                      </DashboardCard>
                                                            </div>
                                                  </div>
                                        )
                              }
                    </>
          )
}