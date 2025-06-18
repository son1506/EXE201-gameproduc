import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spin, message, Badge, Button, Modal, Rate, Input, Form, Card, Avatar } from "antd";
import { ShoppingCart, Star, MessageCircle, User } from "lucide-react";
import getProductById from "../../../modules/Products/getProductById";
import { createPaymentLink } from "../../../modules/Payments/createPaymentLink";
import tshirt from "../../../assets/thumb.jpg";

const { TextArea } = Input;

// API function for getting feedback by product ID
const getFeedbackByProductId = async (productId: string) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  
  // Lấy token từ localStorage
  const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');
  
  try {
    const url = `${API_BASE_URL}/api/Feedback/GetFeedbackByProductId/${encodeURIComponent(productId)}`;
    
    console.log("Fetching feedback from:", url);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept": "*/*"
    };

    // Thêm Authorization header nếu có token
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    console.log("Feedback response status:", response.status);

    if (!response.ok) {
      if (response.status === 404) {
        console.log("No feedback found for this product");
        return [];
      }
      if (response.status === 401) {
        console.log("Unauthorized - token may be invalid or expired");
        // Có thể return [] hoặc throw error tùy theo yêu cầu
        return [];
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Feedback data:", result);
    return result;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return [];
  }
};

// API function for submitting feedback
const submitFeedback = async (productId: string, comment: string, rating: number) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  
  // Lấy token từ localStorage
  const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');
  
  if (!token) {
    throw new Error("Bạn cần đăng nhập để gửi đánh giá.");
  }

  try {
    // Format theo API documentation - có thể cần query parameter thay vì body
    const url = `${API_BASE_URL}/api/Feedback/SubmitFeedback?productId=${encodeURIComponent(productId)}`;
    
    const requestBody = {
      comment: comment,
      rating: rating,
      createdAt: new Date().toISOString()
    };

    console.log("Request URL:", url);
    console.log("Request body:", requestBody);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error response:", errorText);
      
      if (response.status === 401) {
        throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      }
      if (response.status === 400) {
        throw new Error(`Dữ liệu không hợp lệ: ${errorText}`);
      }
      throw new Error(`Lỗi ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log("Success response:", result);
    return result;
  } catch (error) {
    console.error("Lỗi khi gửi feedback:", error);
    throw error;
  }
};

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  quantity: number;
  description: string;
  isActive: boolean;
  isNew: boolean;
  rating: string;
  reviews: number;
  category: string;
  createdAt: string;
}

interface Feedback {
  id?: string;
  userId?: string;
  userName?: string;
  comment: string;
  rating: number;
  createdAt: string;
  productId?: string;
}

export default function MerchandiseDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Lấy thông tin sản phẩm
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      try {
        setLoading(true);
        const data = await getProductById(productId);

        const transformed: Product = {
          id: data.productId,
          name: data.productName,
          price: `$${data.productPrice}`,
          originalPrice: `$${(data.productPrice * 1.25).toFixed(2)}`,
          image: "https://via.placeholder.com/400x300?text=Product+Image",
          quantity: data.productQuantity,
          description: data.productDescription,
          isActive: data.isActive,
          isNew: isNewProduct(data.createdAt),
          rating: (4.5 + Math.random() * 0.5).toFixed(1),
          reviews: Math.floor(Math.random() * 200) + 50,
          category: getCategoryFromId(data.categoryId),
          createdAt: data.createdAt,
        };

        setProduct(transformed);
      } catch (error) {
        console.error("Lỗi gọi API:", error);
        message.error("Không thể tải sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Lấy feedback của sản phẩm dựa trên productId từ URL params
  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (!productId) {
        console.log("No productId found in URL params");
        return;
      }
      
      try {
        setLoadingFeedback(true);
        console.log("Fetching feedbacks for productId:", productId);
        const feedbackData = await getFeedbackByProductId(productId);
        console.log("Received feedback data:", feedbackData);
        setFeedbacks(feedbackData || []);
      } catch (error) {
        console.error("Lỗi khi lấy feedback:", error);
        // Không hiển thị error message cho feedback vì có thể chưa có feedback nào
      } finally {
        setLoadingFeedback(false);
      }
    };

    // Chỉ gọi API khi có productId từ URL params
    if (productId) {
      fetchFeedbacks();
    }
  }, [productId]);

  const handleSubmitFeedback = async (values: { comment: string; rating: number }) => {
    if (!productId) return;
    
    try {
      setSubmittingFeedback(true);
      await submitFeedback(productId, values.comment, values.rating);
      
      message.success("Cảm ơn bạn đã đánh giá sản phẩm!");
      form.resetFields();
      setIsModalVisible(false);
      
      // Reload feedback sau khi submit thành công với productId từ URL params
      if (productId) {
        const updatedFeedbacks = await getFeedbackByProductId(productId);
        setFeedbacks(updatedFeedbacks || []);
      }
      
    } catch (error) {
      const errorMessage = (error as Error).message;
      
      // Xử lý lỗi authentication đặc biệt
      if (errorMessage.includes("đăng nhập")) {
        message.error(errorMessage);
        // Có thể redirect đến trang login
        // navigate('/login');
      } else {
        message.error("Có lỗi xảy ra khi gửi đánh giá.");
      }
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const showFeedbackModal = () => {
    // Kiểm tra xem user đã đăng nhập chưa
    const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');
    
    if (!token) {
      message.warning("Bạn cần đăng nhập để gửi đánh giá sản phẩm.");
      // Có thể redirect đến trang login
      // navigate('/login');
      return;
    }
    
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const getCategoryFromId = (categoryId: string) => {
    const categoryMap: { [key: string]: string } = {
      apparel: "Collection",
      keyring: "Keyring",
      pin: "Pin",
      collection: "Collection",
    };
    return categoryMap[categoryId] || "Collection";
  };

  const isNewProduct = (createdAt: string) => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return new Date(createdAt) > thirtyDaysAgo;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const paymentData = {
        amount: 10000,
        description: "Nạp tiền vào tài khoản",
        returnUrl: "http://localhost:5173/return-url",
        cancelUrl: "http://localhost:5173/cancel-url",
      };

      const response = await createPaymentLink(paymentData);

      if (!response.checkoutUrl) {
        throw new Error("Không tìm thấy URL thanh toán.");
      }

      localStorage.setItem("pendingAmount", paymentData.amount.toString());
      message.success("Đang chuyển hướng đến trang thanh toán...");

      setTimeout(() => {
        window.location.href = response.checkoutUrl;
      }, 1000);
    } catch (error) {
      console.error("Lỗi khi tạo link thanh toán:", error);
      message.error((error as Error).message || "Có lỗi xảy ra khi tạo link thanh toán.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-pink-50">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center text-gray-500">Không tìm thấy sản phẩm.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-6 font-pixel">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
        {/* Nút Back */}
        <Button
          onClick={handleBack}
          className="mb-4 bg-white border border-pink-200 text-pink-600 hover:bg-pink-50 font-bold rounded-full shadow px-4 py-2 transition-all"
        >
          ← Quay lại
        </Button>

        {/* Hình ảnh sản phẩm */}
        <img
          src={tshirt}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl mb-6 border border-pink-100 shadow"
        />

        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-pink-600">{product.name}</h1>
            <p className="text-sm text-gray-400">Loại Sản Phẩm: {product.category}</p>
          </div>

          {product.isNew && (
            <Badge
              count="NEW"
              style={{
                backgroundColor: "#ef4444",
                fontWeight: "bold",
                fontFamily: "inherit",
              }}
            />
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-gray-600">{product.rating}</span>
            <span className="text-xs text-gray-500">({feedbacks.length} reviews)</span>
          </div>

          <p className="text-gray-700 mb-4 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-pink-600">{product.price}</span>
            <span className="text-sm line-through text-gray-400">{product.originalPrice}</span>
          </div>

          <p className="text-sm mt-2 text-gray-500">
            Còn lại: <span className="font-bold text-blue-600">{product.quantity}</span> sản phẩm
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3 mb-8">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white border-none rounded-full py-3 font-pixel text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
            icon={<ShoppingCart className="w-5 h-5" />}
            disabled={product.quantity === 0}
          >
            {product.quantity === 0 ? "Hết hàng" : "Buy Now"}
          </Button>

          <Button
            onClick={showFeedbackModal}
            className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white border-none rounded-full py-3 font-pixel text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
            icon={<MessageCircle className="w-5 h-5" />}
          >
            Submit Feedback
          </Button>
        </div>

        {/* Feedback Section */}
        <div className="border-t border-pink-100 pt-6">
          <h2 className="text-2xl font-bold text-pink-600 mb-4 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Đánh giá từ khách hàng ({feedbacks.length})
          </h2>

          {loadingFeedback ? (
            <div className="text-center py-8">
              <Spin />
              <p className="mt-2 text-gray-500">Đang tải đánh giá...</p>
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-2xl">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
              <p className="text-sm text-gray-400">Hãy là người đầu tiên đánh giá!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {feedbacks.map((feedback, index) => (
                <Card
                  key={feedback.id || index}
                  className="shadow-sm border border-pink-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-3">
                    <Avatar 
                      icon={<User />} 
                      className="bg-pink-100 text-pink-600 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {feedback.userName || "Khách hàng"}
                          </p>
                          <div className="flex items-center gap-2">
                            <Rate 
                              disabled 
                              value={feedback.rating} 
                              className="text-sm"
                            />
                            <span className="text-xs text-gray-500">
                              {feedback.rating}/5
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">
                          {formatDate(feedback.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {feedback.comment}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Feedback Modal */}
        <Modal
          title="Đánh giá sản phẩm"
          open={isModalVisible}
          onCancel={handleCancelModal}
          footer={null}
          centered
          className="font-pixel"
        >
          <Form
            form={form}
            onFinish={handleSubmitFeedback}
            layout="vertical"
            className="mt-4"
          >
            <Form.Item
              name="rating"
              label="Đánh giá"
              rules={[{ required: true, message: "Vui lòng chọn số sao!" }]}
            >
              <Rate />
            </Form.Item>

            <Form.Item
              name="comment"
              label="Nhận xét"
              rules={[
                { required: true, message: "Vui lòng nhập nhận xét!" },
                { min: 10, message: "Nhận xét phải có ít nhất 10 ký tự!" }
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item className="mb-0 text-right">
              <Button
                onClick={handleCancelModal}
                className="mr-2"
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={submittingFeedback}
                className="bg-pink-500 hover:bg-pink-600 border-none"
              >
                Gửi đánh giá
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}