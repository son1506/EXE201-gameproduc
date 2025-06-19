
import type React from "react"

import { useState } from "react"
import { Button, Input, Select, message, Form } from "antd"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Briefcase,
  HelpCircle,
  Bug,
  Heart,
  Star,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react"

const { TextArea } = Input
const { Option } = Select

// TypeScript interfaces
interface ContactMethod {
  icon: React.ReactNode
  title: string
  description: string
  contact: string
  color: string
  action: string
}

interface Office {
  name: string
  address: string
  city: string
  phone: string
  email: string
  hours: string
  image: string
  isMain: boolean
}

interface SocialLink {
  icon: React.ReactNode
  name: string
  url: string
  color: string
}

interface InquiryType {
  value: string
  label: string
  icon: React.ReactNode
}

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  inquiryType: string
  subject: string
  message: string
}

interface ContactStat {
  label: string
  value: string
  icon: React.ReactNode
}

export default function Contact() {
  const [form] = Form.useForm<ContactFormData>()
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedOffice, setSelectedOffice] = useState<number>(0)

  const contactMethods: ContactMethod[] = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Us",
      description: "Get in touch via email for detailed inquiries",
      contact: "hello@sweetiesdodging.com",
      color: "from-blue-400 to-blue-500",
      action: "Send Email",
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      description: "Speak directly with our support team",
      contact: "+1 (555) 123-4567",
      color: "from-green-400 to-green-500",
      action: "Call Now",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Live Chat",
      description: "Get instant help through live chat",
      contact: "Available 24/7",
      color: "from-purple-400 to-purple-500",
      action: "Start Chat",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Visit Us",
      description: "Come visit our creative studio",
      contact: "123 Game Street, SF",
      color: "from-pink-400 to-rose-400",
      action: "Get Directions",
    },
  ]

  const offices: Office[] = [
    {
      name: "San Francisco HQ",
      address: "123 Game Street, Creative District",
      city: "San Francisco, CA 94102",
      phone: "+1 (555) 123-4567",
      email: "sf@sweetiesdodging.com",
      hours: "Mon-Fri: 9AM-6PM PST",
      image: "/placeholder.svg?height=300&width=400",
      isMain: true,
    },
    {
      name: "Tokyo Studio",
      address: "456 Gaming Avenue, Shibuya",
      city: "Tokyo, Japan 150-0002",
      phone: "+81 3-1234-5678",
      email: "tokyo@sweetiesdodging.com",
      hours: "Mon-Fri: 9AM-6PM JST",
      image: "/placeholder.svg?height=300&width=400",
      isMain: false,
    },
    {
      name: "London Office",
      address: "789 Creative Lane, Shoreditch",
      city: "London, UK EC2A 3AY",
      phone: "+44 20 1234 5678",
      email: "london@sweetiesdodging.com",
      hours: "Mon-Fri: 9AM-5PM GMT",
      image: "/placeholder.svg?height=300&width=400",
      isMain: false,
    },
  ]

  const socialLinks: SocialLink[] = [
    { icon: <Facebook className="w-6 h-6" />, name: "Facebook", url: "#", color: "bg-blue-600" },
    { icon: <Twitter className="w-6 h-6" />, name: "Twitter", url: "#", color: "bg-sky-500" },
    { icon: <Instagram className="w-6 h-6" />, name: "Instagram", url: "#", color: "bg-pink-500" },
    { icon: <Youtube className="w-6 h-6" />, name: "YouTube", url: "#", color: "bg-red-500" },
    { icon: <Linkedin className="w-6 h-6" />, name: "LinkedIn", url: "#", color: "bg-blue-700" },
  ]

  const inquiryTypes: InquiryType[] = [
    { value: "general", label: "General Inquiry", icon: <HelpCircle className="w-4 h-4" /> },
    { value: "support", label: "Technical Support", icon: <MessageCircle className="w-4 h-4" /> },
    { value: "business", label: "Business Partnership", icon: <Briefcase className="w-4 h-4" /> },
    { value: "press", label: "Press & Media", icon: <Users className="w-4 h-4" /> },
    { value: "bug", label: "Bug Report", icon: <Bug className="w-4 h-4" /> },
    { value: "feedback", label: "Feedback", icon: <Heart className="w-4 h-4" /> },
  ]

  const contactStats: ContactStat[] = [
    { label: "Response Time", value: "< 2hrs", icon: <Clock className="w-8 h-8" /> },
    { label: "Support", value: "24/7", icon: <Globe className="w-8 h-8" /> },
    { label: "Happy Users", value: "50K+", icon: <Users className="w-8 h-8" /> },
    { label: "Satisfaction", value: "4.9/5", icon: <Star className="w-8 h-8" /> },
  ]

  const handleSubmit = async (values: ContactFormData): Promise<void> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Form submitted:", values)
      message.success("Message sent successfully! We'll get back to you soon.")
      form.resetFields()
    } catch (error) {
      console.error("Form submission error:", error)
      message.error("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleOfficeSelect = (index: number): void => {
    setSelectedOffice(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 font-pixel pt-20">
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
          <Mail className="absolute top-16 left-1/3 w-8 h-8 text-white/40 animate-pulse" />
          <Heart className="absolute bottom-40 right-1/4 w-8 h-8 text-pink-400/60 animate-pulse" />
          <Star className="absolute top-1/3 right-16 w-6 h-6 text-yellow-300/70 animate-pulse" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl mb-6">📞 CONTACT</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Have questions, feedback, or just want to say hello? We'd love to hear from you! Reach out through any of
            our contact methods below.
          </p>

          {/* Quick Contact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {contactStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 text-center shadow-xl border border-white/50"
              >
                <div className="text-pink-500 mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-2xl font-bold text-pink-600">{stat.value}</div>
                <div className="text-sm text-gray-600 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-6">
              💌 Get In Touch
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Choose your preferred way to contact us. We're here to help with any questions or concerns you may have.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200 text-center transform hover:scale-105 transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.color} flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-200`}
                >
                  {method.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{method.description}</p>
                <p className="text-lg font-bold text-pink-600 mb-6">{method.contact}</p>
                <Button
                  className={`bg-gradient-to-r ${method.color} hover:opacity-90 text-white border-none rounded-full px-6 py-2 font-pixel font-bold transform hover:scale-105 transition-all duration-200`}
                >
                  {method.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-200 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-8 border-b border-pink-200">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">📝 Send us a Message</h3>
              <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            <div className="p-8">
              <Form form={form} onFinish={handleSubmit} layout="vertical" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="firstName"
                    label={<span className="font-bold text-gray-700">First Name</span>}
                    rules={[{ required: true, message: "Please enter your first name" }]}
                  >
                    <Input
                      placeholder="John"
                      className="rounded-xl border-2 border-pink-200 font-pixel py-3"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    label={<span className="font-bold text-gray-700">Last Name</span>}
                    rules={[{ required: true, message: "Please enter your last name" }]}
                  >
                    <Input
                      placeholder="Doe"
                      className="rounded-xl border-2 border-pink-200 font-pixel py-3"
                      size="large"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="email"
                  label={<span className="font-bold text-gray-700">Email Address</span>}
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    placeholder="john.doe@example.com"
                    className="rounded-xl border-2 border-pink-200 font-pixel py-3"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label={<span className="font-bold text-gray-700">Phone Number (Optional)</span>}
                >
                  <Input
                    placeholder="+1 (555) 123-4567"
                    className="rounded-xl border-2 border-pink-200 font-pixel py-3"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="inquiryType"
                  label={<span className="font-bold text-gray-700">Inquiry Type</span>}
                  rules={[{ required: true, message: "Please select an inquiry type" }]}
                >
                  <Select
                    placeholder="Select inquiry type"
                    className="rounded-xl"
                    size="large"
                    dropdownStyle={{ fontFamily: "inherit" }}
                  >
                    {inquiryTypes.map((type) => (
                      <Option key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          {type.icon}
                          {type.label}
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="subject"
                  label={<span className="font-bold text-gray-700">Subject</span>}
                  rules={[{ required: true, message: "Please enter a subject" }]}
                >
                  <Input
                    placeholder="Brief description of your inquiry"
                    className="rounded-xl border-2 border-pink-200 font-pixel py-3"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="message"
                  label={<span className="font-bold text-gray-700">Message</span>}
                  rules={[{ required: true, message: "Please enter your message" }]}
                >
                  <TextArea
                    rows={6}
                    placeholder="Please provide details about your inquiry..."
                    className="rounded-xl border-2 border-pink-200 font-pixel"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-none rounded-full py-4 font-pixel text-xl font-bold shadow-xl transform hover:scale-105 transition-all duration-200"
                    icon={<Send className="w-6 h-6" />}
                    size="large"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>

          {/* Office Locations & Social */}
          <div className="space-y-8">
            {/* Office Locations */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-200 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-6 border-b border-pink-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🏢 Our Offices</h3>
                <div className="flex gap-2">
                  {offices.map((office, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                        selectedOffice === index
                          ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                          : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200"
                      }`}
                      onClick={() => handleOfficeSelect(index)}
                    >
                      {office.name.split(" ")[0]}
                      {office.isMain && " 🏠"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <img
                    src={offices[selectedOffice].image || "/placeholder.svg"}
                    alt={offices[selectedOffice].name}
                    className="w-full h-48 object-cover rounded-2xl shadow-lg"
                  />
                </div>

                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  {offices[selectedOffice].name}
                  {offices[selectedOffice].isMain && (
                    <span className="ml-2 px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full">HQ</span>
                  )}
                </h4>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">{offices[selectedOffice].address}</p>
                      <p className="text-gray-700">{offices[selectedOffice].city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-gray-700">{offices[selectedOffice].phone}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <p className="text-gray-700">{offices[selectedOffice].email}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <p className="text-gray-700">{offices[selectedOffice].hours}</p>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white border-none rounded-full py-3 font-pixel font-bold transform hover:scale-105 transition-all duration-200"
                  icon={<MapPin className="w-5 h-5" />}
                >
                  Get Directions
                </Button>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🌟 Follow Us</h3>
              <p className="text-gray-600 text-center mb-6">
                Stay connected with us on social media for the latest updates, behind-the-scenes content, and community
                events!
              </p>

              <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    shape="circle"
                    size="large"
                    className={`${social.color} hover:opacity-90 text-white border-none shadow-lg transform hover:scale-110 transition-all duration-200`}
                    icon={social.icon}
                    title={social.name}
                  />
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                <p className="text-center text-sm text-gray-700">
                  <strong>🎮 Join our community:</strong> Get exclusive content, participate in events, and connect with
                  fellow Sweeties Dodging players!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
