import { message } from "antd";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default async function loginAccount(accountEmail, accountPassword) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Account/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accountEmail,
                accountPassword
            })
        });

        if (!response.ok) {
            throw new Error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        message.error(error.message || "Có lỗi xảy ra khi đăng nhập.");
        throw error;
    }
}
