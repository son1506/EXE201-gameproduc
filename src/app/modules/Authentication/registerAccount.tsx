import { message } from "antd";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function registerAccount(accountEmail) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Account/SendRegisterEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(accountEmail)  // Gửi trực tiếp chuỗi email
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Đăng ký thất bại.");
    }

    const data = await response.json();
    message.success("Đăng ký thành công. Vui lòng kiểm tra email để xác thực.");
    return data;
  } catch (error) {
    message.error(error.message || "Có lỗi xảy ra khi đăng ký.");
    throw error;
  }
}
