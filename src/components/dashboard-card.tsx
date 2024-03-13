export default function DashboardCard({ children, className, title }: { children: React.ReactNode, className?: string, title: string }) {
          return (
                    <div className={`shadow-sm border rounded-2xl p-5 ${className}`}>
                              <h1 className="text-lg md:text-xl font-bold mb-4">{title}</h1>
                              {children}
                    </div>
          )
}