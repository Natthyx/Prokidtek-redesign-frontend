"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Shield, CheckCircle, Star } from "lucide-react"

const certificates = [
  {
    icon: Award,
    title: "ISO 9001:2015",
    description: "Quality Management System Certified",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Shield,
    title: "Authorized Distributor",
    description: "Official Partner of Leading Tech Brands",
    color: "from-green-500 to-green-600",
  },
  {
    icon: CheckCircle,
    title: "Certified Supplier",
    description: "Government Approved & Verified",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Star,
    title: "Excellence Award",
    description: "Best Tech Retailer 2024",
    color: "from-orange-500 to-orange-600",
  },
]

export default function Certificates() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<boolean[]>([false, false, false, false])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          certificates.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }, index * 150)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Certifications & Awards</h2>
          <p className="text-xl text-foreground/70">
            Recognized for excellence, quality, and commitment to customer satisfaction
          </p>
        </div>

        <div ref={sectionRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => {
            const Icon = cert.icon
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl bg-white p-8 border border-primary/10 transition-all duration-500 transform ${
                  visibleItems[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } hover:shadow-2xl hover:border-primary/50 hover:scale-105 cursor-pointer`}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${cert.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{cert.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{cert.description}</p>

                  {/* Animated line */}
                  <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300 rounded-full"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
