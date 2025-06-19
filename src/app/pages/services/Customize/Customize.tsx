
import { useState } from "react"
import { Button, Slider, ColorPicker } from "antd"
import { Palette, Shirt, Crown, Sparkles, Save, RotateCcw, Eye, Heart, Star, Zap } from "lucide-react"
import gallery from "../../../assets/Gallery.jpg";
export default function Customize() {
    const [selectedCharacter, setSelectedCharacter] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState("outfits")
    const [selectedOutfit, setSelectedOutfit] = useState(0)
    const [selectedAccessory, setSelectedAccessory] = useState(0)
    const [selectedColor, setSelectedColor] = useState("#ff69b4")
    const [characterSize, setCharacterSize] = useState(100)

    const characters = [
        {
            name: "Choco",
            baseImage: "/placeholder.svg?height=300&width=300",
            description: "Sweet chocolate character",
            unlocked: true,
        },
        {
            name: "Strawberry",
            baseImage: "/placeholder.svg?height=300&width=300",
            description: "Berry princess character",
            unlocked: true,
        },
        {
            name: "Vanilla",
            baseImage: "/placeholder.svg?height=300&width=300",
            description: "Calm vanilla character",
            unlocked: false,
        },
        {
            name: "Mint",
            baseImage: "/placeholder.svg?height=300&width=300",
            description: "Cool mint character",
            unlocked: false,
        },
    ]

    const customizationCategories = [
        { id: "outfits", name: "Outfits", icon: <Shirt className="w-5 h-5" />, color: "from-pink-400 to-rose-400" },
        {
            id: "accessories",
            name: "Accessories",
            icon: <Crown className="w-5 h-5" />,
            color: "from-purple-400 to-pink-400",
        },
        { id: "colors", name: "Colors", icon: <Palette className="w-5 h-5" />, color: "from-teal-400 to-cyan-400" },
        { id: "effects", name: "Effects", icon: <Sparkles className="w-5 h-5" />, color: "from-yellow-400 to-orange-400" },
    ]

    const outfits = [
        { name: "Default", image: "https://tse4.mm.bing.net/th?id=OIP.L_8WysYpyum7RIaa2CzJ6QHaEK&pid=Api&P=0&h=180", price: "Free", unlocked: true },
        { name: "Princess Dress", image: "https://tse4.mm.bing.net/th?id=OIP.r9kOEZ76Dmo6SRjBu9n0CwHaEK&pid=Api&P=0&h=180", price: "100 coins", unlocked: true },
        { name: "Ninja Outfit", image: "https://tse1.mm.bing.net/th?id=OIP.C0Q7txKa6lFP8luorECYDgHaEo&pid=Api&P=0&h=180", price: "200 coins", unlocked: false },
        { name: "Wizard Robe", image: "https://tse4.mm.bing.net/th?id=OIP._HT_Jd7jjMK06ViuNGh84AAAAA&pid=Api&P=0&h=180", price: "300 coins", unlocked: false },
        { name: "Superhero Suit", image: "https://tse4.mm.bing.net/th?id=OIP.Q2qx9mrFz9CkZkkESlkzbQHaHa&pid=Api&P=0&h=180", price: "500 coins", unlocked: false },
        { name: "Pirate Costume", image: "https://tse2.mm.bing.net/th?id=OIP.3qDMqDxISkobz2Ccp0W0RAHaEo&pid=Api&P=0&h=180", price: "400 coins", unlocked: false },
    ]

    const accessories = [
        { name: "None", image: "https://tse1.mm.bing.net/th?id=OIP.CDROpBwiOYGRbn47lSMz0QHaEo&pid=Api&P=0&h=180", price: "Free", unlocked: true },
        { name: "Crown", image: "https://tse2.mm.bing.net/th?id=OIP.MYfLAHF3UUNfJwj7xnfP3gHaEQ&pid=Api&P=0&h=180", price: "150 coins", unlocked: true },
        { name: "Glasses", image: "https://tse2.mm.bing.net/th?id=OIP.c3SVgO5pzfnfCv_uxUmd4AHaEK&pid=Api&P=0&h=180", price: "100 coins", unlocked: true },
        { name: "Hat", image: "https://tse2.mm.bing.net/th?id=OIP.nD5tBiYc3pTb9sLVsZOfvAHaJD&pid=Api&P=0&h=180", price: "200 coins", unlocked: false },
        { name: "Wings", image: "https://tse1.mm.bing.net/th?id=OIP.6GvCb3WGG3dPGuxMXbzXJgHaEK&pid=Api&P=0&h=180", price: "400 coins", unlocked: false },
        { name: "Halo", image: "https://tse3.mm.bing.net/th?id=OIP.o83CVmAqCzYE1BIbPYr93gHaKe&pid=Api&P=0&h=180", price: "300 coins", unlocked: false },
    ]

    const colorPresets = [
        "#ff69b4",
        "#ff1493",
        "#ff6347",
        "#ffa500",
        "#ffd700",
        "#98fb98",
        "#87ceeb",
        "#dda0dd",
        "#f0e68c",
        "#ff7f50",
        "#40e0d0",
        "#ee82ee",
    ]

    const effects = [
        { name: "None", icon: <Eye className="w-6 h-6" />, price: "Free", unlocked: true },
        { name: "Sparkle Trail", icon: <Sparkles className="w-6 h-6" />, price: "200 coins", unlocked: true },
        { name: "Heart Aura", icon: <Heart className="w-6 h-6" />, price: "300 coins", unlocked: false },
        { name: "Star Power", icon: <Star className="w-6 h-6" />, price: "400 coins", unlocked: false },
        { name: "Lightning", icon: <Zap className="w-6 h-6" />, price: "500 coins", unlocked: false },
    ]

    const handleSaveCustomization = () => {
        console.log("Saving customization...")
        // Add save logic here
    }

    const handleResetCustomization = () => {
        setSelectedOutfit(0)
        setSelectedAccessory(0)
        setSelectedColor("#ff69b4")
        setCharacterSize(100)
    }

    const renderCustomizationContent = () => {
        switch (selectedCategory) {
            case "outfits":
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {outfits.map((outfit, index) => (
                            <div
                                key={index}
                                className={`relative bg-white rounded-2xl p-4 border-4 cursor-pointer transition-all duration-200 ${selectedOutfit === index
                                    ? "border-pink-400 shadow-xl scale-105"
                                    : "border-pink-200 hover:border-pink-300 hover:scale-102"
                                    } ${!outfit.unlocked ? "opacity-60" : ""}`}
                                onClick={() => outfit.unlocked && setSelectedOutfit(index)}
                            >
                                <img
                                    src={outfit.image || "/placeholder.svg"}
                                    alt={outfit.name}
                                    className="w-full aspect-square object-contain mb-3"
                                />
                                <h4 className="font-bold text-gray-800 text-center mb-1">{outfit.name}</h4>
                                <p className="text-sm text-center text-gray-600">{outfit.price}</p>
                                {!outfit.unlocked && (
                                    <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">LOCKED</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )

            case "accessories":
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {accessories.map((accessory, index) => (
                            <div
                                key={index}
                                className={`relative bg-white rounded-2xl p-4 border-4 cursor-pointer transition-all duration-200 ${selectedAccessory === index
                                    ? "border-purple-400 shadow-xl scale-105"
                                    : "border-purple-200 hover:border-purple-300 hover:scale-102"
                                    } ${!accessory.unlocked ? "opacity-60" : ""}`}
                                onClick={() => accessory.unlocked && setSelectedAccessory(index)}
                            >
                                <img
                                    src={accessory.image || "/placeholder.svg"}
                                    alt={accessory.name}
                                    className="w-full aspect-square object-contain mb-3"
                                />
                                <h4 className="font-bold text-gray-800 text-center mb-1">{accessory.name}</h4>
                                <p className="text-sm text-center text-gray-600">{accessory.price}</p>
                                {!accessory.unlocked && (
                                    <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">LOCKED</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )

            case "colors":
                return (
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-4">🎨 Color Picker</h4>
                            <div className="flex justify-center mb-6">
                                <ColorPicker
                                    value={selectedColor}
                                    onChange={(color) => setSelectedColor(color.toHexString())}
                                    size="large"
                                    showText
                                />
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-4">🌈 Color Presets</h4>
                            <div className="grid grid-cols-6 gap-3">
                                {colorPresets.map((color, index) => (
                                    <button
                                        key={index}
                                        className={`w-12 h-12 rounded-full border-4 transition-all duration-200 ${selectedColor === color ? "border-gray-800 scale-110" : "border-gray-300 hover:scale-105"
                                            }`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-4">📏 Character Size</h4>
                            <Slider
                                min={50}
                                max={150}
                                value={characterSize}
                                onChange={setCharacterSize}
                                marks={{
                                    50: "Small",
                                    100: "Normal",
                                    150: "Large",
                                }}
                            />
                        </div>
                    </div>
                )

            case "effects":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {effects.map((effect, index) => (
                            <div
                                key={index}
                                className={`relative bg-white rounded-2xl p-6 border-4 cursor-pointer transition-all duration-200 ${!effect.unlocked ? "opacity-60" : ""
                                    }`}
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white">
                                        {effect.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{effect.name}</h4>
                                        <p className="text-sm text-gray-600">{effect.price}</p>
                                    </div>
                                </div>
                                {!effect.unlocked && (
                                    <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">LOCKED</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 font-pixel pt-20">
            {/* Header */}
            <section className="bg-gradient-to-r from-pink-200 via-rose-200 to-pink-300 py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4">🎨 CUSTOMIZE</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Make your character unique! Customize outfits, accessories, colors, and special effects to create your
                        perfect Sweeties character.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Character Preview */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200 sticky top-8">
                            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">👀 Preview</h2>

                            {/* Character Selection */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {characters.map((character, index) => (
                                    <button
                                        key={index}
                                        className={`p-3 rounded-2xl border-3 transition-all duration-200 ${selectedCharacter === index
                                            ? "border-pink-400 bg-pink-50"
                                            : "border-pink-200 hover:border-pink-300"
                                            } ${!character.unlocked ? "opacity-50" : ""}`}
                                        onClick={() => character.unlocked && setSelectedCharacter(index)}
                                        disabled={!character.unlocked}
                                    >
                                        <img
                                            src={gallery}
                                            alt={character.name}
                                            className="w-full aspect-square object-contain mb-2"
                                        />
                                        <p className="text-sm font-bold text-center">{character.name}</p>
                                        {!character.unlocked && <p className="text-xs text-red-500 text-center">LOCKED</p>}
                                    </button>
                                ))}
                            </div>

                            {/* Main Character Display */}
                            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl p-8 mb-6 text-center">
                                <div
                                    className="mx-auto transition-all duration-300"
                                    style={{
                                        width: `${characterSize}%`,
                                        filter: `hue-rotate(${selectedColor === "#ff69b4" ? 0 : 45}deg)`,
                                    }}
                                >
                                    <img
                                        src={gallery}
                                        alt="Character Preview"
                                        className="w-full aspect-square object-contain drop-shadow-2xl"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mt-4">{characters[selectedCharacter]?.name}</h3>
                                <p className="text-gray-600">{characters[selectedCharacter]?.description}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button
                                    onClick={handleSaveCustomization}
                                    className="w-full bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white border-none rounded-full py-3 font-pixel text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                                    icon={<Save className="w-5 h-5" />}
                                >
                                    Save Changes
                                </Button>
                                <Button
                                    onClick={handleResetCustomization}
                                    className="w-full bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white border-none rounded-full py-3 font-pixel text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                                    icon={<RotateCcw className="w-5 h-5" />}
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Customization Options */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-200 overflow-hidden">
                            {/* Category Tabs */}
                            <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-6 border-b border-pink-200">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {customizationCategories.map((category) => (
                                        <button
                                            key={category.id}
                                            className={`flex items-center justify-center gap-2 p-4 rounded-2xl font-bold transition-all duration-200 ${selectedCategory === category.id
                                                ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                                                : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200"
                                                }`}
                                            onClick={() => setSelectedCategory(category.id)}
                                        >
                                            {category.icon}
                                            <span className="hidden sm:inline">{category.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Customization Content */}
                            <div className="p-8">
                                <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                                    {customizationCategories.find((cat) => cat.id === selectedCategory)?.name}
                                </h3>
                                {renderCustomizationContent()}
                            </div>
                        </div>

                        {/* Coins Display */}
                        <div className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-6 text-white text-center shadow-xl">
                            <h3 className="text-2xl font-bold mb-2">💰 Your Coins</h3>
                            <p className="text-4xl font-bold">1,250</p>
                            <p className="text-sm opacity-90 mt-2">Complete levels to earn more coins!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
