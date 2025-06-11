import { useState } from "react";
import { Button, Badge, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Heart, Star, Share2, Minus, Plus } from "lucide-react";
import merchandise from "../../../../assets/Merchandise.jpg";
import { createPaymentLink } from "../../../modules/Payments/createPaymentLink";

export default function Merchandisedetail() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const productImages = [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ];

  const relatedProducts = [
    {
      id: 1,
      name: "Choco keyring",
      price: "10,000đ",
      image: "/placeholder.svg?height=200&width=200",
      isNew: true,
    },
    {
      id: 2,
      name: "Strawberry keyring",
      price: "10,000đ",
      image: "/placeholder.svg?height=200&width=200",
      isNew: true,
    },
    {
      id: 3,
      name: "Vanilla keyring",
      price: "10,000đ",
      image: "/placeholder.svg?height=200&width=200",
      isNew: true,
    },
  ];

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const paymentData = {
        amount: 10000, // Total amount in VND
        description: "Nạp tiền vào tài khoản",
        returnUrl: "http://localhost:5173/return-url",
        cancelUrl: "http://localhost:5173/cancel-url",
      };

      // Call backend API to create payment link
      const response = await createPaymentLink(paymentData);

      if (!response.checkoutUrl) {
        throw new Error("Không tìm thấy URL thanh toán.");
      }

      // Store amount in localStorage for post-redirect use
      localStorage.setItem("pendingAmount", paymentData.amount.toString());

      message.success("Đang chuyển hướng đến trang thanh toán...");

      // Redirect to checkoutUrl after 1-second delay
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 font-pixel">
      {/* Header Navigation */}
      <div className="backdrop-blur-sm border-b border-pink-200 top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md border border-pink-300 bg-white text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-pixel text-base font-bold">Go Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative bg-white rounded-3xl shadow-2xl border border-pink-200 overflow-hidden group">
              <div className="aspect-square p-8 bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={merchandise}
                  alt="Product"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Image Navigation Overlay */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  shape="circle"
                  className="bg-white/80 backdrop-blur-sm border-none shadow-lg"
                  onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : productImages.length - 1))}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button
                  shape="circle"
                  className="bg-white/80 backdrop-blur-sm border-none shadow-lg"
                  onClick={() => setSelectedImage((prev) => (prev < productImages.length - 1 ? prev + 1 : 0))}
                >
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-2xl border-4 overflow-hidden transition-all duration-200 ${selectedImage === index
                      ? "border-pink-400 shadow-lg scale-105"
                      : "border-gray-200 hover:border-pink-300 hover:scale-102"
                    }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover bg-gradient-to-br from-gray-50 to-gray-100"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
              {/* Product Badge and Actions */}
              <div className="flex items-start justify-between mb-6">
                <Badge
                  count="NEW"
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    fontFamily: "inherit",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                />
                <div className="flex gap-2">
                  <Button shape="circle" onClick={() => setIsFavorite(!isFavorite)} className="border-none shadow-lg">
                    <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
                  </Button>
                  <Button shape="circle" className="border-none shadow-lg">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </Button>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-4">
                Choco keyring
              </h1>

              {/* Product Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 font-bold">4.9</span>
                <span className="text-gray-500">(124 reviews)</span>
              </div>

              {/* Product Description */}
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                All metal keychains with core gold mirror finish on the side and designed with cute masks on the back
                with chocolate/chocolate logo. ✨
              </p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
                    10,000đ
                  </span>
                  <span className="text-xl text-gray-400 line-through">15,000đ</span>
                  <Badge
                    count="15% OFF"
                    style={{
                      backgroundColor: "#10b981",
                      color: "white",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-700 mb-4">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-gray-100 rounded-full border-2 border-pink-200">
                    <Button
                      shape="circle"
                      onClick={() => handleQuantityChange("decrease")}
                      disabled={quantity <= 1}
                      className="border-none bg-transparent shadow-none"
                      icon={<Minus className="w-4 h-4" />}
                    />
                    <span className="px-6 py-2 text-xl font-bold min-w-[60px] text-center">
                      {quantity.toString().padStart(2, "0")}
                    </span>
                    <Button
                      shape="circle"
                      onClick={() => handleQuantityChange("increase")}
                      className="border-none bg-transparent shadow-none"
                      icon={<Plus className="w-4 h-4" />}
                    />
                  </div>
                  <span className="text-gray-600">Available: 50 items</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                size="large"
                onClick={handleAddToCart}
                loading={loading}
                className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white border-none rounded-full py-4 font-pixel text-xl font-bold shadow-xl transform hover:scale-105 transition-all duration-200"
                icon={<ShoppingCart className="w-6 h-6" />}
              >
                Checkout
              </Button>
            </div>

            {/* Product Specifications */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">📋 Product Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Material</span>
                  <span className="font-bold">Metal with Gold Mirror Finish</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Size</span>
                  <span className="font-bold">5cm x 3cm</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-bold">25g</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Origin</span>
                  <span className="font-bold">Vietnam</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-8 text-center">
            🎁 Related Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group cursor-pointer"
              >
                <div className="relative aspect-square bg-gradient-to-br from-pink-50 to-rose-50 p-6">
                  {product.isNew && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge
                        count="NEW"
                        style={{
                          backgroundColor: "#ef4444",
                          color: "white",
                          fontFamily: "inherit",
                          fontWeight: "bold",
                        }}
                      />
                    </div>
                  )}
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}