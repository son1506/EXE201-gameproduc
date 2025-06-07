import { message } from "antd";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export async function createPaymentLink(paymentData) {
  try {
    // Validate input
    if (!paymentData.amount || paymentData.amount <= 0 || !Number.isInteger(Number(paymentData.amount))) {
      throw new Error("Số tiền không hợp lệ. Vui lòng nhập số nguyên lớn hơn 0.");
    }
    if (!paymentData.returnUrl || !paymentData.cancelUrl) {
      throw new Error("returnUrl và cancelUrl là bắt buộc.");
    }

    // Gửi dữ liệu về backend để backend tạo payment link
    const response = await fetch(`${BACKEND_API_URL}/api/create-payment-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderCode: Date.now() + Math.floor(Math.random() * 1000), // tạo mã đơn hàng duy nhất
        amount: Math.floor(paymentData.amount),
        description: paymentData.description || "Thanh toán đơn hàng",
        returnUrl: paymentData.returnUrl,
        cancelUrl: paymentData.cancelUrl,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Tạo link thanh toán thất bại. Mã lỗi: ${response.status}`);
    }

    const data = await response.json();

    if (!data.checkoutUrl) {
      throw new Error("Không tìm thấy URL thanh toán trong phản hồi từ server.");
    }

    message.success("Tạo link thanh toán thành công!");
    return data;
  } catch (error) {
    message.error(error.message || "Có lỗi xảy ra khi tạo link thanh toán.");
    throw error;
  }
}
