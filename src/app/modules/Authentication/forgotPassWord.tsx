import { message } from "antd";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default async function forgotPassword(email) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Account/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(email)
        });

        if (!response.ok) {
            throw new Error("Gửi yêu cầu đặt lại mật khẩu thất bại. Vui lòng kiểm tra lại email.");
        }

        const data = await response.json();
        message.success("Đã gửi liên kết đặt lại mật khẩu đến email của bạn.");
        return data;
    } catch (error) {
        message.error(error.message || "Có lỗi xảy ra khi gửi yêu cầu đặt lại mật khẩu.");
        throw error;
    }
}