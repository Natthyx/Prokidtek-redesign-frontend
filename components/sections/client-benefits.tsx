"use client"

import { useEffect, useState } from "react"

export default function ClientBenefits() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const benefits = [
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support to ensure your business never stops",
      icon: "🛡️",
    },
    {
      title: "Quality Assurance",
      description: "All products undergo rigorous testing for maximum reliability",
      icon: "✓",
    },
    {
      title: "Fast Delivery",
      description: "Quick turnaround times with nationwide shipping available",
      icon: "⚡",
    },
    {
      title: "Expert Consultation",
      description: "Professional guidance to find the perfect solution for your needs",
      icon: "💡",
    },
    {
      title: "Competitive Pricing",
      description: "Best value for money without compromising on quality",
      icon: "💰",
    },
    {
      title: "Warranty Coverage",
      description: "Comprehensive warranty and after-sales service included",
      icon: "🔒",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Why Choose ProKidTek</h2>
          <p className="text-xl text-white/80">Exceptional benefits for our valued clients</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`bg-white/10 rounded-2xl p-8 border-2 border-white/20 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 backdrop-blur-sm ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${idx * 75}ms`,
              }}
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-white/80">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
