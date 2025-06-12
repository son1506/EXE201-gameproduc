import { useState } from "react";
import { Button, Input } from "antd";
import { ChevronLeft, ChevronRight, Play, Download, Store, Mail, Sparkles, Heart, Star } from "lucide-react";
import logopage from "../../assets/Logo_page.png";
import character from "../../assets/Character.gif";
import customize from "../../assets/customize.png";
import merchandise from "../../assets/Merchandise.jpg";
import character2 from "../../assets/Character2.png";
import logopage2 from "../../assets/logo_2.png";
import Chatbot from "../../components/Chatbot";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");

  const galleryImages = [
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 font-pixel overflow-hidden">
      <main className="flex-grow">
        {/* Hero Section with Enhanced Design */}
        <section className="relative bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 py-20 text-center px-4 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-10 left-10 w-16 h-16 bg-white/20 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute top-20 right-20 w-12 h-12 bg-white/30 rounded-full animate-bounce"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-20 left-1/4 w-8 h-8 bg-white/25 rounded-full animate-bounce"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-32 right-1/3 w-20 h-20 bg-white/15 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <Sparkles className="absolute top-16 left-1/3 w-6 h-6 text-white/40 animate-pulse" />
            <Heart className="absolute bottom-40 right-1/4 w-8 h-8 text-pink-400/60 animate-pulse" />
            <Star className="absolute top-1/3 right-16 w-5 h-5 text-yellow-300/70 animate-pulse" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
              <img
                src={logopage2}
                alt="Sweeties Logo"
                className="mx-auto w-[320px] h-auto drop-shadow-2xl"
              />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl border border-white/50">
              <p className="max-w-2xl mx-auto text-gray-700 text-lg mb-8 leading-relaxed">
                🌟 Enter a world where dreams and reality intertwine. Explore floating islands, battle mythical
                creatures, and uncover the secrets of an ancient civilization. 🌟
              </p>

              <div className="relative aspect-video max-w-3xl mx-auto rounded-2xl border-4 border-pink-400 shadow-2xl mb-8 bg-gradient-to-br from-pink-100 to-white overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <iframe
                  src="https://www.youtube.com/embed/jBYRUxGmEv0"
                  title="YouTube Video"
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full rounded-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <Play className="w-16 h-16 text-white drop-shadow-lg" />
                </div>
              </div>

              <Button
                size="large"
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-12 py-3 shadow-xl border-none font-pixel text-lg font-bold transform hover:scale-105 transition-all duration-200"
                icon={<Download className="w-5 h-5" />}
              >
                Download Now
              </Button>
            </div>
          </div>
        </section>

        {/* Customize Section - Enhanced */}
        <section className="relative bg-gradient-to-r from-pink-50 to-rose-50 py-24 px-6 md:px-20 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-10 w-32 h-32 bg-pink-300 rounded-full"></div>
            <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-rose-300 rounded-full"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                  <h2 className="text-4xl lg:text-5xl text-transparent bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text font-pixel mb-6 leading-tight">
                    Enter the World of Sweeties Cutie Pie
                  </h2>
                  <p className="mb-8 text-gray-700 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                    🎮 Enter a world where dreams and reality intertwine. Explore floating islands, battle mythical
                    creatures, and uncover the secrets of an ancient civilization. ✨
                  </p>
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <img
                      src={customize}
                      alt="Customize Button"
                      className="w-[260px] mx-auto lg:mx-0 drop-shadow-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-300/30 to-rose-300/30 rounded-full blur-3xl transform scale-150"></div>
                  <img
                    src={character}
                    alt="Pixel Character"
                    className="relative z-10 w-80 h-auto object-contain drop-shadow-2xl animate-bounce"
                    style={{ animationDuration: "3s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Gallery Carousel */}
        <section className="relative bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 py-20 text-center px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-1/4 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute bottom-10 right-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-4xl text-white font-bold mb-12 drop-shadow-lg">🎨 Gallery Showcase</h3>

            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="bg-white rounded-2xl border-4 border-white shadow-2xl overflow-hidden">
                <img
                  src={galleryImages[currentSlide] || "/placeholder.svg"}
                  alt={`Gallery ${currentSlide + 1}`}
                  className="w-full h-80 object-cover"
                />
              </div>

              <Button
                type="text"
                shape="circle"
                size="large"
                onClick={prevSlide}
                icon={<ChevronLeft className="h-6 w-6" />}
                className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-xl border-2 border-pink-200 backdrop-blur-sm"
              />
              <Button
                type="text"
                shape="circle"
                size="large"
                onClick={nextSlide}
                icon={<ChevronRight className="h-6 w-6" />}
                className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-xl border-2 border-pink-200 backdrop-blur-sm"
              />
            </div>

            <div className="flex justify-center space-x-3 mb-8">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${i === currentSlide ? "bg-white shadow-lg scale-125" : "bg-white/50 hover:bg-white/70"}`}
                />
              ))}
            </div>

            <Button
              size="large"
              className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white rounded-full px-8 py-3 shadow-xl border-none font-pixel text-lg font-bold transform hover:scale-105 transition-all duration-200"
            >
              SEE MORE ✨
            </Button>
          </div>
        </section>

        {/* Enhanced Merchandise Section */}
        <section className="bg-gradient-to-br from-white to-pink-50 py-24 px-4 md:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                  <img
                    src={merchandise}
                    alt="Merchandise"
                    className="relative z-10 w-full rounded-2xl border-4 border-gray-800 shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-pink-200">
                  <h3 className="text-5xl lg:text-6xl font-pixel mb-6 leading-none">
                    <span className="block text-transparent bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text">
                      Official
                    </span>
                    <span className="block text-transparent bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text">
                      Merch
                    </span>
                  </h3>
                  <div className="space-y-4 mb-8">
                    <p className="text-red-500 font-pixel text-lg">
                      🎁 We've created official merchandise for default
                      <br />
                      characters in Sweeties Dodging.
                    </p>
                    <p className="text-red-500 font-pixel text-lg">✨ Get stickers, pins, keyrings and more!</p>
                  </div>
                  <Button
                    size="large"
                    className="bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-500 hover:to-teal-500 text-white font-pixel text-xl px-10 py-4 shadow-xl border-4 border-gray-800 rounded-xl transform hover:scale-105 transition-all duration-200"
                    icon={<Store className="w-6 h-6" />}
                  >
                    Visit Store
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Newsletter Section */}
        <section className="relative bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 py-24 px-6 md:px-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-pink-300/30 rounded-3xl blur-2xl transform scale-110"></div>
                  <div className="relative w-80 h-80">
                    <img
                      src={character}
                      alt="Sweeties Character"
                      className="w-full h-full object-cover rounded-3xl border-4 border-white shadow-2xl transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/50">
                  <h3 className="text-4xl lg:text-5xl text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text font-pixel mb-8">
                    📧 Stay Updated
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <Input
                        type="email"
                        placeholder="Enter your magical email ✨"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-full w-full max-w-md font-pixel border-4 border-pink-300 shadow-lg text-lg py-3"
                        size="large"
                      />
                      <Button
                        size="large"
                        className="bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-500 hover:to-teal-500 text-white rounded-full px-8 py-3 font-pixel shadow-xl border-none text-lg font-bold transform hover:scale-105 transition-all duration-200"
                        icon={<Mail className="w-5 h-5" />}
                      >
                        Subscribe
                      </Button>
                    </div>

                    <p className="text-gray-700 text-base leading-relaxed max-w-lg">
                      🌟 Subscribe to receive the latest news and updates about Sweeties Dodging.
                    </p>

                    <div className="bg-red-50 border-l-4 border-red-300 p-4 rounded-lg">
                      <p className="text-sm text-red-600 leading-relaxed">
                        <strong>📋 Marketing permission:</strong> By submitting this form, I give my consent to Sweeties
                        Dodging to be in touch with me via email using the information I have provided in this form for
                        the purpose of news, updates and marketing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Chatbot />
    </div>
  );
}