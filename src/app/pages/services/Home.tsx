import React from "react"
import { Button, Input } from "antd"
import { ChevronLeft, ChevronRight, Facebook } from "lucide-react"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-grow">
                {/* Hero Banner */}
                <div className="relative bg-gray-200 h-64 md:h-96 flex items-center justify-center">
                    <img
                        src="/placeholder.svg"
                        alt="Sweeties Banner"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                        <Button type="text" shape="circle" icon={<ChevronLeft className="h-6 w-6" />} className="bg-white/80" />
                    </div>
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                        <Button type="text" shape="circle" icon={<ChevronRight className="h-6 w-6" />} className="bg-white/80" />
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-pink-500" />
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-2 w-2 rounded-full bg-gray-300" />
                        ))}
                    </div>
                </div>

                {/* Slimy Dessert Section */}
                <section className="bg-gray-100 py-12 px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        Slimy Dessert-Inspired Keychains & Charms
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Collect sweet treats that never melt! Our adorable dessert-inspired keychains and charms are perfect for
                        your bags, keys, or collection display.
                    </p>
                    <Button
                        type="primary"
                        size="large"
                        className="bg-pink-400 hover:bg-pink-500 border-pink-400 hover:border-pink-500 px-8 rounded-full"
                    >
                        CUSTOMIZE
                    </Button>
                </section>

                {/* Product Grid */}
                <section className="py-12 px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-gray-100 aspect-square flex items-center justify-center">
                                <img
                                    src="/placeholder.svg"
                                    alt={`Product ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Button
                            type="primary"
                            size="large"
                            className="bg-teal-500 hover:bg-teal-600 border-teal-500 hover:border-teal-600 px-8 rounded-full"
                        >
                            SEE MORE
                        </Button>
                    </div>
                </section>

                {/* Official Merch */}
                <section className="bg-gray-100 py-12 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Official Merch</h2>
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="flex-1">
                                <img
                                    src="/placeholder.svg"
                                    alt="Official Merchandise"
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <p className="text-gray-600 mb-6">
                                    Check out our official merchandise collection featuring exclusive designs, apparel, and accessories.
                                </p>
                                <Button
                                    type="primary"
                                    size="large"
                                    className="bg-teal-500 hover:bg-teal-600 border-teal-500 hover:border-teal-600 px-8 rounded-full"
                                >
                                    VISIT STORE
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* YouTube Section */}
                <section className="py-12 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our YouTube</h2>
                        <div className="bg-gray-200 aspect-video max-w-2xl mx-auto mb-6">
                            <img
                                src="/placeholder.svg"
                                alt="YouTube Video"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex justify-center space-x-4">
                            <Button
                                size="large"
                                className="bg-gray-800 hover:bg-gray-900 text-white border-gray-800 hover:border-gray-900"
                            >
                                Visit Us
                            </Button>
                            <Button
                                size="large"
                                icon={<Facebook className="h-4 w-4" />}
                                className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
                            >
                                Facebook
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                <section className="bg-gray-100 py-12 px-6">
                    <div className="max-w-md mx-auto text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Subscribe to our newsletter</h3>
                        <div className="flex">
                            <Input type="email" placeholder="Your email address" className="rounded-r-none" size="large" />
                            <Button
                                type="primary"
                                size="large"
                                className="bg-purple-600 hover:bg-purple-700 border-purple-600 hover:border-purple-700 rounded-l-none"
                            >
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
