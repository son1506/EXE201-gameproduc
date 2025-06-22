import React, { useEffect, useState } from "react";
import { Card, Table, Typography, Spin, message } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const { Title, Text } = Typography;
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

const generateFakeMonthlyRevenue = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const fakeData = [];
  for (let day = 1; day <= today.getDate(); day++) {
    const date = new Date(year, month, day);
    const orderCount = Math.floor(Math.random() * 4); // 0–3 đơn
    fakeData.push({
      date: date.toLocaleDateString(),
      amount: orderCount * 10000,
    });
  }
  return fakeData;
};

const PaymentDashboard = () => {
  const [paymentLinks, setPaymentLinks] = useState(() => {
    const stored = localStorage.getItem("paymentLinks");
    return stored ? JSON.parse(stored) : [];
  });
  const [loadingLinks, setLoadingLinks] = useState(false);
  const [fakeMonthlyData, setFakeMonthlyData] = useState(() => {
    const stored = localStorage.getItem("fakeMonthlyData");
    return stored ? JSON.parse(stored) : generateFakeMonthlyRevenue();
  });

  useEffect(() => {
    setLoadingLinks(true);
    fetch(`${BACKEND_URL}/api/payment-links`)
      .then((res) => res.json())
      .then((data) => {
        setPaymentLinks(data);
        localStorage.setItem("paymentLinks", JSON.stringify(data));
      })
      .catch(() => message.error("Không lấy được danh sách payment-links"))
      .finally(() => setLoadingLinks(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("fakeMonthlyData", JSON.stringify(fakeMonthlyData));
  }, [fakeMonthlyData]);

  const today = new Date().toLocaleDateString();

  const realChartData = paymentLinks
    .map((link) => ({
      date: new Date(link.createdAt).toLocaleDateString(),
      amount: 10000, // mỗi đơn là 10k
    }))
    .reduce((acc, cur) => {
      const found = acc.find((item) => item.date === cur.date);
      if (found) {
        found.amount += cur.amount;
      } else {
        acc.push({ ...cur });
      }
      return acc;
    }, []);

  const mergedChartData = fakeMonthlyData.map((fake) => {
    const real = realChartData.find((item) => item.date === fake.date);
    return {
      date: fake.date,
      amount: fake.amount + (real?.amount || 0),
    };
  });

  const totalAmount = mergedChartData.reduce((sum, item) => sum + item.amount, 0);
  const todayAmount = mergedChartData.find((item) => item.date === today)?.amount || 0;

  const totalOrders = paymentLinks.length;
  const todayOrders = paymentLinks.filter(
    (item) => new Date(item.createdAt).toLocaleDateString() === today
  ).length;

  const columns = [
    {
      title: "OrderCode",
      dataIndex: "orderCode",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: () => (
        <span style={{ color: "green", fontWeight: 600 }}>10,000 VND</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (val) => new Date(val).toLocaleString(),
    },
  ];

  return (
    <div className="p-6">
      <Title level={3}>Thống kê doanh thu</Title>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <Card>
          <Text strong>Doanh thu hôm nay:</Text>
          <div className="text-xl text-green-600 font-bold">
            {todayAmount.toLocaleString()} VND
          </div>
        </Card>

        <Card>
          <Text strong>Tổng doanh thu tháng:</Text>
          <div className="text-xl text-blue-600 font-bold">
            {totalAmount.toLocaleString()} VND
          </div>
        </Card>

        <Card>
          <Text strong>Đơn hàng hôm nay:</Text>
          <div className="text-xl text-green-600 font-bold">{todayOrders}</div>
        </Card>

        <Card>
          <Text strong>Tổng đơn hàng:</Text>
          <div className="text-xl text-blue-600 font-bold">{totalOrders}</div>
        </Card>
      </div>

      <Card title="Biểu đồ doanh thu theo ngày" className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mergedChartData}>
            <XAxis dataKey="date" />
            <YAxis domain={[10000, 100000]} ticks={[10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000]} />
            <Tooltip />
            <Bar dataKey="amount" fill="#7B61FF" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title={<span>💳 PaymentLinks</span>}>
        <Spin spinning={loadingLinks}>
          <Table
            dataSource={paymentLinks}
            columns={columns}
            rowKey="orderCode"
            pagination={{ pageSize: 10 }}
          />
        </Spin>
      </Card>
    </div>
  );
};

export default PaymentDashboard;