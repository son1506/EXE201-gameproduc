import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { message, Button, Card, Descriptions } from "antd";

export default function ReturnPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(0);
  const [transactionStatus, setTransactionStatus] = useState<string>("");
  const [transactionDetails, setTransactionDetails] = useState({
    code: "",
    id: "",
    cancel: false,
    status: "",
    orderCode: "",
    amount: 0,
  });

  useEffect(() => {
    // Đọc query parameters từ URL
    const code = searchParams.get("code") || "";
    const id = searchParams.get("id") || "";
    const cancel = searchParams.get("cancel") === "true";
    const status = searchParams.get("status") || "";
    const orderCode = searchParams.get("orderCode") || "";
    const pendingAmount = Number(localStorage.getItem("pendingAmount")) || 0;
    const pendingOrderCode = localStorage.getItem("pendingOrderCode") || "";

    // Cập nhật transaction details
    setTransactionDetails({
      code,
      id,
      cancel,
      status,
      orderCode,
      amount: pendingAmount,
    });

    // Kiểm tra trạng thái giao dịch
    if (code === "00" && status === "PAID" && !cancel && orderCode === pendingOrderCode) {
      // Giao dịch thành công
      setTransactionStatus("Thanh toán thành công!");

      // Lấy số dư hiện tại từ localStorage
      const currentBalance = Number(localStorage.getItem("userBalance")) || 0;

      // Cập nhật số dư mới
      const newBalance = currentBalance + pendingAmount;
      localStorage.setItem("userBalance", newBalance.toString());
      setBalance(newBalance);

      // Xóa dữ liệu tạm sau khi xử lý
      localStorage.removeItem("pendingAmount");
      localStorage.removeItem("pendingOrderCode");

      message.success("Thanh toán thành công!");
    } else if (code === "00" && (status === "CANCELLED" || cancel)) {
      // Giao dịch bị hủy
      setTransactionStatus("Giao dịch đã bị hủy.");
      setBalance(Number(localStorage.getItem("userBalance")) || 0);
      message.warning("Giao dịch đã bị hủy.");
    } else if (code === "01") {
      // Invalid Params
      setTransactionStatus("Giao dịch không hợp lệ do tham số không đúng.");
      setBalance(Number(localStorage.getItem("userBalance")) || 0);
      message.error("Giao dịch không hợp lệ.");
    } else {
      // Trạng thái khác
      setTransactionStatus("Giao dịch đang xử lý hoặc không xác định.");
      setBalance(Number(localStorage.getItem("userBalance")) || 0);
      message.info("Giao dịch đang xử lý.");
    }
  }, [searchParams]);

  // Hàm reset số dư (dùng cho testing)
  const handleResetBalance = () => {
    localStorage.setItem("userBalance", "0");
    setBalance(0);
    message.info("Đã reset số dư về 0.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-3xl font-bold text-pink-500 mb-6">{transactionStatus}</h1>

        {/* Hiển thị chi tiết giao dịch */}
        <Card title="Chi Tiết Giao Dịch" bordered={false} className="mb-6">
          <Descriptions column={1}>
            <Descriptions.Item label="Mã phản hồi (code)">{transactionDetails.code}</Descriptions.Item>
            <Descriptions.Item label="ID giao dịch">{transactionDetails.id}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái hủy">{transactionDetails.cancel ? "Có" : "Không"}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái thanh toán">{transactionDetails.status}</Descriptions.Item>
            <Descriptions.Item label="Mã đơn hàng">{transactionDetails.orderCode}</Descriptions.Item>
            <Descriptions.Item label="Số tiền nạp">
              {transactionDetails.amount.toLocaleString()} VND
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Hiển thị số dư */}
        <p className="text-lg text-gray-700 mb-4">
          Số dư hiện tại: <span className="font-bold">{balance.toLocaleString()} VND</span>
        </p>

        {/* Nút Reset và Quay Lại */}
        <div className="space-y-4">
          <Button
            type="primary"
            onClick={() => navigate("/payos-redirect")}
            className="w-full h-10 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg flex items-center justify-center"
          >
            Quay Lại
          </Button>
          <Button
            onClick={handleResetBalance}
            className="w-full h-10 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg flex items-center justify-center"
          >
            Reset Số Dư
          </Button>
        </div>
      </div>
    </div>
  );
}