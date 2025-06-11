import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Badge } from "antd"
import { ShoppingCart, Heart, Star } from "lucide-react"
import logopage from "../../../assets/Logo_page.png"

export default function Merchandise() {
    const [activeTab, setActiveTab] = useState("New")
    const [favorites, setFavorites] = useState<number[]>([])
    const [cart, setCart] = useState<number[]>([])
    const navigate = useNavigate()

    const tabs = ["New", "Keyring", "Pin", "Collection"]

    const products = [
        {
            id: 1,
            name: "Choco Keyring",
            price: "$12.99",
            originalPrice: "$15.99",
            image: "/placeholder.svg?height=200&width=200",
            category: "Keyring",
            isNew: true,
            rating: 4.8,
            reviews: 124,
        },
        {
            id: 2,
            name: "Strawberry Keyring",
            price: "$12.99",
            originalPrice: "$15.99",
            image: "/placeholder.svg?height=200&width=200",
            category: "Keyring",
            isNew: true,
            rating: 4.9,
            reviews: 89,
        },
        {
            id: 3,
            name: "Vanilla Keyring",
            price: "$12.99",
            originalPrice: "$15.99",
            image: "/placeholder.svg?height=200&width=200",
            category: "Keyring",
            isNew: false,
            rating: 4.7,
            reviews: 156,
        },
        {
            id: 4,
            name: "Mint Keyring",
            price: "$12.99",
            originalPrice: "$15.99",
            image: "/placeholder.svg?height=200&width=200",
            category: "Keyring",
            isNew: false,
            rating: 4.6,
            reviews: 98,
        },
        {
            id: 5,
            name: "Rainbow Pin Set",
            price: "$8.99",
            originalPrice: "$12.99",
            image: "/placeholder.svg?height=200&width=200",
            category: "Pin",
            isNew: true,
            rating: 4.9,
            reviews: 203,
        },
        {
            id: 6,
            name: "Heart Pin",
            price: "$6.99",
            originalPrice: "$9.99",
            image: "/placeholder.svg?height=200&width=200",
            category: "Pin",
            isNew: false,
            rating: 4.8,
            reviews: 167,
        },
        {
            id: 7,
            name: "Star Collection",
            price: "$24.99",
            originalPrice: "$29.99",
            image: "/placeholder.svg?height=200&width=200",
            category: "Collection",
            isNew: true,
            rating: 4.9,
            reviews: 78,
        },
        {
            id: 8,
            name: "Sweet Dreams Set",
            price: "$19.99",
            originalPrice: "$24.99",
            image: "/placeholder.svg?height=200&width=200",
            category: "Collection",
            isNew: false,
            rating: 4.7,
            reviews: 145,
        },
        {
            id: 9,
            name: "Limited Edition Keyring",
            price: "$18.99",
            originalPrice: "$22.99",
            image: "/placeholder.svg?height=200&width=200",
            category: "Keyring",
            isNew: true,
            rating: 5.0,
            reviews: 45,
        },
    ]

    const filteredProducts =
        activeTab === "New" ? products.filter((p) => p.isNew) : products.filter((p) => p.category === activeTab)

    const toggleFavorite = (id: number) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
    }

    const addToCart = (id: number) => {
        setCart((prev) => [...prev, id])
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
                            src={logopage}
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
            <section className="bg-white/80 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-40">
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
                                        src={product.image || "/placeholder.svg"}
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

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-pink-600">{product.price}</span>
                                            <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => navigate(`/merchandise/detail/${product.id}`)}
                                        className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white border-none rounded-full py-3 font-pixel text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                                        icon={<ShoppingCart className="w-5 h-5" />}
                                    >
                                        Buy
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* See More Button */}
                    <div className="text-center mt-16">
                        <Button
                            size="large"
                            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-none rounded-full px-12 py-4 font-pixel text-xl font-bold shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            ✨ See More Magic
                        </Button>
                    </div>
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
