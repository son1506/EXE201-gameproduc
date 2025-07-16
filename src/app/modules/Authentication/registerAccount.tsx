import { message } from "antd";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function registerAccount(accountEmail) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Account/SendRegisterEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(accountEmail)  // Send email string directly
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed.");
    }

    const data = await response.json();
    message.success("Registration successful. Please check your email for verification.");
    return data;
  } catch (error) {
    message.error(error.message || "An error occurred during registration.");
    throw error;
  }
}