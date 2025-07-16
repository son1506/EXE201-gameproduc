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
            throw new Error("Password reset failed. Please check the token and password.");
        }

        const data = await response.json();
        message.success("Password reset successful!");
        return data;
    } catch (error) {
        message.error(error.message || "An error occurred while resetting password.");
        throw error;
    }
}
