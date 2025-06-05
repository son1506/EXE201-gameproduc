import React from "react";
import { Button, Input } from "antd";
import { ChevronLeft, ChevronRight, Facebook } from "lucide-react";
import logopage from "../../assets/Logo_page.png";
import character from "../../assets/Character.gif";
import merchandise from "../../assets/Merchandise.jpg";
import customize from "../../assets/customize.png";
import frame from "../../assets/Frame 45.png"
export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-white font-pixel">
            <main className="flex-grow">
                {/* Hero Banner with Pink Checkerboard - FIXED */}
                <div className="bg-[conic-gradient(#fff_25%,#fbcfe8_0_50%,#fff_0_75%,#fbcfe8_0)] bg-[length:50px_50px] relative">
                    <div className="flex items-center justify-between p-8 h-[650px]">
                        {/* Image Section - Left */}
                        <div className="flex-1 flex items-center justify-center">
                            <img
                                src={frame}
                                alt="Sweeties Banner"
                                className="w-[700px] h-[500px] object-contain"
                            />
                        </div>

                        {/* Logo and Text Section - Right */}
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <img
                                src={logopage}
                                alt="Sweeties Logo"
                                className="w-[600px] h-[300px] object-contain -mb-4"
                            />
                            <div className="text-center max-w-[500px]">
                                <p className="text-lg md:text-xl text-black mb-4">
                                    Enter a world where dreams and reality intertwine. Explore floating islands, battle mythical creatures, and uncover the secrets of an ancient civilization in this epic adventure.
                                </p>
                                <p className="text-md md:text-lg text-black mb-6">
                                    Be part of the candy universe. Get exclusive updates, join discussions, and shape the future of the game.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <Button
                        type="text"
                        shape="circle"
                        icon={<ChevronLeft className="h-6 w-6" />}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 shadow"
                    />
                    <Button
                        type="text"
                        shape="circle"
                        icon={<ChevronRight className="h-6 w-6" />}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 shadow"
                    />

                    {/* Pagination Dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-pink-500" />
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-2 w-2 rounded-full bg-gray-300" />
                        ))}
                    </div>
                </div>

                {/* Rest of the sections remain unchanged */}
                <section className="bg-[conic-gradient(#fff_25%,#bae6fd_0_50%,#fff_0_75%,#bae6fd_0)] bg-[length:50px_50px] py-120 px-4 md:px-8 font-pixel">
                    <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-10 h-[650px]">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-4xl md:text-5xl font-bold text-pink-300 drop-shadow-[2px_2px_0px_#000] mb-4 leading-snug">
                                Enter the World of <br /> Sweeties Cutie Pie
                            </h2>
                            <p className="text-lg md:text-xl text-black mb-6">
                                Enter a world where dreams and reality intertwine. Explore floating
                                islands, battle mythical creatures, and uncover the secrets of an
                                ancient civilization in this epic adventure.
                            </p>
                            {/* Customize Button */}
                            <div className="flex justify-center md:justify-start">
                                <img
                                    src={customize}
                                    alt="Customize Button"
                                    className="w-[400px] h-auto cursor-pointer hover:scale-105 transition-transform duration-200"
                                    onClick={() => {
                                        // Add your customize functionality here
                                        console.log("Customize clicked!");
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <img
                                src={character}
                                alt="Sweeties Character"
                                className="w-80 h-80 md:w-96 md:h-96 object-contain"
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 py-16 px-4 text-center">
                    <div className="container mx-auto">
                        <p className="text-gray-800 text-lg font-medium drop-shadow-sm max-w-xl mx-auto mb-6">
                            Enter a world where dreams and reality intertwine. Explore floating islands, battle mythical creatures, and uncover the secrets of an ancient civilization in this epic adventure.
                        </p>
                        <p className="text-gray-800 text-lg font-medium drop-shadow-sm max-w-xl mx-auto mb-6">
                            Enter a world where dreams and reality intertwine. Explore floating islands, battle mythical creatures, and uncover the secrets of an ancient civilization in this epic adventure.
                        </p>
                    </div>
                </section>

                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-100 aspect-square flex items-center justify-center rounded-lg overflow-hidden"
                                >
                                    <img
                                        src="/placeholder.svg"
                                        alt={`Product ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Button className="bg-teal-500 hover:bg-teal-600 border-none rounded-full px-8 py-1 text-white text-base font-semibold shadow">
                                SEE MORE
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 py-16 px-4">
                    <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1">
                            <img
                                src={merchandise}
                                alt="Official Merchandise"
                                className="w-full h-auto rounded-lg shadow"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <p className="text-gray-700 font-medium drop-shadow-sm mb-6">
                                Check out our official merchandise collection featuring
                                exclusive designs, apparel, and accessories.
                            </p>
                            <Button className="bg-teal-500 hover:bg-teal-600 border-none rounded-full px-8 py-1 text-white text-base font-semibold shadow">
                                VISIT STORE
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="py-16 px-4 text-center">
                    <div className="container mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 drop-shadow-md mb-6">
                            Our YouTube
                        </h2>
                        <div className="aspect-video max-w-3xl mx-auto rounded overflow-hidden mb-6">
                            <iframe
                                src="https://www.youtube.com/embed/jBYRUxGmEv0"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                            <Button className="bg-gray-800 hover:bg-gray-900 text-white border-none px-6 rounded-full shadow">
                                Visit Us
                            </Button>
                            <Button
                                icon={<Facebook className="h-4 w-4" />}
                                className="bg-blue-600 hover:bg-blue-700 text-white border-none px-6 rounded-full shadow"
                            >
                                Facebook
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 py-16 px-4 text-center">
                    <div className="max-w-md mx-auto">
                        <h3 className="text-xl font-semibold text-purple-800 drop-shadow-sm mb-4">
                            Subscribe to our newsletter
                        </h3>
                        <div className="flex">
                            <Input
                                type="email"
                                placeholder="Your email address"
                                className="rounded-l-full shadow"
                                size="large"
                            />
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white border-none rounded-r-full px-6 shadow">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}