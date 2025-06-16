import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Space,
  DatePicker,
  Table,
  Spin,
  message,
} from "antd";
import {
  RiseOutlined,
  ShoppingOutlined,
  BankOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL as string;
const { RangePicker } = DatePicker;

/* ----------------------- types ----------------------- */
interface Transaction {
  orderCode: string | number;
  amount: number;
  status: string;           // backend đã map SUCCEEDED → "PAID"
  bankName?: string;
  channelName?: string;
  createdAt: string;
}
interface TodayStats {
  totalRevenue: number;
  totalOrders: number;
}

/* ------------------ date presets --------------------- */
type Preset =
  | "yesterday"
  | "today"
  | "thisWeek"
  | "thisMonth"
  | "lastMonth"
  | "thisYear"
  | "lastYear"
  | "custom";

function presetRange(p: Preset): [Dayjs, Dayjs] {
  const d = dayjs();
  switch (p) {
    case "yesterday":
      return [d.subtract(1, "day").startOf("day"), d.subtract(1, "day").endOf("day")];
    case "today":
      return [d.startOf("day"), d.endOf("day")];
    case "thisWeek":
      return [d.startOf("week"), d.endOf("week")];
    case "thisMonth":
      return [d.startOf("month"), d.endOf("month")];
    case "lastMonth": {
      const m = d.subtract(1, "month");
      return [m.startOf("month"), m.endOf("month")];
    }
    case "thisYear":
      return [d.startOf("year"), d.endOf("year")];
    case "lastYear": {
      const y = d.subtract(1, "year");
      return [y.startOf("year"), y.endOf("year")];
    }
    default:
      return [d.startOf("day"), d.endOf("day")];
  }
}

/* =================== component ======================= */
const RevenuePage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [todayStats, setTodayStats] = useState<TodayStats>({ totalRevenue: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(false);

  const [preset, setPreset] = useState<Preset>("today");
  const [range, setRange] = useState<[Dayjs, Dayjs]>(presetRange("today"));

  /* -------- fetch transactions once -------- */
  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/transactions`)
      .then(r => r.json())
      .then(setTransactions)
      .catch(() => message.error("Không thể tải danh sách giao dịch"))
      .finally(() => setLoading(false));
  }, []);

  /* -------- fetch stats today -------- */
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/stats/today`)
      .then(r => r.json())
      .then(setTodayStats)
      .catch(() => message.error("Không thể tải thống kê hôm nay"));
  }, []);

  /* -------- filter & aggregate -------- */
  const paidInRange = useMemo(
    () =>
      transactions.filter(
        (t) =>
          t.status === "PAID" &&
          dayjs(t.createdAt).isBetween(range[0], range[1], "day", "[]")
      ),
    [transactions, range]
  );

  const totalRevenue =
    preset === "today" ? todayStats.totalRevenue : paidInRange.reduce((s, t) => s + t.amount, 0);

  const totalOrders =
    preset === "today" ? todayStats.totalOrders : paidInRange.length;

  const sumBy = (key: "bankName" | "channelName") =>
    paidInRange.reduce<Record<string, number>>((acc, t) => {
      const k = t[key] || "Khác";
      acc[k] = (acc[k] || 0) + t.amount;
      return acc;
    }, {});

  const revenueByBank = Object.entries(sumBy("bankName")).map(([bank, amount]) => ({ bank, amount }));
  const revenueByChannel = Object.entries(sumBy("channelName")).map(([channel, amount]) => ({ channel, amount }));

  const money = (v: number) => `${v.toLocaleString()}VND`;

  /* -------------------- UI -------------------- */
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* filter bar */}
      <Card className="mb-5">
        <Space wrap>
          {(
            [
              ["Hôm qua", "yesterday"],
              ["Hôm nay", "today"],
              ["Tuần này", "thisWeek"],
              ["Tháng này", "thisMonth"],
              ["Tháng trước", "lastMonth"],
              ["Năm nay", "thisYear"],
              ["Năm trước", "lastYear"],
            ] as [string, Preset][]
          ).map(([label, key]) => (
            <Button
              key={key}
              type={preset === key ? "primary" : "default"}
              onClick={() => {
                setPreset(key);
                setRange(presetRange(key));
              }}
            >
              {label}
            </Button>
          ))}

          <RangePicker
            value={preset === "custom" ? range : undefined}
            onChange={(v) => {
              if (!v) return;
              setPreset("custom");
              setRange([v[0] as Dayjs, v[1] as Dayjs]);
            }}
            format="DD/MM/YYYY"
          />
        </Space>
      </Card>

      {/* kpi tiles */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} md={12}>
          <Card
            style={{ background: "linear-gradient(135deg,#7c4dff 0%,#6a1b9a 100%)", color: "#fff" }}
            bodyStyle={{ padding: 24 }}
          >
            <Statistic
              title="Tổng doanh thu"
              value={totalRevenue}
              prefix={<RiseOutlined />}
              suffix="VND"
              valueStyle={{ color: "#fff" }}
              formatter={(v) => Number(v).toLocaleString()}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card style={{ background: "#f3f1ff" }} bodyStyle={{ padding: 24 }}>
            <Statistic
              title="Tổng đơn hàng"
              value={totalOrders}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: "#4b39ef" }}
            />
          </Card>
        </Col>
      </Row>

      {/* tables */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title={<><BankOutlined /> Doanh thu theo ngân hàng</>}>
            {loading ? (
              <Spin />
            ) : (
              <Table
                dataSource={revenueByBank}
                rowKey="bank"
                pagination={false}
                size="small"
                columns={[
                  { title: "Ngân hàng", dataIndex: "bank", key: "bank" },
                  { title: "Doanh thu", dataIndex: "amount", key: "amount", render: money },
                ]}
              />
            )}
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title={<><LinkOutlined /> Doanh thu theo kênh thanh toán</>}>
            {loading ? (
              <Spin />
            ) : (
              <Table
                dataSource={revenueByChannel}
                rowKey="channel"
                pagination={false}
                size="small"
                columns={[
                  { title: "Kênh", dataIndex: "channel", key: "channel" },
                  { title: "Doanh thu", dataIndex: "amount", key: "amount", render: money },
                ]}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RevenuePage;
