
import { useState } from "react"
import { Button } from "antd"
import { Play, Download, Gamepad2, Trophy, Users, Star, Heart, Zap, Target } from "lucide-react"
import gallery from "../../../assets/Gallery.jpg";
export default function Gameplay() {
    const [activeFeature, setActiveFeature] = useState(0)
    const [selectedCharacter, setSelectedCharacter] = useState(0)

    const gameFeatures = [
        {
            icon: <Gamepad2 className="w-8 h-8" />,
            title: "Easy Controls",
            description: "Simple tap and swipe controls that anyone can master in seconds!",
            color: "from-pink-400 to-rose-400",
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: "Challenging Levels",
            description: "Over 100+ levels with increasing difficulty and unique obstacles.",
            color: "from-purple-400 to-pink-400",
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Multiplayer Mode",
            description: "Compete with friends in real-time multiplayer dodging battles!",
            color: "from-teal-400 to-cyan-400",
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Power-ups",
            description: "Collect magical power-ups to boost your dodging abilities.",
            color: "from-yellow-400 to-orange-400",
        },
    ]

    const characters = [
        {
            name: "Choco",
            description: "The sweet chocolate lover with incredible speed",
            image: "/placeholder.svg?height=200&width=200",
            abilities: ["Speed Boost", "Chocolate Shield", "Sweet Jump"],
            color: "from-amber-400 to-orange-500",
        },
        {
            name: "Strawberry",
            description: "The berry princess with magical healing powers",
            image: "/placeholder.svg?height=200&width=200",
            abilities: ["Health Regen", "Berry Blast", "Pink Shield"],
            color: "from-pink-400 to-rose-500",
        },
        {
            name: "Vanilla",
            description: "The calm and collected master of precision",
            image: "/placeholder.svg?height=200&width=200",
            abilities: ["Precision Mode", "Time Slow", "Perfect Dodge"],
            color: "from-yellow-200 to-yellow-400",
        },
        {
            name: "Mint",
            description: "The cool character with ice-cold reflexes",
            image: "/placeholder.svg?height=200&width=200",
            abilities: ["Ice Shield", "Freeze Time", "Cool Dash"],
            color: "from-green-400 to-teal-500",
        },
    ]

    const gameStats = [
        { label: "Active Players", value: "50K+", icon: <Users className="w-6 h-6" /> },
        { label: "Levels Available", value: "100+", icon: <Target className="w-6 h-6" /> },
        { label: "Characters", value: "12", icon: <Heart className="w-6 h-6" /> },
        { label: "Power-ups", value: "25+", icon: <Zap className="w-6 h-6" /> },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 font-pixel">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 py-20 px-4 overflow-hidden">
                {/* Floating decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-bounce"
                        style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                        className="absolute top-20 right-20 w-16 h-16 bg-white/30 rounded-full animate-bounce"
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                        className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/25 rounded-full animate-bounce"
                        style={{ animationDelay: "2s" }}
                    ></div>
                    <div
                        className="absolute bottom-32 right-1/3 w-24 h-24 bg-white/15 rounded-full animate-bounce"
                        style={{ animationDelay: "0.5s" }}
                    ></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl mb-6"> GAMEPLAY</h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Experience the most addictive dodging game ever created! Navigate through magical worlds, avoid obstacles,
                        and collect sweet rewards in this enchanting adventure.
                    </p>

                    {/* Game Trailer */}
                    <div className="relative max-w-4xl mx-auto mb-8">
                        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-4 border-white shadow-2xl overflow-hidden group cursor-pointer">
                            <div className="relative w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                                <div className="absolute inset-0 bg-black/30"></div>
                                <div className="relative z-10 text-center">
                                    <div className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                                        <Play className="w-12 h-12 text-pink-500 ml-1" />
                                    </div>
                                    <p className="text-white text-xl font-bold">Watch Gameplay Trailer</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="large"
                            className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white border-none rounded-full px-8 py-3 font-pixel text-xl font-bold shadow-xl transform hover:scale-105 transition-all duration-200"
                            icon={<Play className="w-6 h-6" />}
                        >
                            Play Now
                        </Button>
                        <Button
                            size="large"
                            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-none rounded-full px-8 py-3 font-pixel text-xl font-bold shadow-xl transform hover:scale-105 transition-all duration-200"
                            icon={<Download className="w-6 h-6" />}
                        >
                            Download Free
                        </Button>
                    </div>
                </div>
            </section>

            {/* Game Stats */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {gameStats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 text-center shadow-xl border border-pink-200 transform hover:scale-105 transition-all duration-200"
                            >
                                <div className="text-pink-500 mb-3 flex justify-center">{stat.icon}</div>
                                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Game Features */}
            <section className="py-20 px-4 bg-gradient-to-r from-pink-100 to-rose-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-bold text-center text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-16">
                        ✨ Game Features
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {gameFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200 transform hover:scale-105 transition-all duration-300 cursor-pointer ${activeFeature === index ? "ring-4 ring-pink-300" : ""
                                    }`}
                                onClick={() => setActiveFeature(index)}
                            >
                                <div
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 mx-auto`}
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{feature.title}</h3>
                                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Characters Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-bold text-center text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-16">
                        🎭 Choose Your Character
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {characters.map((character, index) => (
                            <div
                                key={index}
                                className={`bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border-4 transition-all duration-300 cursor-pointer transform hover:scale-105 ${selectedCharacter === index ? "border-pink-400 shadow-2xl" : "border-pink-200"
                                    }`}
                                onClick={() => setSelectedCharacter(index)}
                            >
                                <div className={`aspect-square bg-gradient-to-br ${character.color} p-6`}>
                                    <img
                                        src={gallery}
                                        alt={character.name}
                                        className="w-full h-full object-contain drop-shadow-lg"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{character.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{character.description}</p>
                                    <div className="space-y-2">
                                        {character.abilities.map((ability, abilityIndex) => (
                                            <div key={abilityIndex} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                                <span className="text-sm text-gray-700">{ability}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Selected Character Details */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-4">
                                {characters[selectedCharacter].name}
                            </h3>
                            <p className="text-xl text-gray-700 mb-6">{characters[selectedCharacter].description}</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {characters[selectedCharacter].abilities.map((ability, index) => (
                                    <span
                                        key={index}
                                        className={`px-4 py-2 rounded-full text-white font-bold bg-gradient-to-r ${characters[selectedCharacter].color}`}
                                    >
                                        {ability}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Play */}
            <section className="py-20 px-4 bg-gradient-to-r from-pink-100 to-rose-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-16">
                        🎯 How to Play
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                                1
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Tap to Move</h3>
                            <p className="text-gray-600">Simply tap the screen to make your character move and avoid obstacles.</p>
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                                2
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Collect Items</h3>
                            <p className="text-gray-600">Gather sweet treats and power-ups to boost your score and abilities.</p>
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                                3
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Survive & Win</h3>
                            <p className="text-gray-600">Dodge all obstacles and reach the finish line to complete each level!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-12 text-white shadow-2xl">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Play? </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of players in the sweetest dodging adventure ever created!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="large"
                                className="bg-white text-pink-600 hover:bg-gray-100 border-none rounded-full px-12 py-4 font-pixel text-xl font-bold shadow-xl transform hover:scale-105 transition-all duration-200"
                                icon={<Play className="w-6 h-6" />}
                            >
                                Start Playing Now
                            </Button>
                            <Button
                                size="large"
                                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-pink-600 rounded-full px-12 py-4 font-pixel text-xl font-bold transform hover:scale-105 transition-all duration-200"
                                icon={<Download className="w-6 h-6" />}
                            >
                                Download Game
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
