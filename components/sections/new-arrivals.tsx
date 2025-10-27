"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { getNewArrivals, getProduct } from "@/lib/firebase-services"
import { NewArrival as FirebaseNewArrival, Product } from "@/lib/types"

interface DisplayProduct {
  id: string
  name: string
  image: string
  category: string
  rating: number
}

export default function NewArrivals() {
  const [likedProducts, setLikedProducts] = useState<string[]>([])
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [products, setProducts] = useState<DisplayProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true)
        const newArrivals = await getNewArrivals()
        // Limit to 5 products as requested
        const limitedArrivals = newArrivals.slice(0, 5)
        
        // Fetch actual product data for each new arrival
        const displayProducts: DisplayProduct[] = []
        for (const item of limitedArrivals) {
          try {
            const product = await getProduct(item.productId)
            if (product) {
              displayProducts.push({
                id: product.id,
                name: product.name,
                image: product.image || "/placeholder.svg",
                category: product.category || "Product",
                rating: product.rating || 0
              })
            }
          } catch (error) {
            console.error(`Error fetching product ${item.productId}:`, error)
          }
        }
        
        setProducts(displayProducts)
      } catch (error) {
        console.error('Error fetching new arrivals:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchNewArrivals()
  }, [])

  // const toggleLike = (productId: string, e: React.MouseEvent) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   setLikedProducts(prev => 
  //     prev.includes(productId) 
  //       ? prev.filter(id => id !== productId)
  //       : [...prev, productId]
  //   )
  // }

  // Function to render star ratings with proper half-star support
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <>
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">★</span>
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <span key="half" className="text-yellow-400">★</span>
        )}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
      </>
    );
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 text-primary animate-fade-in-down">New Arrivals</h2>
          <p className="text-center text-muted-foreground mb-16 animate-fade-in">Discover our latest tech products</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="h-64 bg-muted rounded-3xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Don't show section if no products
  if (products.length === 0) {
    return null
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
            const hoveredIndex = hoveredId ? products.findIndex(p => p.id === hoveredId) : -1
            
            // Determine corner rounding based on position relative to hovered card
            const getCornerRounding = () => {
              if (!hasHoveredItem || isHovered) return "rounded-3xl"

              if (idx < hoveredIndex) {
                // Left of hovered: straighten left side, exaggerate right rounding
                return "rounded-l-none rounded-r-[2.5rem]"
              } else if (idx > hoveredIndex) {
                // Right of hovered: exaggerate left rounding, straighten right side
                return "rounded-l-[2.5rem] rounded-r-none"
              }
              return "rounded-3xl"
            }
            
            return (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div
                  className={`relative ${getCornerRounding()} overflow-hidden transition-all duration-500 cursor-pointer group bg-black ${
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
                  {/* <button
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
                  </button> */}
                </div>

                {/* Product Info */}
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  {/* Rating Display */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <div className="flex text-xs">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-300">
                      {product.rating > 0 ? product.rating.toFixed(1) : '0.0'}
                    </span>
                  </div>
                  
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