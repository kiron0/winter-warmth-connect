/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from '@/components/loading';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
          responsive: true,
          plugins: {
                    legend: {
                              position: 'top' as const,
                    },
                    title: {
                              display: true,
                              text: 'Monthly Analytics',
                    },
          },
};

export default function PieChart({ chartData }: { chartData: any }) {
          const labels = chartData?.map((data: any) => data.month);

          const data = {
                    labels,
                    datasets: [
                              {
                                        label: 'Users',
                                        data: chartData?.map((data: any) => data?.users),
                                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                              },
                              {
                                        label: 'Clothes',
                                        data: chartData?.map((data: any) => data?.clothes),
                                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                              },
                              {
                                        label: 'Gallery',
                                        data: chartData?.map((data: any) => data?.gallery),
                                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                              },
                    ],
          };

          return (
                    <>
                              {chartData ? (
                                        <Pie data={data} options={options} fallbackContent={<Loading />} />
                              ) : (
                                        <Loading />
                              )}
                    </>
          )
}