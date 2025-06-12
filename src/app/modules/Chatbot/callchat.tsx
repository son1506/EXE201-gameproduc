import { message } from "antd";
import getAllProducts from '../../modules/Products/getAllProducts'; // Adjust path as needed

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

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

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

export async function callchat(chatMessages: Message[]): Promise<string> {
  try {
    // Kiểm tra API key
    if (!OPENROUTER_API_KEY) {
      throw new Error("API key chưa được cấu hình. Kiểm tra file .env");
    }

    if (!Array.isArray(chatMessages) || chatMessages.length === 0) {
      throw new Error("Không có tin nhắn nào để gửi.");
    }

    console.log("🔍 Gửi request với messages:", chatMessages);

    // Tạo system prompt với thông tin sản phẩm
    const systemPrompt = await createSystemPrompt();

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "X-Title": "Sweeties AI Chat",
        "HTTP-Referer": window.location.origin,
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
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
      console.error("❌ API Error:", data);
      throw new Error(data.error?.message || `HTTP ${response.status}: ${data.message || "Lỗi không xác định"}`);
    }

    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error("Không có phản hồi từ chatbot.");
    }

    return data.choices[0].message.content;
  } catch (err: unknown) {
    console.error("🚨 Chatbot Error:", err);
    
    const errorMessage = err instanceof Error ? err.message : "Lỗi không xác định";
    
    // Xử lý các lỗi phổ biến
    if (errorMessage.includes("401")) {
      message.error("API key không hợp lệ. Kiểm tra lại cấu hình.");
    } else if (errorMessage.includes("429")) {
      message.error("Quá nhiều request. Vui lòng thử lại sau.");
    } else if (errorMessage.includes("Network")) {
      message.error("Lỗi kết nối mạng. Kiểm tra internet.");
    } else {
      message.error(errorMessage || "Có lỗi xảy ra khi gọi chatbot.");
    }
    
    throw err;
  }
}