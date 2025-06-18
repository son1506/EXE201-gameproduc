
import { useState } from "react"
import { Button } from "antd"
import {
    Heart,
    Users,
    Trophy,
    Gamepad2,
    Star,
    Calendar,
    MapPin,
    Mail,
    Linkedin,
    Twitter,
    Github,
    Award,
    Target,
    Lightbulb,
    Rocket,
} from "lucide-react"
import logo from "../../../assets/logo_2.png"
export default function Aboutus() {
    const [selectedMember, setSelectedMember] = useState(0)

    const companyStats = [
        { label: "Years of Experience", value: "5+", icon: <Calendar className="w-6 h-6" /> },
        { label: "Games Published", value: "12", icon: <Gamepad2 className="w-6 h-6" /> },
        { label: "Happy Players", value: "2M+", icon: <Users className="w-6 h-6" /> },
        { label: "Awards Won", value: "8", icon: <Trophy className="w-6 h-6" /> },
    ]

    const teamMembers = [
        {
            name: "Duong Phuong Nam",
            role: "CEO & Game Director",
            image: "https://tse3.mm.bing.net/th?id=OIP.ZmXuryOWnCOmdKSGsS3RAwHaHa&pid=Api&P=0&h=180",
            bio: "Passionate game developer with 10+ years of experience creating magical gaming experiences. Sarah founded the company with a vision to bring joy through innovative gameplay.",
            skills: ["Game Design", "Team Leadership", "Strategy"],
            social: {
                linkedin: "#",
                twitter: "#",
                email: "sarah@sweetiesdodging.com",
            },
        },
        {
            name: "Thanh Son",
            role: "FE Developer",
            image: "https://tse2.mm.bing.net/th?id=OIP.XgBpNFEP5NeDXcvSRf8A3gHaJU&pid=Api&P=0&h=180",
            bio: "Full-stack developer who brings technical magic to life. Alex specializes in creating smooth, responsive gameplay experiences that players love.",
            skills: ["Unity Development", "Mobile Optimization", "Backend Systems"],
            social: {
                linkedin: "#",
                github: "#",
                email: "alex@sweetiesdodging.com",
            },
        },
        {
            name: "Gia Khai",
            role: "Art Director",
            image: "https://tse1.mm.bing.net/th?id=OIP.Fx3hbq1W775tvZiZTjbMwQHaDt&pid=Api&P=0&h=180",
            bio: "Creative visionary behind the adorable characters and vibrant worlds of Sweeties Dodging. Emma's artistic touch makes every pixel perfect.",
            skills: ["Character Design", "UI/UX Design", "Animation"],
            social: {
                linkedin: "#",
                twitter: "#",
                email: "emma@sweetiesdodging.com",
            },
        },
        {
            name: "Nguyen Kha",
            role: "BE Designer",
            image: "https://tse2.mm.bing.net/th?id=OIP.2b-SE3FWkWHQZ4wLlXEKQAHaFi&pid=Api&P=0&h=180",
            bio: "Audio wizard who creates the enchanting soundscapes and catchy music that make Sweeties Dodging so immersive and memorable.",
            skills: ["DOTNET", "DATABASE", "Audio Engineering"],
            social: {
                linkedin: "#",
                twitter: "#",
                email: "michael@sweetiesdodging.com",
            },
        },

        {
            name: "Mee",
            role: "Art Director",
            image: "https://tse3.mm.bing.net/th?id=OIP.8i8AL0A6sFXqGiQduEbKjAHaFi&pid=Api&P=0&h=180",
            bio: "Creative visionary behind the adorable characters and vibrant worlds of Sweeties Dodging. Emma's artistic touch makes every pixel perfect.",
            skills: ["Character Design", "UI/UX Design", "Animation"],
            social: {
                linkedin: "#",
                twitter: "#",
                email: "emma@sweetiesdodging.com",
            },
        },

        {
            name: "Nhan Dang",
            role: "Marketing",
            image: "https://tse4.mm.bing.net/th?id=OIP.BD-U5ovS6kKkW0480Yzl5gHaFf&pid=Api&P=0&h=180",
            bio: "Audio wizard who creates the enchanting soundscapes and catchy music that make Sweeties Dodging so immersive and memorable.",
            skills: ["Affiliate", "Social Media", "Audio Engineering"],
            social: {
                linkedin: "#",
                twitter: "#",
                email: "michael@sweetiesdodging.com",
            },
        },
    ]

    const companyValues = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Player First",
            description: "Every decision we make is centered around creating the best possible experience for our players.",
            color: "from-pink-400 to-rose-400",
        },
        {
            icon: <Lightbulb className="w-8 h-8" />,
            title: "Innovation",
            description: "We constantly push boundaries to create unique and engaging gameplay mechanics.",
            color: "from-yellow-400 to-orange-400",
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Community",
            description: "Building a supportive and inclusive community where everyone can enjoy our games together.",
            color: "from-blue-400 to-cyan-400",
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Quality",
            description: "We never compromise on quality, ensuring every game meets our high standards before release.",
            color: "from-purple-400 to-pink-400",
        },
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
                    <Heart className="absolute top-16 left-1/3 w-8 h-8 text-white/40 animate-pulse" />
                    <Star className="absolute bottom-40 right-1/4 w-6 h-6 text-yellow-300/70 animate-pulse" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl mb-6">💖 ABOUT US</h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                        We're a passionate team of game developers dedicated to creating magical, joyful experiences that bring
                        smiles to players around the world.
                    </p>

                    {/* Company Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {companyStats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 text-center shadow-xl border border-white/50 transform hover:scale-105 transition-all duration-200"
                            >
                                <div className="text-pink-500 mb-3 flex justify-center">{stat.icon}</div>
                                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 text-sm font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-6">
                            📖 Our Story
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
                            <h3 className="text-3xl font-bold text-gray-800 mb-6">The Sweet Beginning</h3>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                It all started in a small coffee shop where our founder Sarah was sketching cute characters on napkins.
                                She dreamed of creating games that would make people smile during their daily commutes and bring
                                families together.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                What began as simple doodles evolved into Sweeties Dodging - a game that combines challenging gameplay
                                with adorable characters and heartwarming stories.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Today, we're proud to have created experiences that have touched millions of lives, bringing joy,
                                laughter, and sweet moments to players worldwide.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-pink-200 to-rose-200 rounded-3xl p-8 shadow-xl border border-pink-200">
                                <img
                                    src={logo}
                                    alt="Company Story"
                                    className="w-full h-full object-contain drop-shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Values */}
            <section className="py-20 px-4 bg-gradient-to-r from-pink-100 to-rose-100">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-6">
                            ✨ Our Values
                        </h2>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            These core values guide everything we do, from game development to community building.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {companyValues.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200 text-center transform hover:scale-105 transition-all duration-300"
                            >
                                <div
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center text-white mb-6 mx-auto`}
                                >
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-6">
                            👥 Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            The talented individuals who bring Sweeties Dodging to life with their creativity and passion.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className={`bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border-4 cursor-pointer transform hover:scale-105 transition-all duration-300 ${selectedMember === index ? "border-pink-400 shadow-2xl" : "border-pink-200"
                                    }`}
                                onClick={() => setSelectedMember(index)}
                            >
                                <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 p-6">
                                    <img
                                        src={member.image || "/placeholder.svg"}
                                        alt={member.name}
                                        className="w-full h-full object-cover rounded-2xl shadow-lg"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                                    <p className="text-pink-600 font-bold mb-3">{member.role}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {member.skills.slice(0, 2).map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Selected Team Member Details */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                            <div className="lg:col-span-1">
                                <img
                                    src={teamMembers[selectedMember].image || "/placeholder.svg"}
                                    alt={teamMembers[selectedMember].name}
                                    className="w-full aspect-square object-cover rounded-3xl shadow-lg"
                                />
                            </div>
                            <div className="lg:col-span-2">
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">{teamMembers[selectedMember].name}</h3>
                                <p className="text-xl text-pink-600 font-bold mb-4">{teamMembers[selectedMember].role}</p>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">{teamMembers[selectedMember].bio}</p>

                                <div className="mb-6">
                                    <h4 className="text-lg font-bold text-gray-800 mb-3">Skills & Expertise</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {teamMembers[selectedMember].skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full font-bold"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    {teamMembers[selectedMember].social.linkedin && (
                                        <Button
                                            shape="circle"
                                            className="bg-blue-500 hover:bg-blue-600 text-white border-none"
                                            icon={<Linkedin className="w-5 h-5" />}
                                        />
                                    )}
                                    {teamMembers[selectedMember].social.twitter && (
                                        <Button
                                            shape="circle"
                                            className="bg-sky-500 hover:bg-sky-600 text-white border-none"
                                            icon={<Twitter className="w-5 h-5" />}
                                        />
                                    )}
                                    {teamMembers[selectedMember].social.github && (
                                        <Button
                                            shape="circle"
                                            className="bg-gray-800 hover:bg-gray-900 text-white border-none"
                                            icon={<Github className="w-5 h-5" />}
                                        />
                                    )}
                                    {teamMembers[selectedMember].social.email && (
                                        <Button
                                            shape="circle"
                                            className="bg-green-500 hover:bg-green-600 text-white border-none"
                                            icon={<Mail className="w-5 h-5" />}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-12 text-white shadow-2xl">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Let's Connect! 💌</h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Have questions about our games? Want to collaborate? Or just want to say hi? We'd love to hear from you!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="large"
                                className="bg-white text-pink-600 hover:bg-gray-100 border-none rounded-full px-12 py-4 font-pixel text-xl font-bold shadow-xl transform hover:scale-105 transition-all duration-200"
                                icon={<Mail className="w-6 h-6" />}
                            >
                                Contact Us
                            </Button>
                            <Button
                                size="large"
                                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-pink-600 rounded-full px-12 py-4 font-pixel text-xl font-bold transform hover:scale-105 transition-all duration-200"
                                icon={<MapPin className="w-6 h-6" />}
                            >
                                Visit Our Office
                            </Button>
                        </div>

                        <div className="mt-8 p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                            <p className="text-sm opacity-90">
                                <MapPin className="w-4 h-4 inline mr-2" />
                                123 Game Street, Creative District, San Francisco, CA 94102
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
