"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useProducts } from "@/hooks/use-products"
import { useProductFilter } from "@/contexts/product-filter-context"
import { getProductReviews } from "@/lib/firebase-services"

export default function ProductGrid() {
  const [isVisible, setIsVisible] = useState(false)
  const [productReviews, setProductReviews] = useState<Record<string, { count: number; averageRating: number }>>({})
  const { products, loading, error } = useProducts()
  const { activeCategory, searchQuery, sortBy } = useProductFilter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Fetch review counts and average ratings for all products
  useEffect(() => {
    const fetchReviewData = async () => {
      const reviewsData: Record<string, { count: number; averageRating: number }> = {}
      for (const product of products) {
        try {
          const reviews = await getProductReviews(product.id)
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
          const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0
          
          reviewsData[product.id] = {
            count: reviews.length,
            averageRating: Math.round(averageRating * 10) / 10 // Round to 1 decimal place
          }
        } catch (error) {
          console.error(`Error fetching reviews for product ${product.id}:`, error)
          reviewsData[product.id] = {
            count: 0,
            averageRating: 0
          }
        }
      }
      setProductReviews(reviewsData)
    }

    if (products.length > 0) {
      fetchReviewData()
    }
  }, [products])

  // Filter and sort products based on context values
  const filteredAndSortedProducts = (() => {
    let result = [...products]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.specs.some(spec => spec.toLowerCase().includes(query))
      )
    }

    // Apply category filter
    if (activeCategory !== "all") {
      result = result.filter(product => 
        product.category.toLowerCase() === activeCategory.toLowerCase()
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      case "rating":
        result.sort((a, b) => {
          const ratingA = productReviews[a.id]?.averageRating || 0
          const ratingB = productReviews[b.id]?.averageRating || 0
          return ratingB - ratingA
        })
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "featured":
      default:
        // Default sorting (featured first, then by name)
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.name.localeCompare(b.name)
        })
        break
    }

    return result
  })()

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

  if (filteredAndSortedProducts.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">No products found</h3>
          <p className="text-foreground/70">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredAndSortedProducts.map((product, idx) => {
            const reviewData = productReviews[product.id] || { count: 0, averageRating: 0 }

            return (
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
                    {/* <div className="space-y-1 mb-4 flex-grow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          {product.specs.slice(0, 2).map((spec, idx) => (
                            <p key={idx} className="text-xs text-foreground/60">
                              • {spec}
                            </p>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <span className="text-xs font-semibold text-foreground">
                            {reviewData.averageRating > 0 ? reviewData.averageRating.toFixed(1) : '0.0'}
                          </span>
                          <span className="text-xs text-foreground/60">
                            ({reviewData.count})
                          </span>
                        </div>
                      </div>
                    </div> */}
                    <button className="w-full bg-primary text-primary-foreground px-3 py-2 rounded-full hover:bg-accent transition-all duration-300 font-bold text-sm transform hover:scale-105 group-hover:shadow-lg">
                      View Details
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
