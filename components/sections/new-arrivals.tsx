"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "HP 640 G3",
    image: "/laptop-front-view.jpg",
    category: "Laptops",
  },
  {
    id: 2,
    name: "LENOVO T450",
    image: "/laptop-keyboard-and-screen.jpg",
    category: "Laptops",
  },
  {
    id: 3,
    name: "LENOVO T470S",
    image: "/laptop-side-view.jpg",
    category: "Laptops",
  },
  {
    id: 4,
    name: "HP 850 G5",
    image: "/professional-laptop.jpg",
    category: "Laptops",
  },
  {
    id: 5,
    name: "D-Link Router",
    image: "/network-device.jpg",
    category: "Network",
  },
]

export default function NewArrivals() {
  const [likedProducts, setLikedProducts] = useState<number[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const toggleLike = (productId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 text-primary animate-fade-in-down">New Arrivals</h2>
        <p className="text-center text-muted-foreground mb-16 animate-fade-in">Discover our latest tech products</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product, idx) => {
            const isHovered = hoveredId === product.id
            const hasHoveredItem = hoveredId !== null
            const isNotHovered = hasHoveredItem && !isHovered
            
            return (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div
                  className={`relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer group bg-black ${
                    isHovered 
                      ? "bg-primary scale-110 z-20 shadow-2xl" 
                      : isNotHovered 
                        ? "scale-95 opacity-60" 
                        : "hover:shadow-2xl"
                  } animate-fade-in-up stagger-item-${idx + 1}`}
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                {/* Product Image Container */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ transform: "rotate(-5deg) scale(1.1)" }}
                  />
                  
                  {/* Heart Icon */}
                  <button
                    onClick={(e) => toggleLike(product.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-all duration-300"
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        likedProducts.includes(product.id) 
                          ? "fill-red-500 text-red-500" 
                          : "text-white"
                      }`} 
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg text-white mb-3 group-hover:text-orange-300 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <button className="w-full bg-white text-black py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                    See More
                  </button>
                </div>
              </div>
            </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
