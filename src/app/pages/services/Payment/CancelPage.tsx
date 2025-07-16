import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { message, Button, Card, Descriptions } from "antd";

export default function CancelPage() {
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
    // Read query parameters from cancelUrl
    const code = searchParams.get("code") || "";
    const id = searchParams.get("id") || "";
    const cancel = searchParams.get("cancel") === "true";
    const status = searchParams.get("status") || "";
    const orderCode = searchParams.get("orderCode") || "";
    const pendingAmount = Number(localStorage.getItem("pendingAmount")) || 0;

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
    if (code === "00" && (status === "CANCELLED" || cancel)) {
      setTransactionStatus("Transaction cancelled.");
      setBalance(Number(localStorage.getItem("userBalance")) || 0);
      message.warning("Transaction cancelled.");
    } else if (code === "01") {
      setTransactionStatus("Invalid transaction due to incorrect parameters.");
      setBalance(Number(localStorage.getItem("userBalance")) || 0);
      message.error("Invalid transaction.");
    } else {
      setTransactionStatus("Unknown transaction status.");
      setBalance(Number(localStorage.getItem("userBalance")) || 0);
      message.info("Unknown transaction status.");
    }

    // Clear temporary data in localStorage
    localStorage.removeItem("pendingAmount");
  }, [searchParams]);

  // Function to reset balance (for testing)
  const handleResetBalance = () => {
    localStorage.setItem("userBalance", "0");
    setBalance(0);
    message.info("Balance reset to 0.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-6">{transactionStatus}</h1>

        {/* Display transaction details */}
        <Card title="Transaction Details" bordered={false} className="mb-6">
          <Descriptions column={1}>
            <Descriptions.Item label="Response code">{transactionDetails.code}</Descriptions.Item>
            <Descriptions.Item label="Transaction ID">{transactionDetails.id}</Descriptions.Item>
            <Descriptions.Item label="Cancel status">{transactionDetails.cancel ? "Yes" : "No"}</Descriptions.Item>
            <Descriptions.Item label="Payment status">{transactionDetails.status}</Descriptions.Item>
            <Descriptions.Item label="Order code">{transactionDetails.orderCode}</Descriptions.Item>
            <Descriptions.Item label="Top-up amount">{transactionDetails.amount.toLocaleString()} VND</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Display balance */}
        <p className="text-lg text-gray-700 mb-4">
          Current balance: <span className="font-bold">{balance.toLocaleString()} VND</span>
        </p>

        {/* Reset and Back buttons */}
        <div className="space-y-4">
          <Button
            type="primary"
            onClick={() => navigate("/payos-redirect")}
            className="w-full h-10 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg flex items-center justify-center"
          >
            Back
          </Button>
          <Button
            onClick={handleResetBalance}
            className="w-full h-10 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg flex items-center justify-center"
          >
            Reset Balance
          </Button>
        </div>
      </div>
    </div>
  );
}