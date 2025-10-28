"use client"

import { useState, useEffect } from "react"
import { getBestSelling, getProduct } from "@/lib/firebase-services"
import { BestSelling as FirebaseBestSelling, Product } from "@/lib/types"

interface DisplayProduct {
  id: string
  name: string
  image: string
  rating: number
}

export default function BestSelling() {
  const [products, setProducts] = useState<DisplayProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBestSelling = async () => {
      try {
        setLoading(true)
        const bestSellingItems = await getBestSelling()
        // Limit to 4 products as requested
        const limitedBestSelling = bestSellingItems.slice(0, 4)
        
        // Fetch actual product data for each best selling item
        const displayProducts: DisplayProduct[] = []
        for (const item of limitedBestSelling) {
          try {
            const product = await getProduct(item.productId)
            if (product) {
              displayProducts.push({
                id: product.id,
                name: product.name,
                image: product.image || "/placeholder.svg",
                rating: product.rating || 0
              })
            }
          } catch (error) {
            console.error(`Error fetching product ${item.productId}:`, error)
          }
        }
        
        setProducts(displayProducts)
      } catch (error) {
        console.error('Error fetching best selling products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchBestSelling()
  }, [])

  // Function to render star ratings with proper half-star support
  // const renderStars = (rating: number) => {
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 >= 0.5;
  //   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
  //   return (
  //     <>
  //       {/* Full stars */}
  //       {[...Array(fullStars)].map((_, i) => (
  //         <span key={`full-${i}`} className="text-yellow-400">★</span>
  //       ))}
        
  //       {/* Half star */}
  //       {hasHalfStar && (
  //         <span key="half" className="text-yellow-400">★</span>
  //       )}
        
  //       {/* Empty stars */}
  //       {[...Array(emptyStars)].map((_, i) => (
  //         <span key={`empty-${i}`} className="text-gray-300">★</span>
  //       ))}
  //     </>
  //   );
  // };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 text-secondary animate-fade-in-down">
            Best Selling Products
          </h2>
          <p className="text-center text-muted-foreground mb-16 animate-fade-in">Our most popular items</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="h-80 bg-muted rounded-3xl animate-pulse"></div>
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
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 text-secondary animate-fade-in-down">
          Best Selling Products
        </h2>
        <p className="text-center text-muted-foreground mb-16 animate-fade-in">Our most popular items</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <a
              key={product.id}
              href={`/products/${product.id}`}
              className={`bg-card rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-orange-500/25 hover:border-orange-500/50 border border-border animate-fade-in-up stagger-item-${idx + 1}`}
            >
              <div className="h-56 bg-muted overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="font-bold text-2xl text-secondary mb-4">{product.name}</h3>
                {/* <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-1 text-lg">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating > 0 ? `(${product.rating.toFixed(1)})` : '(0.0)'}
                  </span>
                </div> */}
                <button className="w-full bg-primary text-primary-foreground py-3 rounded-full hover:bg-accent transition-all duration-300 font-bold text-lg transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}