
import { useState } from "react"
import { Button, Input, Select, Rate, Collapse, Badge } from "antd"
import {
  MessageCircle,
  Mail,
  Phone,
  Book,
  Search,
  ChevronDown,
  HelpCircle,
  Bug,
  Settings,
  CreditCard,
  Users,
  Star,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const { TextArea } = Input
const { Option } = Select

export default function Support() {
  const [selectedCategory, setSelectedCategory] = useState("general")
  const [searchQuery, setSearchQuery] = useState("")
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    category: "general",
    subject: "",
    message: "",
    priority: "medium",
  })
  const [rating, setRating] = useState(0)

  const supportCategories = [
    {
      id: "general",
      name: "General Help",
      icon: <HelpCircle className="w-6 h-6" />,
      color: "from-blue-400 to-blue-500",
      count: 45,
    },
    {
      id: "gameplay",
      name: "Gameplay Issues",
      icon: <Settings className="w-6 h-6" />,
      color: "from-green-400 to-green-500",
      count: 32,
    },
    {
      id: "bugs",
      name: "Bug Reports",
      icon: <Bug className="w-6 h-6" />,
      color: "from-red-400 to-red-500",
      count: 18,
    },
    {
      id: "payment",
      name: "Payment & Billing",
      icon: <CreditCard className="w-6 h-6" />,
      color: "from-purple-400 to-purple-500",
      count: 23,
    },
    {
      id: "account",
      name: "Account Issues",
      icon: <Users className="w-6 h-6" />,
      color: "from-teal-400 to-teal-500",
      count: 15,
    },
  ]

  const faqData = [
    {
      category: "general",
      question: "How do I start playing Sweeties Dodging?",
      answer:
        "Simply download the game from your app store, create an account, and tap 'Play' to begin your sweet adventure! The tutorial will guide you through the basic controls.",
    },
    {
      category: "general",
      question: "Is Sweeties Dodging free to play?",
      answer:
        "Yes! Sweeties Dodging is completely free to download and play. We offer optional in-app purchases for cosmetic items and convenience features.",
    },
    {
      category: "gameplay",
      question: "How do I unlock new characters?",
      answer:
        "New characters can be unlocked by completing specific levels, collecting enough coins, or through special events. Check the character selection screen for unlock requirements.",
    },
    {
      category: "gameplay",
      question: "What are power-ups and how do I use them?",
      answer:
        "Power-ups are special items that give you temporary abilities like speed boost, shield, or extra lives. Collect them during gameplay or purchase them with coins.",
    },
    {
      category: "bugs",
      question: "The game crashes when I try to play. What should I do?",
      answer:
        "Try restarting the app, ensure you have the latest version, and restart your device. If the problem persists, please contact our support team with your device information.",
    },
    {
      category: "payment",
      question: "I made a purchase but didn't receive my items. Help!",
      answer:
        "Please check your purchase history and restart the game. If items still don't appear, contact support with your receipt/transaction ID for immediate assistance.",
    },
    {
      category: "account",
      question: "How do I recover my lost progress?",
      answer:
        "If you linked your account to Google Play/Game Center, your progress should sync automatically. Otherwise, contact support with your player ID for manual recovery.",
    },
  ]

  const supportStats = [
    { label: "Average Response Time", value: "< 2 hours", icon: <Clock className="w-5 h-5" /> },
    { label: "Resolution Rate", value: "98.5%", icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Customer Satisfaction", value: "4.9/5", icon: <Star className="w-5 h-5" /> },
    { label: "Active Tickets", value: "133", icon: <AlertCircle className="w-5 h-5" /> },
  ]

  const filteredFAQs = faqData.filter(
    (faq) =>
      (selectedCategory === "all" || faq.category === selectedCategory) &&
      (searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleTicketSubmit = () => {
    console.log("Submitting ticket:", ticketForm)
    // Add ticket submission logic here
  }

  const handleFormChange = (field: string, value: string) => {
    setTicketForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 font-pixel pt-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-200 via-rose-200 to-pink-300 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4">🛟 SUPPORT</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Need help with Sweeties Dodging? We're here to assist you! Find answers to common questions or contact our
            support team.
          </p>

          {/* Quick Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                size="large"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 rounded-full border-2 border-white/30 bg-white/90 backdrop-blur-sm font-pixel text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support Stats */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {supportStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 text-center shadow-xl border border-pink-200"
              >
                <div className="text-pink-500 mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-200 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-6 border-b border-pink-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">❓ Frequently Asked Questions</h2>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                      selectedCategory === "all"
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200"
                    }`}
                    onClick={() => setSelectedCategory("all")}
                  >
                    All Topics
                  </button>
                  {supportCategories.map((category) => (
                    <button
                      key={category.id}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                        selectedCategory === category.id
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                          : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.icon}
                      <span className="hidden sm:inline">{category.name}</span>
                      <Badge count={category.count} size="small" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {filteredFAQs.length > 0 ? (
                  <Collapse
                    ghost
                    expandIcon={({ isActive }) => (
                      <ChevronDown className={`w-5 h-5 transition-transform ${isActive ? "rotate-180" : ""}`} />
                    )}
                    items={filteredFAQs.map((faq, index) => ({
                      key: index,
                      label: <div className="text-lg font-bold text-gray-800 py-2">{faq.question}</div>,
                      children: <div className="text-gray-700 leading-relaxed pb-4">{faq.answer}</div>,
                    }))}
                  />
                ) : (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No FAQs found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact & Ticket Form */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-pink-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">📞 Quick Contact</h3>

              <div className="space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white border-none rounded-full py-3 font-pixel text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                  icon={<MessageCircle className="w-5 h-5" />}
                >
                  Live Chat
                </Button>

                <Button
                  className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white border-none rounded-full py-3 font-pixel text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                  icon={<Mail className="w-5 h-5" />}
                >
                  Email Support
                </Button>

                <Button
                  className="w-full bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white border-none rounded-full py-3 font-pixel text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                  icon={<Phone className="w-5 h-5" />}
                >
                  Call Us
                </Button>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                <p className="text-sm text-gray-700 text-center">
                  <strong>Support Hours:</strong>
                  <br />
                  Monday - Friday: 9AM - 6PM PST
                  <br />
                  Weekend: 10AM - 4PM PST
                </p>
              </div>
            </div>

            {/* Support Ticket Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-pink-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">🎫 Submit a Ticket</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                  <Input
                    placeholder="Your name"
                    value={ticketForm.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    className="rounded-xl border-2 border-pink-200 font-pixel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={ticketForm.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    className="rounded-xl border-2 border-pink-200 font-pixel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <Select
                    value={ticketForm.category}
                    onChange={(value) => handleFormChange("category", value)}
                    className="w-full"
                    size="large"
                  >
                    {supportCategories.map((category) => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Priority</label>
                  <Select
                    value={ticketForm.priority}
                    onChange={(value) => handleFormChange("priority", value)}
                    className="w-full"
                    size="large"
                  >
                    <Option value="low">🟢 Low</Option>
                    <Option value="medium">🟡 Medium</Option>
                    <Option value="high">🟠 High</Option>
                    <Option value="urgent">🔴 Urgent</Option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={ticketForm.subject}
                    onChange={(e) => handleFormChange("subject", e.target.value)}
                    className="rounded-xl border-2 border-pink-200 font-pixel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <TextArea
                    rows={4}
                    placeholder="Please describe your issue in detail..."
                    value={ticketForm.message}
                    onChange={(e) => handleFormChange("message", e.target.value)}
                    className="rounded-xl border-2 border-pink-200 font-pixel"
                  />
                </div>

                <Button
                  onClick={handleTicketSubmit}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-none rounded-full py-3 font-pixel text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                  icon={<Send className="w-5 h-5" />}
                >
                  Submit Ticket
                </Button>
              </div>
            </div>

            {/* Rate Our Support */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-6 shadow-xl border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">⭐ Rate Our Support</h3>
              <div className="text-center">
                <Rate value={rating} onChange={setRating} style={{ fontSize: "2rem" }} className="mb-4" />
                <p className="text-sm text-gray-600">Help us improve by rating your support experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-100 to-rose-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-12">
            📚 Additional Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200 transform hover:scale-105 transition-all duration-200">
              <Book className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Game Guide</h3>
              <p className="text-gray-600 mb-4">Complete walkthrough and tips for mastering Sweeties Dodging</p>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white border-none rounded-full px-6 py-2">
                Read Guide
              </Button>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200 transform hover:scale-105 transition-all duration-200">
              <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Community Forum</h3>
              <p className="text-gray-600 mb-4">Connect with other players and share strategies</p>
              <Button className="bg-green-500 hover:bg-green-600 text-white border-none rounded-full px-6 py-2">
                Join Forum
              </Button>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200 transform hover:scale-105 transition-all duration-200">
              <MessageCircle className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Discord Server</h3>
              <p className="text-gray-600 mb-4">Real-time chat with players and developers</p>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white border-none rounded-full px-6 py-2">
                Join Discord
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
