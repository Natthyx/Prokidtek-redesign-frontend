import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: Phone,
      title: "Phone",
      content: "011-5-54-08-57/58",
      subtext: "Mon-Sat, 9AM-8PM",
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
      content: "Aberus Building ground floor rom. No G03",
      subtext: "Bole Dembel, Addis Ababa,Ethiopia",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Monday - Sunday",
      subtext: "9:00 AM - 8:00 PM",
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
