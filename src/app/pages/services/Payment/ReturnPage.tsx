import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { message, Button, Card, Descriptions } from "antd";

export default function ReturnPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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

    // Ghi log để debug nếu cần
    console.log("code:", code);
    console.log("status:", status);
    console.log("cancel:", cancel);
    console.log("orderCode:", orderCode);
    console.log("pendingAmount:", pendingAmount);

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
    if (code === "00" && status === "PAID" && !cancel) {
      setTransactionStatus("Thanh toán thành công!");

      // Cập nhật số dư vào localStorage (nếu cần dùng sau này)
      const currentBalance = Number(localStorage.getItem("userBalance")) || 0;
      const newBalance = currentBalance + pendingAmount;
      localStorage.setItem("userBalance", newBalance.toString());

      // Xóa dữ liệu tạm sau khi xử lý
      localStorage.removeItem("pendingAmount");
      localStorage.removeItem("pendingOrderCode");

      message.success("Thanh toán thành công!");
    } else if (code === "00" && (status === "CANCELLED" || cancel)) {
      setTransactionStatus("Giao dịch đã bị hủy.");
      message.warning("Giao dịch đã bị hủy.");
    } else if (code === "01") {
      setTransactionStatus("Giao dịch không hợp lệ do tham số không đúng.");
      message.error("Giao dịch không hợp lệ.");
    } else {
      setTransactionStatus("Giao dịch đang xử lý hoặc không xác định.");
      message.info("Giao dịch đang xử lý.");
    }
  }, [searchParams]);

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

        {/* Nút Quay Lại */}
        <Button
          type="primary"
          onClick={() => navigate("/payos-redirect")}
          className="w-full h-10 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg flex items-center justify-center"
        >
          Quay Lại
        </Button>
      </div>
    </div>
  );
}
