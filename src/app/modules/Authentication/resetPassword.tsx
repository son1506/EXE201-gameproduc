import { message } from "antd";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default async function resetPassword(requestToken, requestPassword) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Account/reset-password?requestToken=${encodeURIComponent(requestToken)}&requestPassword=${encodeURIComponent(requestPassword)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Đặt lại mật khẩu thất bại. Vui lòng kiểm tra lại token và mật khẩu.");
        }

        const data = await response.json();
        message.success("Đặt lại mật khẩu thành công!");
        return data;
    } catch (error) {
        message.error(error.message || "Có lỗi xảy ra khi đặt lại mật khẩu.");
        throw error;
    }
}