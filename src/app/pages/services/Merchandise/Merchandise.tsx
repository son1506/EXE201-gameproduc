import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Badge, Spin, message } from "antd"
import { ShoppingCart, Heart, Star } from "lucide-react"
import logopage from "../../../assets/Logo_page.png"
import logopage2 from "../../../assets/logo_2.png"
import getAllProducts from "../../../modules/Products/getAllProducts" // Import API function

export default function Merchandise() {
    const [activeTab, setActiveTab] = useState("New")
    const [favorites, setFavorites] = useState<number[]>([])
    const [cart, setCart] = useState<number[]>([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const tabs = ["New", "Keyring", "Pin", "Collection"]

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const apiProducts = await getAllProducts()
                
                // Transform API data to match existing UI structure
                const transformedProducts = apiProducts.map(product => ({
                    id: product.productId,
                    name: product.productName,
                    price: `$${product.productPrice}`,
                    originalPrice: `$${(product.productPrice * 1.25).toFixed(2)}`, // Giá gốc cao hơn 25%
                    // image: product.productImageUrl || "/placeholder.svg?height=200&width=200",
                    category: getCategoryFromId(product.categoryId), // Convert categoryId to category name
                    isNew: isNewProduct(product.createdAt), // Check if product is new
                    rating: (4.5 + Math.random() * 0.5).toFixed(1), // Random rating 4.5-5.0
                    reviews: Math.floor(Math.random() * 200) + 50, // Random reviews 50-250
                    quantity: product.productQuantity,
                    description: product.productDescription,
                    isActive: product.isActive
                })).filter(product => product.isActive && product.quantity > 0) // Chỉ hiển thị sản phẩm active và còn hàng

                setProducts(transformedProducts)
            } catch (error) {
                console.error('Error fetching products:', error)
                message.error('Không thể tải danh sách sản phẩm')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    // Helper function to map categoryId to category name
    const getCategoryFromId = (categoryId) => {
        const categoryMap = {
            'apparel': 'Collection',
            'keyring': 'Keyring', 
            'pin': 'Pin',
            'collection': 'Collection'
        }
        return categoryMap[categoryId] || 'Collection'
    }

    // Check if product is new (created within last 30 days)
    const isNewProduct = (createdAt) => {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        return new Date(createdAt) > thirtyDaysAgo
    }

    const filteredProducts =
        activeTab === "New" ? products.filter((p) => p.isNew) : products.filter((p) => p.category === activeTab)

    const toggleFavorite = (id) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
    }

    const addToCart = (id) => {
        setCart((prev) => [...prev, id])
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex justify-center items-center">
                <Spin size="large" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 font-pixel">
            {/* Header Section */}
            <section className="relative bg-gradient-to-r from-pink-200 via-rose-200 to-pink-300 py-16 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
                    <div
                        className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                        className="absolute bottom-10 left-1/3 w-12 h-12 bg-white rounded-full animate-pulse"
                        style={{ animationDelay: "2s" }}
                    ></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="mb-8">
                        <img
                            src={logopage2}
                            alt="Sweeties Dodging Logo"
                            className="mx-auto w-[300px] h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-4">
                            🛍️ Official Store
                        </h1>
                        <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
                            Explore our enchanting collection of official Sweeties Dodging merchandise. Each item is carefully crafted
                            with love and designed to bring the magic of our game into your everyday life! ✨
                        </p>
                    </div>
                </div>
            </section>

            {/* Navigation Tabs */}
            <section className="bg-white/80 backdrop-blur-sm border-b border-pink-200 top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex flex-wrap justify-center gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-full font-pixel text-sm font-bold transition-all duration-200 transform hover:scale-105 ${activeTab === tab
                                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                                    : "bg-white text-pink-600 border-2 border-pink-300 hover:border-pink-400 shadow-md"
                                    }`}
                            >
                                {tab === "New" && "🆕 "}
                                {tab === "Keyring" && "🔑 "}
                                {tab === "Pin" && "📌 "}
                                {tab === "Collection" && "🎁 "}
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center text-gray-500 mt-8">
                            <p className="text-xl">Không có sản phẩm nào trong danh mục này</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
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
                                        <button
                                            onClick={() => toggleFavorite(product.id)}
                                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
                                        >
                                            <Heart
                                                className={`w-5 h-5 ${favorites.includes(product.id)
                                                    ? "text-red-500 fill-red-500"
                                                    : "text-gray-400 hover:text-red-400"
                                                    }`}
                                            />
                                        </button>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                <span className="text-sm text-gray-600 font-bold">{product.rating}</span>
                                            </div>
                                            <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-pink-600">{product.price}</span>
                                                <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                                            </div>
                                        </div>

                                        {/* Hiển thị số lượng còn lại */}
                                        <div className="mb-4">
                                            <span className="text-sm text-gray-500">
                                                Còn lại: <span className="font-bold text-blue-600">{product.quantity}</span> sản phẩm
                                            </span>
                                        </div>

                                        <Button
                                            onClick={() => navigate(`/merchandise/detail/${product.id}`)}
                                            className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white border-none rounded-full py-3 font-pixel text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                                            icon={<ShoppingCart className="w-5 h-5" />}
                                            disabled={product.quantity === 0}
                                        >
                                            {product.quantity === 0 ? "Hết hàng" : "Buy"}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* See More Button */}
                    {filteredProducts.length > 0 && (
                        <div className="text-center mt-16">
                            <Button
                                size="large"
                                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-none rounded-full px-12 py-4 font-pixel text-xl font-bold shadow-xl transform hover:scale-105 transition-all duration-200"
                            >
                                ✨ See More Magic
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Shopping Cart Badge */}
            {cart.length > 0 && (
                <div className="fixed bottom-6 right-6 z-50">
                    <Button
                        shape="circle"
                        size="large"
                        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-none shadow-2xl w-16 h-16 flex items-center justify-center"
                        icon={<ShoppingCart className="w-6 h-6" />}
                    />
                    <Badge
                        count={cart.length}
                        style={{
                            backgroundColor: "#ef4444",
                            position: "absolute",
                            top: -8,
                            right: -8,
                        }}
                    />
                </div>
            )}
        </div>
    )
}