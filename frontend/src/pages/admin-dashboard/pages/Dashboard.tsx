import { useAdminOverviewQuery } from '@/hooks/useAdminDashboard';



const DashboardPage = () => {

            const { data, isLoading, isError } = useAdminOverviewQuery();


            if (isLoading) return <div>Loading dashboard...</div>;
            if (isError) return <div>Failed to load dashboard</div>;
            const stats = [
                        { label: 'Total Revenue', value: data?.revenue, change: '+12.5%', positive: true },
                        { label: 'Orders', value: data?.orders, change: '+8.2%', positive: true },
                        { label: 'Customers', value: data?.customers, change: '+23.1%', positive: true },
                        { label: 'Products', value: '156', change: '-2.4%', positive: false },
            ]


            return (
                        <div className="space-y-6">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                {stats.map((stat, index) => (
                                                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                                                        <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                                                        <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                                                                        <p className={`text-sm mt-2 font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                                                                                    {stat.change} from last month
                                                                        </p>
                                                            </div>
                                                ))}
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
                                                            <div className="space-y-4">
                                                                        {[1, 2, 3, 4].map((i) => (
                                                                                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                                                                                <div>
                                                                                                            <p className="font-medium text-gray-800">Order #{1000 + i}</p>
                                                                                                            <p className="text-sm text-gray-500">Customer {i}</p>
                                                                                                </div>
                                                                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                                                                            Completed
                                                                                                </span>
                                                                                    </div>
                                                                        ))}
                                                            </div>
                                                </div>

                                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h3>
                                                            <div className="space-y-4">
                                                                        {['Wireless Headphones', 'Smart Watch', 'Laptop Stand', 'USB-C Cable'].map((product, i) => (
                                                                                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                                                                                <div>
                                                                                                            <p className="font-medium text-gray-800">{product}</p>
                                                                                                            <p className="text-sm text-gray-500">{(150 - i * 20)} units sold</p>
                                                                                                </div>
                                                                                                <span className="text-blue-600 font-semibold">${(99 - i * 10)}</span>
                                                                                    </div>
                                                                        ))}
                                                            </div>
                                                </div>
                                    </div>
                        </div>
            )
}

export default DashboardPage            