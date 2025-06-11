import { message } from "antd";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default async function getAllProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Product/GetAllProducts`, {
            method: "GET",
            headers: {
                "Accept": "*/*"
            }
        });

        if (!response.ok) {
            throw new Error("Không thể lấy danh sách sản phẩm. Vui lòng thử lại.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        message.error(error.message || "Có lỗi xảy ra khi lấy danh sách sản phẩm.");
        throw error;
    }
}