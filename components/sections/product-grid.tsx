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
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, idx) => (
              <div key={idx} className="bg-card rounded-2xl overflow-hidden border-2 border-border animate-pulse">
                <div className="h-28 bg-muted"></div>
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
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
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500">Error loading products: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
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
              <div className="bg-card rounded-2xl overflow-hidden border-2 border-border hover:shadow-2xl transition-all duration-500 transform hover:scale-105 h-full flex flex-col hover:shadow-orange-500/25 hover:border-orange-500/50">
                <div className="h-40 bg-muted relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-xs text-primary font-semibold mb-1 uppercase tracking-wide">{product.category}</p>
                  <h3 className="font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-foreground/70 text-xs mb-3 line-clamp-2">{product.description}</p>
                  <div className="space-y-1 mb-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        {product.specs.slice(0, 2).map((spec, idx) => (
                          <p key={idx} className="text-xs text-foreground/60">
                            • {spec}
                          </p>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <span className="text-xs font-semibold text-foreground">{product.rating}</span>
                        <span className="text-xs text-foreground/60">({product.reviews})</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-primary text-primary-foreground px-3 py-2 rounded-full hover:bg-accent transition-all duration-300 font-bold text-sm transform hover:scale-105 group-hover:shadow-lg">
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
