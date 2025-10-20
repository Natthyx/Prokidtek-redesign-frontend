import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      subtext: "Mon-Fri, 9AM-6PM EST",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@prokidtek.com",
      subtext: "We'll reply within 24 hours",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 Tech Street",
      subtext: "City, State 12345",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Monday - Friday",
      subtext: "9:00 AM - 6:00 PM EST",
    },
  ]

  return (
    <div className="space-y-6">
      {contactDetails.map((detail) => {
        const Icon = detail.icon
        return (
          <div
            key={detail.title}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg transition-all duration-300 hover:shadow-orange-500/25 hover:border-orange-500/50 transform hover:scale-105 relative z-10"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{detail.title}</h3>
                <p className="text-white font-semibold">{detail.content}</p>
                <p className="text-white/70 text-sm">{detail.subtext}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
