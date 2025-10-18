"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useProducts } from "@/hooks/use-products"

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [isVisible, setIsVisible] = useState(false)
  const { products, loading, error } = useProducts()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProducts = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory)

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className="bg-card rounded-3xl overflow-hidden border-2 border-border animate-pulse">
                <div className="h-40 bg-muted"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-6 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-500">Error loading products: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, idx) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className={`group block transform transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${idx * 100}ms`,
              }}
            >
              <div className="bg-card rounded-3xl overflow-hidden border-2 border-border hover:shadow-2xl transition-all duration-500 transform hover:scale-105 h-full flex flex-col">
                <div className="h-40 bg-muted relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wide">{product.category}</p>
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4">{product.description}</p>
                  <div className="space-y-2 mb-6 flex-grow">
                    {product.specs.map((spec, idx) => (
                      <p key={idx} className="text-xs text-foreground/60">
                        • {spec}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                      <span className="text-xs text-foreground/60">({product.reviews})</span>
                    </div>
                  </div>
                  <button className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-full hover:bg-accent transition-all duration-300 font-bold transform hover:scale-105 group-hover:shadow-lg">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
