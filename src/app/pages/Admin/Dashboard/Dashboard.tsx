import React, { useEffect, useState } from "react";
import { Card, Table, Tag, message, Tabs, Spin, Row, Col } from "antd";
import {
  CreditCardOutlined,
  SwapOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { TabPane } = Tabs;
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

/* ---------- Kiểu dữ liệu ---------- */
interface PaymentLink {
  orderCode: string | number;
  amount: number;
  status: string;
  checkoutUrl: string;
  description?: string;
  createdAt: string;
}

interface Transaction {
  orderCode: string | number;
  amount: number;
  status: string;
  description?: string;
  bankName?: string;
  channelName?: string;
  createdAt: string;
}

/* ---------- Component ---------- */
const PaymentDashboard: React.FC = () => {
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingLinks, setLoadingLinks] = useState(false);
  const [loadingTxs, setLoadingTxs] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  // Tải danh sách payment-links
  useEffect(() => {
    setLoadingLinks(true);
    fetch(`${BACKEND_URL}/api/payment-links`)
      .then((r) => r.json())
      .then(setPaymentLinks)
      .catch(() => message.error("Không lấy được danh sách payment-link"))
      .finally(() => setLoadingLinks(false));
  }, []);

  // Tính tổng doanh thu & số đơn hàng bao gồm PAID và PENDING
  useEffect(() => {
    const validLinks = paymentLinks.filter(
      (link) => link.status === "PAID" || link.status === "PENDING"
    );
    const total = validLinks.reduce((sum, link) => sum + link.amount, 0);
    setTotalAmount(total);
    setOrderCount(validLinks.length);
  }, [paymentLinks]);

  // Tải danh sách giao dịch
  useEffect(() => {
    setLoadingTxs(true);
    fetch(`${BACKEND_URL}/api/transactions`)
      .then((r) => r.json())
      .then(setTransactions)
      .catch(() => message.error("Không lấy được danh sách giao dịch"))
      .finally(() => setLoadingTxs(false));
  }, []);

  const moneyRender = (v: number) => (
    <span style={{ fontWeight: 600, color: "#3f8600" }}>
      {v.toLocaleString()} VND
    </span>
  );

  const statusTag = (st: string) => {
    const map: Record<string, string> = {
      PAID: "green",
      PENDING: "orange",
      CANCELED: "red",
      EXPIRED: "red",
    };
    return <Tag color={map[st] || "blue"}>{st}</Tag>;
  };

  const paymentCols: ColumnsType<PaymentLink> = [
    { title: "OrderCode", dataIndex: "orderCode", key: "orderCode" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: moneyRender,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: statusTag,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (d) => new Date(d).toLocaleString(),
    },
    {
      title: "Checkout URL",
      dataIndex: "checkoutUrl",
      key: "checkoutUrl",
      render: (url: string) => (
        <a href={url} target="_blank" rel="noreferrer">
          Mở&nbsp;link
        </a>
      ),
    },
  ];

  const txCols: ColumnsType<Transaction> = [
    { title: "OrderCode", dataIndex: "orderCode", key: "orderCode" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: moneyRender,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: statusTag,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (d) => new Date(d).toLocaleString(),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Row gutter={16} className="mb-6">
        <Col span={12}>
          <Card style={{ background: "#7B61FF", color: "white" }}>
            <p>Tổng doanh thu hôm nay</p>
            <h2 style={{ fontSize: 28 }}>
              {totalAmount.toLocaleString()} VND
            </h2>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ background: "#EFE7FD", color: "#7B61FF" }}>
            <p>Tổng đơn hàng hôm nay</p>
            <h2 style={{ fontSize: 28 }}>{orderCount} đơn hàng</h2>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="links" type="card">
        <TabPane
          tab={
            <span>
              <DollarOutlined /> PaymentLinks
            </span>
          }
          key="links"
        >
          <Card>
            {loadingLinks ? (
              <Spin className="w-full py-14" />
            ) : (
              <Table
                rowKey="orderCode"
                columns={paymentCols}
                dataSource={paymentLinks}
                pagination={{ pageSize: 10, showSizeChanger: true }}
                scroll={{ x: 1000 }}
              />
            )}
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <SwapOutlined /> Giao dịch
            </span>
          }
          key="txs"
        >
          <Card>
            {loadingTxs ? (
              <Spin className="w-full py-14" />
            ) : (
              <Table
                rowKey="orderCode"
                columns={txCols}
                dataSource={transactions}
                pagination={{ pageSize: 10, showSizeChanger: true }}
                scroll={{ x: 800 }}
              />
            )}
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PaymentDashboard;
