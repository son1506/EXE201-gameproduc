
import { useEffect, useState } from "react"
import { Table, Typography, Spin, message, Badge } from "antd"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { DollarSign, TrendingUp, ShoppingCart, Calendar, CreditCard, BarChart3, Wallet, Target } from "lucide-react"

const { Title, Text } = Typography
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL

const generateFakeMonthlyRevenue = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const fakeData = []
  for (let day = 1; day <= today.getDate(); day++) {
    const date = new Date(year, month, day)
    const orderCount = Math.floor(Math.random() * 4) // 0–3 đơn
    fakeData.push({
      date: date.toLocaleDateString(),
      amount: orderCount * 10000,
    })
  }
  return fakeData
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
  trend?: number; // Make trend optional
}

const StatCard = ({ title, value, icon, color, subtitle, trend }: StatCardProps) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center`}>{icon}</div>
      {trend !== undefined && (
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${trend > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
        >
          <TrendingUp className={`w-3 h-3 ${trend < 0 ? "rotate-180" : ""}`} />
          {Math.abs(trend).toFixed(1)}%
        </div>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
    </div>
  </div>
)

const PaymentDashboard = () => {
  const [paymentLinks, setPaymentLinks] = useState(() => {
    const stored = localStorage.getItem("paymentLinks")
    return stored ? JSON.parse(stored) : []
  })

  const [loadingLinks, setLoadingLinks] = useState(false)
  const [fakeMonthlyData, setFakeMonthlyData] = useState(() => {
    const stored = localStorage.getItem("fakeMonthlyData")
    return stored ? JSON.parse(stored) : generateFakeMonthlyRevenue()
  })

  const today = new Date().toLocaleDateString()

  // Fetch payment links
  useEffect(() => {
    setLoadingLinks(true)
    fetch(`${BACKEND_URL}/api/payment-links`)
      .then((res) => res.json())
      .then((data) => {
        setPaymentLinks(data)
        localStorage.setItem("paymentLinks", JSON.stringify(data))
      })
      .catch(() => message.error("Không lấy được danh sách payment-links"))
      .finally(() => setLoadingLinks(false))
  }, [])

  // Thêm ngày hôm nay vào fakeMonthlyData nếu chưa có
  useEffect(() => {
    const todayExists = fakeMonthlyData.some((item) => item.date === today)
    if (!todayExists) {
      const newFake = [...fakeMonthlyData, { date: today, amount: 0 }]
      setFakeMonthlyData(newFake)
      localStorage.setItem("fakeMonthlyData", JSON.stringify(newFake))
    }
  }, [fakeMonthlyData, today])

  // Gộp real + fake chart
  const realChartData = paymentLinks
    .map((link) => ({
      date: new Date(link.createdAt).toLocaleDateString(),
      amount: 10000,
    }))
    .reduce((acc, cur) => {
      const found = acc.find((item) => item.date === cur.date)
      if (found) {
        found.amount += cur.amount
      } else {
        acc.push({ ...cur })
      }
      return acc
    }, [])

  const mergedChartData = fakeMonthlyData.map((fake) => {
    const real = realChartData.find((item) => item.date === fake.date)
    return {
      date: fake.date,
      amount: fake.amount + (real?.amount || 0),
    }
  })

  const totalAmount = mergedChartData.reduce((sum, item) => sum + item.amount, 0)
  const todayAmount = mergedChartData.find((item) => item.date === today)?.amount || 0

  const totalOrders = paymentLinks.length
  const todayOrders = paymentLinks.filter((item) => new Date(item.createdAt).toLocaleDateString() === today).length

  // Calculate growth percentage (fake calculation for demo)
  const yesterdayAmount = mergedChartData[mergedChartData.length - 2]?.amount || 0
  const growthPercentage = yesterdayAmount > 0 ? ((todayAmount - yesterdayAmount) / yesterdayAmount) * 100 : 0

  const columns = [
    {
      title: "Order Code",
      dataIndex: "orderCode",
      render: (text) => (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="font-mono text-sm font-medium text-gray-700">{text}</span>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: () => (
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-500" />
          <span className="text-green-600 font-bold">10,000 VND</span>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => <span className="text-gray-600 text-sm">{text}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (val) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600 text-sm">{new Date(val).toLocaleString()}</span>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <Title level={2} className="!mb-0 !text-gray-800">
                💰 Payment Dashboard
              </Title>
              <Text className="text-gray-500">Thống kê doanh thu và đơn hàng</Text>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Badge status="processing" />
            <Text className="text-sm text-gray-600">Cập nhật lần cuối: {new Date().toLocaleString()}</Text>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Doanh thu hôm nay"
            value={`${todayAmount.toLocaleString()} VND`}
            icon={<Wallet className="w-6 h-6 text-white" />}
            color="from-green-400 to-emerald-500"
            subtitle="So với hôm qua"
            trend={growthPercentage}
          />

          <StatCard
            title="Tổng doanh thu tháng"
            value={`${totalAmount.toLocaleString()} VND`}
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            color="from-blue-400 to-blue-600"
            subtitle="Tháng hiện tại"
          />

          <StatCard
            title="Đơn hàng hôm nay"
            value={todayOrders.toString()}
            icon={<ShoppingCart className="w-6 h-6 text-white" />}
            color="from-purple-400 to-purple-600"
            subtitle="Đơn hàng mới"
          />

          <StatCard
            title="Tổng đơn hàng"
            value={totalOrders.toString()}
            icon={<Target className="w-6 h-6 text-white" />}
            color="from-orange-400 to-red-500"
            subtitle="Tất cả đơn hàng"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Revenue Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Biểu đồ doanh thu theo ngày</h3>
                  <p className="text-sm text-gray-500">Doanh thu hàng ngày trong tháng</p>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mergedChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
                    <YAxis
                      domain={[10000, 100000]}
                      ticks={[10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Bar dataKey="amount" fill="url(#colorRevenue)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Revenue Trend */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Xu hướng</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Trung bình/ngày</span>
                  <span className="font-bold text-gray-800">
                    {Math.round(totalAmount / mergedChartData.length).toLocaleString()} VND
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ngày cao nhất</span>
                  <span className="font-bold text-green-600">
                    {Math.max(...mergedChartData.map((d) => d.amount)).toLocaleString()} VND
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tổng giao dịch</span>
                  <span className="font-bold text-blue-600">{totalOrders}</span>
                </div>
              </div>
            </div>

            {/* Mini Line Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-sm font-bold text-gray-800 mb-4">Xu hướng 7 ngày gần nhất</h4>
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mergedChartData.slice(-7)}>
                    <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Links Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">💳 Payment Links</h3>
                <p className="text-sm text-gray-500">Danh sách các giao dịch thanh toán</p>
              </div>
            </div>
          </div>

          <Spin spinning={loadingLinks}>
            <Table
              dataSource={paymentLinks}
              columns={columns}
              rowKey="orderCode"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} giao dịch`,
              }}
              className="!border-none"
              rowClassName="hover:bg-gray-50 transition-colors"
            />
          </Spin>
        </div>
      </div>
    </div>
  )
}

export default PaymentDashboard