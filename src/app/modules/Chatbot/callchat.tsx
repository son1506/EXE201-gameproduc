import { message } from "antd";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function callchat(chatMessages) {
  try {
    // Kiểm tra API key
    if (!OPENROUTER_API_KEY) {
      throw new Error("API key chưa được cấu hình. Kiểm tra file .env");
    }

    if (!Array.isArray(chatMessages) || chatMessages.length === 0) {
      throw new Error("Không có tin nhắn nào để gửi.");
    }

    console.log("🔍 Gửi request với messages:", chatMessages);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "X-Title": "Sweeties AI Chat",
        "HTTP-Referer": window.location.origin,
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // ✅ Sửa format model
        messages: [
          { role: "system", content: "Bạn là Sweeties AI - trợ lý vui vẻ sẵn sàng giúp!" },
          ...chatMessages,
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    console.log("📡 Response status:", response.status);
    
    const data = await response.json();
    console.log("📝 Response data:", data);

    if (!response.ok) {
      // Log chi tiết lỗi
      console.error("❌ API Error:", data);
      throw new Error(data.error?.message || `HTTP ${response.status}: ${data.message || "Lỗi không xác định"}`);
    }

    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error("Không có phản hồi từ chatbot.");
    }

    return data.choices[0].message.content;
  } catch (err) {
    console.error("🚨 Chatbot Error:", err);
    
    // Xử lý các lỗi phổ biến
    if (err.message.includes("401")) {
      message.error("API key không hợp lệ. Kiểm tra lại cấu hình.");
    } else if (err.message.includes("429")) {
      message.error("Quá nhiều request. Vui lòng thử lại sau.");
    } else if (err.message.includes("Network")) {
      message.error("Lỗi kết nối mạng. Kiểm tra internet.");
    } else {
      message.error(err.message || "Có lỗi xảy ra khi gọi chatbot.");
    }
    
    throw err;
  }
}