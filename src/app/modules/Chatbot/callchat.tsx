import { message } from "antd";
import getAllProducts from '../../modules/Products/getAllProducts';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Product {
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  productImageUrl: string;
  createdAt: string;
  isActive: boolean;
  categoryId: string;
}

// Cấu hình Google Gemini API
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Cache để tránh gọi API liên tục
let productsCache: Product[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

// Mapping categoryId sang tên tiếng Việt
const CATEGORY_NAMES: Record<string, string> = {
  'accessories': 'Phụ kiện',
  'collectibles': 'Đồ sưu tập',
  'apparel': 'Quần áo',
};

// Lấy dữ liệu sản phẩm với cache
const getProductsData = async (): Promise<Product[]> => {
  const now = Date.now();

  if (productsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return productsCache;
  }

  try {
    const products = await getAllProducts();
    productsCache = products.filter((product: Product) => product.isActive);
    cacheTimestamp = now;
    return productsCache;
  } catch (error) {
    console.error('Error fetching products:', error);
    return productsCache || [];
  }
};

// Định dạng giá tiền
const formatPrice = (price: number): string => {
  if (price < 1000) {
    return `$${price}`;
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

// Tạo system prompt với thông tin sản phẩm
const createSystemPrompt = async (): Promise<string> => {
  try {
    const products = await getProductsData();

    if (products.length === 0) {
      return `Bạn là Sweeties AI - trợ lý thông minh của cửa hàng Sweeties Dodging. 
Bạn bán merchandise chính thức của game Sweeties Dodging.
Hiện tại không thể tải dữ liệu sản phẩm, hãy xin lỗi và yêu cầu khách hàng thử lại sau.`;
    }

    // Nhóm sản phẩm theo category
    const groupedProducts = products.reduce((groups: Record<string, Product[]>, product) => {
      const category = product.categoryId;
      if (!groups[category]) groups[category] = [];
      groups[category].push(product);
      return groups;
    }, {});

    let productInfo = `Bạn là Sweeties AI - trợ lý thông minh của cửa hàng Sweeties Dodging.
Bạn bán merchandise chính thức của game Sweeties Dodging.

DANH SÁCH SẢN PHẨM HIỆN TẠI:

`;

    Object.entries(groupedProducts).forEach(([categoryId, categoryProducts]) => {
      const categoryName = CATEGORY_NAMES[categoryId] || categoryId;
      productInfo += `${categoryName.toUpperCase()}:\n`;
      categoryProducts.forEach(product => {
        productInfo += `- ${product.productName}: ${formatPrice(product.productPrice)} (Còn ${product.productQuantity} sản phẩm)\n  Mô tả: ${product.productDescription}\n`;
      });
      productInfo += '\n';
    });

    productInfo += `
HƯỚNG DẪN TRẢ LỜI:
- Luôn thân thiện và nhiệt tình
- Khi khách hỏi về sản phẩm, sử dụng thông tin chính xác từ danh sách trên
- Trả lời bằng tiếng Việt
- Sử dụng emoji phù hợp
- Khi khách hỏi giá, hiển thị giá chính xác
- Nếu hỏi về tồn kho, cho biết số lượng còn lại
- Có thể gợi ý sản phẩm tương tự nếu khách quan tâm
- Nếu khách hỏi về game Sweeties Dodging, giải thích đây là game arcade vui nhộn với các nhân vật kẹo ngọt`;

    return productInfo;
  } catch (error) {
    console.error('Error creating system prompt:', error);
    return `Bạn là Sweeties AI - trợ lý thông minh của cửa hàng Sweeties Dodging. 
Bạn bán merchandise chính thức của game Sweeties Dodging.
Hiện tại gặp sự cố kỹ thuật, hãy xin lỗi khách hàng và yêu cầu thử lại sau.`;
  }
};

// Tạo conversation history cho Gemini
const buildConversationText = (messages: Message[], systemPrompt: string): string => {
  let conversationText = `${systemPrompt}\n\n--- CUỘC TRÒ CHUYỆN ---\n\n`;
  
  messages.forEach((msg, index) => {
    if (msg.role === 'user') {
      conversationText += `Khách hàng: ${msg.content}\n\n`;
    } else {
      conversationText += `Sweeties AI: ${msg.content}\n\n`;
    }
  });
  
  conversationText += `Sweeties AI: `;
  return conversationText;
};

export async function callchat(chatMessages: Message[]): Promise<string> {
  try {
    // Kiểm tra API key
    if (!GEMINI_API_KEY) {
      throw new Error("Google Gemini API key chưa được cấu hình. Kiểm tra file .env");
    }

    if (!Array.isArray(chatMessages) || chatMessages.length === 0) {
      throw new Error("Không có tin nhắn nào để gửi.");
    }

    console.log("🔍 Gửi request tới Google Gemini với messages:", chatMessages);

    // Tạo system prompt với thông tin sản phẩm
    const systemPrompt = await createSystemPrompt();
    
    // Lấy tin nhắn cuối cùng của user
    const lastUserMessage = chatMessages[chatMessages.length - 1];
    
    // Tạo prompt cho Gemini
    const fullPrompt = buildConversationText(chatMessages, systemPrompt);

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
          stopSequences: ["Khách hàng:", "User:"]
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    console.log("📡 Gemini Response status:", response.status);

    const data = await response.json();
    console.log("📝 Gemini Response data:", data);

    if (!response.ok) {
      console.error("❌ Gemini API Error:", data);
      throw new Error(data.error?.message || `Gemini API Error: ${response.status}`);
    }

    // Xử lý response từ Gemini
    const candidates = data.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("Không có phản hồi từ Gemini.");
    }

    const candidate = candidates[0];
    
    // Kiểm tra nếu bị block bởi safety filter
    if (candidate.finishReason === "SAFETY") {
      return "Xin lỗi, tôi không thể trả lời câu hỏi này. Vui lòng hỏi về sản phẩm hoặc dịch vụ của chúng tôi! 😊";
    }

    const content = candidate.content?.parts?.[0]?.text;
    if (!content) {
      throw new Error("Không có nội dung phản hồi từ Gemini.");
    }

    // Làm sạch response (loại bỏ các phần không cần thiết)
    let cleanResponse = content.trim();
    
    // Loại bỏ các phần prompt có thể bị lặp lại
    cleanResponse = cleanResponse.replace(/^Sweeties AI:\s*/i, '');
    cleanResponse = cleanResponse.replace(/Khách hàng:.*$/i, '');
    
    console.log("✅ Gemini Response:", cleanResponse);
    return cleanResponse;

  } catch (err: unknown) {
    console.error("🚨 Gemini Chatbot Error:", err);

    const errorMessage = err instanceof Error ? err.message : "Lỗi không xác định";

    // Xử lý các lỗi phổ biến của Gemini API
    if (errorMessage.includes("401") || errorMessage.includes("403")) {
      message.error("🔑 Google Gemini API key không hợp lệ. Kiểm tra lại cấu hình.");
    } else if (errorMessage.includes("429")) {
      message.error("🚫 Vượt quá giới hạn request Gemini. Vui lòng thử lại sau vài phút.");
    } else if (errorMessage.includes("quota")) {
      message.error("📈 Đã vượt quá quota Gemini. Chờ reset hoặc nâng cấp tài khoản.");
    } else if (errorMessage.includes("SAFETY")) {
      message.error("🛡️ Nội dung bị chặn bởi safety filter. Thử câu hỏi khác.");
    } else if (errorMessage.includes("RECITATION")) {
      message.error("📝 Gemini từ chối phản hồi do policy. Thử diễn đạt khác.");
    } else if (errorMessage.includes("Network") || errorMessage.includes("fetch")) {
      message.error("🌐 Lỗi kết nối mạng. Kiểm tra internet.");
    } else {
      message.error(`❌ Lỗi Gemini: ${errorMessage}`);
    }

    throw err;
  }
}