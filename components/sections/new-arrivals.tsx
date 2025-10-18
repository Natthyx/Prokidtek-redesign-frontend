"use client"

import { useState } from "react"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "UltraBook Pro 15",
    image: "/premium-laptop.jpg",
    category: "Laptops",
  },
  {
    id: 2,
    name: "Gaming Desktop X",
    image: "/gaming-desktop-computer.jpg",
    category: "Desktops",
  },
  {
    id: 3,
    name: "Network Switch Pro",
    image: "/network-switch-device.jpg",
    category: "Network",
  },
  {
    id: 4,
    name: "Studio Headphones",
    image: "/professional-audio-headphones.jpg",
    category: "Audio",
  },
]

export default function NewArrivals() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 text-secondary animate-fade-in-down">New Arrivals</h2>
        <p className="text-center text-muted-foreground mb-16 animate-fade-in">Discover our latest tech products</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div
                className={`bg-card rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl animate-fade-in-up stagger-item-${idx + 1} card-hover cursor-pointer group`}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className={`relative h-64 bg-muted overflow-hidden ${hoveredId === product.id ? "hover-glow" : ""}`}
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                  />
                  {hoveredId === product.id && (
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-primary/20 to-transparent flex items-center justify-center animate-fade-in">
                      <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-accent transition-all duration-300 transform hover:scale-110 shadow-lg">
                        View Details
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-sm text-primary font-semibold mb-3 uppercase tracking-widest">
                    {product.category}
                  </p>
                  <h3 className="font-bold text-lg text-secondary group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
