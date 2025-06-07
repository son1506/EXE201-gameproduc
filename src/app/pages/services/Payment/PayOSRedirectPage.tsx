import { Button, message } from "antd";
import { useState } from "react";
import { createPaymentLink } from "../../../modules/Payments/createPaymentLink";

export default function PayOSRedirectPage() {
  const [loading, setLoading] = useState(false);

  const handleRedirect = async () => {
    setLoading(true);
    try {
      const paymentData = {
        amount: 10000, // Số tiền (VND)
        description: "Nạp tiền vào tài khoản",
        returnUrl: "http://localhost:5173/return-url", // URL thành công (frontend route)
        cancelUrl: "http://localhost:5173/cancel-url", // URL hủy (frontend route)
      };

      // Gọi API backend tạo payment link
      const response = await createPaymentLink(paymentData);

      if (!response.checkoutUrl) {
        throw new Error("Không tìm thấy URL thanh toán.");
      }

      // Lưu amount vào localStorage để dùng sau khi redirect (nếu cần)
      localStorage.setItem("pendingAmount", paymentData.amount.toString());

      message.success("Đang chuyển hướng đến trang thanh toán...");

      // Delay 1s rồi redirect sang checkoutUrl
      setTimeout(() => {
        window.location.href = response.checkoutUrl;
      }, 1000);
    } catch (error) {
      console.error("Lỗi khi tạo link thanh toán:", error);
      message.error(error.message || "Có lỗi xảy ra khi tạo link thanh toán.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-3xl font-bold text-pink-500 mb-6">Chuyển Hướng Thanh Toán</h1>
        <Button
          type="primary"
          onClick={handleRedirect}
          loading={loading}
          className="w-full h-10 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg flex items-center justify-center"
        >
          Thanh Toán Ngay
        </Button>
      </div>
    </div>
  );
}
