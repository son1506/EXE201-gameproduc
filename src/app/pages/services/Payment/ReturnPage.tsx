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
    // Read query parameters from URL
    const code = searchParams.get("code") || "";
    const id = searchParams.get("id") || "";
    const cancel = searchParams.get("cancel") === "true";
    const status = searchParams.get("status") || "";
    const orderCode = searchParams.get("orderCode") || "";
    const pendingAmount = Number(localStorage.getItem("pendingAmount")) || 0;

    // Log for debugging if needed
    console.log("code:", code);
    console.log("status:", status);
    console.log("cancel:", cancel);
    console.log("orderCode:", orderCode);
    console.log("pendingAmount:", pendingAmount);

    // Update transaction details
    setTransactionDetails({
      code,
      id,
      cancel,
      status,
      orderCode,
      amount: pendingAmount,
    });

    // Check transaction status
    if (code === "00" && status === "PAID" && !cancel) {
      setTransactionStatus("Payment successful!");

      // Update balance to localStorage (if needed for later use)
      const currentBalance = Number(localStorage.getItem("userBalance")) || 0;
      const newBalance = currentBalance + pendingAmount;
      localStorage.setItem("userBalance", newBalance.toString());

      // Clear temporary data after processing
      localStorage.removeItem("pendingAmount");
      localStorage.removeItem("pendingOrderCode");

      message.success("Payment successful!");
    } else if (code === "00" && (status === "CANCELLED" || cancel)) {
      setTransactionStatus("Transaction cancelled.");
      message.warning("Transaction cancelled.");
    } else if (code === "01") {
      setTransactionStatus("Invalid transaction due to incorrect parameters.");
      message.error("Invalid transaction.");
    } else {
      setTransactionStatus("Transaction processing or unknown status.");
      message.info("Transaction processing.");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-3xl font-bold text-pink-500 mb-6">{transactionStatus}</h1>

        {/* Display transaction details */}
        <Card title="Transaction Details" bordered={false} className="mb-6">
          <Descriptions column={1}>
            <Descriptions.Item label="Response code">{transactionDetails.code}</Descriptions.Item>
            <Descriptions.Item label="Transaction ID">{transactionDetails.id}</Descriptions.Item>
            <Descriptions.Item label="Cancel status">{transactionDetails.cancel ? "Yes" : "No"}</Descriptions.Item>
            <Descriptions.Item label="Payment status">{transactionDetails.status}</Descriptions.Item>
            <Descriptions.Item label="Order code">{transactionDetails.orderCode}</Descriptions.Item>
            <Descriptions.Item label="Top-up amount">
              {transactionDetails.amount.toLocaleString()} VND
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Back Button */}
        <Button
          type="primary"
          onClick={() => navigate("/payos-redirect")}
          className="w-full h-10 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg flex items-center justify-center"
        >
          Back
        </Button>
      </div>
    </div>
  );
}
