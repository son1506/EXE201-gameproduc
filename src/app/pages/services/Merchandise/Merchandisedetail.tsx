import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spin, message, Badge, Button } from "antd";
import { ShoppingCart, Star } from "lucide-react";
import getProductById from "../../../modules/Products/getProductById"; // ✅ API thật
import { createPaymentLink } from "../../../modules/Payments/createPaymentLink";
import tshirt from "../../../assets/thumb.jpg";
export default function MerchandiseDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Lấy thông tin sản phẩm và chuyển đổi dữ liệu
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(productId);

        const transformed = {
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

  const getCategoryFromId = (categoryId) => {
    const categoryMap = {
      apparel: "Collection",
      keyring: "Keyring",
      pin: "Pin",
      collection: "Collection",
    };
    return categoryMap[categoryId] || "Collection";
  };

  const isNewProduct = (createdAt) => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return new Date(createdAt) > thirtyDaysAgo;
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
      message.error(error.message || "Có lỗi xảy ra khi tạo link thanh toán.");
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
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
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
            <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
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

        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white border-none rounded-full py-3 font-pixel text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
          icon={<ShoppingCart className="w-5 h-5" />}
          disabled={product.quantity === 0}
        >
          {product.quantity === 0 ? "Hết hàng" : "Buy Now"}
        </Button>
      </div>
    </div>
  );
}
