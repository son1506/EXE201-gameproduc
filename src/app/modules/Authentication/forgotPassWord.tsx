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
            throw new Error("Failed to send password reset request. Please check your email address.");
        }

        const data = await response.json();
        message.success("Password reset link has been sent to your email.");
        return data;
    } catch (error) {
        message.error(error.message || "An error occurred while sending password reset request.");
        throw error;
    }
}