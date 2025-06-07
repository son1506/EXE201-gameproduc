import React, { useState, useMemo } from "react";
import { Card, Table, DatePicker, Select, Row, Col, Statistic, Tag } from "antd";
import { BarChartOutlined, CalendarOutlined, RiseOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

const { RangePicker } = DatePicker;
const { Option } = Select;

// Interfaces
interface SaleData {
  date: string;
  product: string;
  quantity: number;
  revenue: number;
}

interface GroupedData {
  period: string;
  totalRevenue: number;
  totalQuantity: number;
}

type ViewType = "day" | "month" | "year";

// Dữ liệu mock doanh thu
const salesData: SaleData[] = [
  { date: "2024-06-01", product: "Sweeties Plushie", quantity: 5, revenue: 1495000 },
  { date: "2024-06-01", product: "Game Soundtrack CD", quantity: 10, revenue: 1500000 },
  { date: "2024-06-02", product: "Sweeties Plushie", quantity: 3, revenue: 897000 },
  { date: "2024-06-02", product: "Game Soundtrack CD", quantity: 8, revenue: 1200000 },
  { date: "2024-06-03", product: "Sweeties Plushie", quantity: 7, revenue: 2093000 },
  { date: "2024-06-03", product: "Game Soundtrack CD", quantity: 12, revenue: 1800000 },
  { date: "2024-06-04", product: "Sweeties Plushie", quantity: 2, revenue: 598000 },
  { date: "2024-06-04", product: "Game Soundtrack CD", quantity: 6, revenue: 900000 },
  { date: "2024-06-05", product: "Sweeties Plushie", quantity: 4, revenue: 1196000 },
  { date: "2024-06-05", product: "Game Soundtrack CD", quantity: 9, revenue: 1350000 },
  { date: "2024-06-06", product: "Sweeties Plushie", quantity: 6, revenue: 1794000 },
  { date: "2024-06-06", product: "Game Soundtrack CD", quantity: 11, revenue: 1650000 },
  { date: "2024-06-07", product: "Sweeties Plushie", quantity: 1, revenue: 299000 },
  { date: "2024-06-07", product: "Game Soundtrack CD", quantity: 4, revenue: 600000 },
];

// Component chính
const RevenuePage: React.FC = () => {
  const [viewType, setViewType] = useState<ViewType>("day");
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | []>([]);

  // Lọc dữ liệu theo khoảng thời gian và nhóm theo ngày/tháng/năm
  const filteredData = useMemo((): GroupedData[] => {
    let filtered: SaleData[] = salesData;

    // Lọc theo khoảng thời gian
    if (dateRange.length === 2 && dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange;
      filtered = salesData.filter((sale: SaleData) =>
        dayjs(sale.date).isBetween(startDate, endDate, "day", "[]")
      );
    }

    // Nhóm dữ liệu theo viewType
    const grouped: Record<string, GroupedData> = {};
    filtered.forEach((sale: SaleData) => {
      let key: string;
      if (viewType === "month") {
        key = dayjs(sale.date).format("YYYY-MM");
      } else if (viewType === "year") {
        key = dayjs(sale.date).format("YYYY");
      } else {
        key = sale.date;
      }

      if (!grouped[key]) {
        grouped[key] = { period: key, totalRevenue: 0, totalQuantity: 0 };
      }
      grouped[key].totalRevenue += sale.revenue;
      grouped[key].totalQuantity += sale.quantity;
    });

    return Object.values(grouped).sort((a, b) => b.period.localeCompare(a.period));
  }, [dateRange, viewType]);

  // Tổng doanh thu và số lượng bán
  const totalRevenue: number = filteredData.reduce((sum, item) => sum + item.totalRevenue, 0);
  const totalQuantity: number = filteredData.reduce((sum, item) => sum + item.totalQuantity, 0);

  // Cột của bảng
  const columns: ColumnsType<GroupedData> = [
    {
      title: "Thời gian",
      dataIndex: "period",
      key: "period",
      render: (period: string) => (
        <Tag color="blue">
          <CalendarOutlined /> {viewType === "month" ? dayjs(period).format("MM/YYYY") : period}
        </Tag>
      ),
    },
    {
      title: "Tổng doanh thu",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      render: (revenue: number) => (
        <span style={{ color: "green", fontWeight: "bold" }}>
          {revenue.toLocaleString()} VND
        </span>
      ),
    },
    {
      title: "Tổng số lượng bán",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      render: (quantity: number) => (
        <Tag color="purple" style={{ fontWeight: "bold" }}>
          {quantity} sản phẩm
        </Tag>
      ),
    },
  ];

  const handleViewTypeChange = (value: ViewType): void => {
    setViewType(value);
  };

  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null): void => {
    setDateRange(dates || []);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Tiêu đề trang */}
      <Card className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <BarChartOutlined className="mr-3 text-green-500" />
          Phân tích doanh thu
        </h1>
        <p className="text-gray-500">Theo dõi doanh thu theo ngày, tháng, năm</p>
      </Card>

      {/* Bộ lọc */}
      <Card className="mb-6">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <label className="block font-semibold mb-2">Xem theo:</label>
            <Select
              value={viewType}
              onChange={handleViewTypeChange}
              className="w-full"
              size="large"
            >
              <Option value="day">📅 Theo ngày</Option>
              <Option value="month">📆 Theo tháng</Option>
              <Option value="year">🗓️ Theo năm</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={16}>
            <label className="block font-semibold mb-2">Khoảng thời gian:</label>
            <RangePicker
              value={dateRange.length === 2 ? [dateRange[0], dateRange[1]] : undefined}
              onChange={handleDateRangeChange}
              className="w-full"
              size="large"
              format="DD/MM/YYYY"
            />
          </Col>
        </Row>
      </Card>

      {/* Thống kê tổng quan */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={totalRevenue}
              prefix={<RiseOutlined />}
              suffix="VND"
              valueStyle={{ color: "#3f8600" }}
              formatter={(value: number) => value.toLocaleString()}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Tổng số lượng bán"
              value={totalQuantity}
              prefix={<BarChartOutlined />}
              suffix="sản phẩm"
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Bảng chi tiết doanh thu */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="period"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
    </div>
  );
};

export default RevenuePage;
