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

        // if (!response.ok) {
        //     throw new Error("Login failed. Please check your credentials.");
        // }

        const data = await response.json();
        return data;
    } catch (error) {
        message.error(error.message || "An error occurred during login.");
        throw error;
    }
}