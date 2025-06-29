import { message } from "antd";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default async function verifyRegisterAccount(accountName, accountPassword, verificationToken) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Account/VerifyRegister?verificationToken=${verificationToken}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accountName,
                accountPassword,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Xác minh đăng ký thất bại.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        message.error(error.message || "Có lỗi xảy ra khi xác minh đăng ký.");
        throw error;
    }
}
