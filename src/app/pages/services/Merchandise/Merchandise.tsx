import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Badge, Spin, message } from "antd"
import { ShoppingCart, Heart, Star } from "lucide-react"
import logopage2 from "../../../assets/logo_2.png"
import getAllProducts from "../../../modules/Products/getAllProducts"

export default function Merchandise() {
    const [activeTab, setActiveTab] = useState("New")
    const [favorites, setFavorites] = useState<number[]>([])
    const [cart, setCart] = useState<number[]>([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const tabs = ["New", "Keyring", "Pin", "Collection"]

    useEffect(() => {
        let isMounted = true
        
        const getCategoryFromId = (categoryId) => {
            const categoryMap = {
                'collectibles': 'Collection',
                'keyring': 'Keyring', 
                'keychain': 'Keyring',
                'pin': 'Pin',
                'pins': 'Pin',
                'collection': 'Collection',
                'merchandise': 'Collection',
                'apparel': 'Collection'
            }
            return categoryMap[categoryId?.toLowerCase()] || 'Collection'
        }

        const isNewProduct = (createdAt) => {
            try {
                const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                return new Date(createdAt) > thirtyDaysAgo
            } catch {
                return false
            }
        }

        const getProductImageUrl = (productImageUrl) => {
            if (productImageUrl && typeof productImageUrl === 'string' && productImageUrl.trim()) {
                // Return the URL as-is if it starts with http
                if (productImageUrl.startsWith('http')) {
                    return productImageUrl
                }
                // Handle relative paths
                return productImageUrl.startsWith('/') ? productImageUrl : `/${productImageUrl}`
            }
            // Fallback placeholder
            return "https://via.placeholder.com/400x300/ffc0cb/ffffff?text=Sweeties+Product"
        }

        const fetchProducts = async () => {
            try {
                if (!isMounted) return
                
                setLoading(true)
                const apiProducts = await getAllProducts()
                
                if (!isMounted) return
                
                if (!Array.isArray(apiProducts)) {
                    throw new Error('API response is not an array')
                }
                
                // Transform products
                const transformedProducts = apiProducts
                    .filter(product => {
                        return product && 
                               product.productId && 
                               product.productName && 
                               typeof product.productPrice === 'number' &&
                               product.isActive && 
                               product.productQuantity > 0
                    })
                    .map((product) => ({
                        id: product.productId,
                        name: product.productName,
                        price: `${product.productPrice?.toLocaleString()} VND`,
                        originalPrice: `${(product.productPrice * 1.25)?.toLocaleString()} VND`,
                        image: getProductImageUrl(product.productImageUrl),
                        category: getCategoryFromId(product.categoryId),
                        isNew: isNewProduct(product.createdAt),
                        rating: (4.5 + Math.random() * 0.5).toFixed(1),
                        reviews: Math.floor(Math.random() * 200) + 50,
                        quantity: product.productQuantity,
                        description: product.productDescription || 'Sản phẩm chính hãng Sweeties Dodging',
                        isActive: product.isActive
                    }))

                if (isMounted) {
                    setProducts(transformedProducts)
                    message.success(`Đã tải ${transformedProducts.length} sản phẩm`)
                }
                
            } catch (error) {
                console.error('Error loading products:', error)
                if (isMounted) {
                    message.error('Không thể tải danh sách sản phẩm')
                    setProducts([])
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchProducts()
        
        return () => {
            isMounted = false
        }
    }, [])

    const filteredProducts = activeTab === "New" 
        ? products.filter((p) => p.isNew) 
        : products.filter((p) => p.category === activeTab)

    const toggleFavorite = (id) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex justify-center items-center">
                <div className="text-center">
                    <Spin size="large" />
                    <p className="mt-4 text-lg text-gray-600">Đang tải sản phẩm...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 font-pixel">
            {/* Header */}
            <section className="relative bg-gradient-to-r from-pink-200 via-rose-200 to-pink-300 py-16 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
                    <div className="absolute bottom-10 left-1/3 w-12 h-12 bg-white rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="mb-8">
                        <img
                            src={logopage2}
                            alt="Sweeties Logo"
                            className="mx-auto w-[300px] h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-4">
                            🛍️ Official Store
                        </h1>
                        <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
                            Explore our enchanting collection of official Sweeties Dodging merchandise! ✨
                        </p>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <section className="bg-white/80 backdrop-blur-sm border-b border-pink-200  top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex flex-wrap justify-center gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-full font-pixel text-sm font-bold transition-all duration-200 transform hover:scale-105 ${
                                    activeTab === tab
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
                        <div className="text-center text-gray-500 mt-8 bg-white/60 rounded-3xl p-12">
                            <p className="text-xl mb-2">Không có sản phẩm nào trong danh mục này</p>
                            <p className="text-sm">Hãy thử chọn danh mục khác!</p>
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
                                                <Badge count="NEW" style={{ backgroundColor: "#ef4444", color: "white", fontFamily: "inherit", fontWeight: "bold" }} />
                                            </div>
                                        )}
                                        
                                        <button
                                            onClick={() => toggleFavorite(product.id)}
                                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
                                        >
                                            <Heart
                                                className={`w-5 h-5 ${
                                                    favorites.includes(product.id)
                                                        ? "text-red-500 fill-red-500"
                                                        : "text-gray-400 hover:text-red-400"
                                                }`}
                                            />
                                        </button>
                                        
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement
                                                target.src = "https://via.placeholder.com/400x300/ffc0cb/ffffff?text=Image+Not+Found"
                                            }}
                                            loading="lazy"
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

                                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-pink-600">{product.price}</span>
                                                <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                                            </div>
                                        </div>

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
                                            {product.quantity === 0 ? "Hết hàng" : "Xem chi tiết"}
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
                                ✨ Xem thêm sản phẩm
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