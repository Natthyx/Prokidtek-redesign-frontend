"use client"

import { useEffect, useRef, useState } from "react"
import { Laptop, Monitor, Wifi, Headphones } from "lucide-react"

const products = [
  {
    icon: Laptop,
    name: "Laptops",
    description: "High-performance laptops for professionals and creators",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Monitor,
    name: "Desktops",
    description: "Powerful desktop systems for demanding workloads",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Wifi,
    name: "Network Devices",
    description: "Enterprise-grade networking solutions",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Headphones,
    name: "Audio Equipment",
    description: "Premium audio devices for professionals",
    color: "from-pink-500 to-pink-600",
  },
]

export default function ProductsWeOffer() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<boolean[]>([false, false, false, false])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          products.forEach((_, index) => {
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
    <section className="py-20 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Diverse Product Range</h2>
          <p className="text-xl text-white/80">
            We offer a comprehensive selection of premium technology products across multiple categories
          </p>
        </div>

        <div ref={sectionRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const Icon = product.icon
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl bg-white/10 p-8 border border-white/20 transition-all duration-500 transform ${
                  visibleItems[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } hover:shadow-2xl hover:border-primary/50 hover:scale-105 cursor-pointer backdrop-blur-sm`}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{product.description}</p>

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
