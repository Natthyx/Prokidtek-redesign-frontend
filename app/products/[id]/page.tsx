"use client"

import { useState, useEffect, use } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ChevronLeft, ChevronRight, Star, ChevronDown, ChevronUp } from "lucide-react"
import { useProduct } from "@/hooks/use-products"
import { useProducts } from "@/hooks/use-products"
import { useProductReviews } from "@/hooks/use-product-reviews"
import { getProductReviews } from "@/lib/firebase-services"
import ImageZoom from "@/components/ui/image-zoom"

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState("")
  const [userName, setUserName] = useState("")
  const [showThankYouPopup, setShowThankYouPopup] = useState(false)
  const [relatedProductReviews, setRelatedProductReviews] = useState<Record<string, { count: number; averageRating: number }>>({})
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showAllSpecs, setShowAllSpecs] = useState(false)

  const resolvedParams = use(params)
  const { product, loading: productLoading, error: productError } = useProduct(resolvedParams.id)
  const { products } = useProducts()
  const { reviews, loading: reviewsLoading, error: reviewsError, submitReview } = useProductReviews(resolvedParams.id)

  // Initialize images and specs early to avoid reference errors
  const images = product?.images || [product?.image || "/placeholder.svg"]
  const specs = product?.specs || []

  // Format text with bullet points
  const formatWithBullets = (text: string, asParagraphChild: boolean = false) => {
    // Split by line breaks or by patterns that look like list items
    const lines = text.split(/\n|(?=-)/).filter(line => line.trim() !== '');
    
    // Check if there are actual bullet points to format
    const hasBullets = lines.some(line => line.trim().startsWith('-'));
    
    if (!hasBullets) {
      return text; // Return plain text if no bullets
    }
    
    // If used as a child of <p>, return fragment with <li> elements
    if (asParagraphChild) {
      return (
        <>
          {lines.map((line, index) => {
            // Remove leading dash if present
            const cleanLine = line.trim().startsWith('-') ? line.trim().substring(1).trim() : line.trim();
            return (
              <span key={index}>
                {index > 0 && <br />}
                • {cleanLine}
              </span>
            );
          })}
        </>
      );
    }
    
    // Otherwise, return proper <ul> element
    return (
      <ul className="list-disc pl-5 space-y-1">
        {lines.map((line, index) => {
          // Remove leading dash if present
          const cleanLine = line.trim().startsWith('-') ? line.trim().substring(1).trim() : line.trim();
          return <li key={index} className="text-foreground/80">{cleanLine}</li>;
        })}
      </ul>
    );
  };

  // Truncate description for preview
  const truncateDescription = (text: string, maxLength: number = 300) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  useEffect(() => {
    setIsVisible(true)
    window.scrollTo(0, 0)
  }, [])

  // Fetch review counts and average ratings for related products
  useEffect(() => {
    const fetchRelatedProductReviews = async () => {
      if (!product) return
      
      const relatedProducts = getRelatedProducts();
      const reviewsData: Record<string, { count: number; averageRating: number }> = {}
      
      for (const relatedProduct of relatedProducts) {
        try {
          const reviews = await getProductReviews(relatedProduct.id)
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
          const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0
          
          reviewsData[relatedProduct.id] = {
            count: reviews.length,
            averageRating: Math.round(averageRating * 10) / 10 // Round to 1 decimal place
          }
        } catch (error) {
          console.error(`Error fetching reviews for product ${relatedProduct.id}:`, error)
          reviewsData[relatedProduct.id] = {
            count: 0,
            averageRating: 0
          }
        }
      }
      
      setRelatedProductReviews(reviewsData)
    }

    if (product && products.length > 0) {
      fetchRelatedProductReviews()
    }
  }, [product, products])

  // Keyboard navigation for image slideshow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (images.length > 1) {
        if (e.key === 'ArrowLeft') {
          prevImage()
        } else if (e.key === 'ArrowRight') {
          nextImage()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length])

  if (productLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </main>
    )
  }

  if (productError || !product) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-xl text-foreground/60">Product not found</p>
        </div>
        <Footer />
      </main>
    )
  }

  // Function to find related products based on category, brand, and name similarity
  const getRelatedProducts = () => {
    if (!product || !products) return [];
    
    // First, filter by same category but exclude current product
    const sameCategoryProducts = products.filter((p) => 
      p.category === product.category && p.id !== product.id
    );
    
    // If we have less than 3 products in the same category, return them
    if (sameCategoryProducts.length <= 3) {
      return sameCategoryProducts;
    }
    
    // Create a scoring system for related products
    const scoredProducts = sameCategoryProducts.map(p => {
      let score = 0;
      
      // Score based on name similarity (case insensitive)
      const productNameLower = product.name.toLowerCase();
      const pNameLower = p.name.toLowerCase();
      
      // Exact brand match (e.g., "MacBook" in both names)
      if (productNameLower.includes('macbook') && pNameLower.includes('macbook')) {
        score += 10;
      }
      if (productNameLower.includes('dell') && pNameLower.includes('dell')) {
        score += 10;
      }
      if (productNameLower.includes('hp') && pNameLower.includes('hp')) {
        score += 10;
      }
      if (productNameLower.includes('lenovo') && pNameLower.includes('lenovo')) {
        score += 10;
      }
      if (productNameLower.includes('asus') && pNameLower.includes('asus')) {
        score += 10;
      }
      if (productNameLower.includes('acer') && pNameLower.includes('acer')) {
        score += 10;
      }
      
      // Partial name match (more points for longer matches)
      if (productNameLower.includes(pNameLower) || pNameLower.includes(productNameLower)) {
        score += 5;
      }
      
      // Word overlap (count common words)
      const productWords = productNameLower.split(/\s+/);
      const pWords = pNameLower.split(/\s+/);
      const commonWords = productWords.filter(word => pWords.includes(word));
      score += commonWords.length * 2;
      
      return { product: p, score };
    });
    
    // Sort by score (highest first) and take top 3
    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.product);
  };

  const relatedProducts = getRelatedProducts();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleSubmitRating = async () => {
    if (userRating > 0 && userName.trim() !== "") {
      const success = await submitReview({
        productId: product.id,
        author: userName,
        rating: userRating,
        comment: userComment,
        verified: false // Could be set to true if user is logged in and has purchased
      })

      if (success) {
        setShowThankYouPopup(true)
        setTimeout(() => {
          setShowThankYouPopup(false)
          setUserRating(0)
          setUserComment("")
          setUserName("")
        }, 3000)
      } else {
        alert("Failed to submit review. Please try again.")
      }
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Function to render star ratings with proper half-star support
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <>
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-5 h-5 fill-primary text-primary" />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <Star key="half" className="w-5 h-5 fill-primary text-primary" />
        )}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5 text-foreground/30" />
        ))}
      </>
    );
  };

  // Calculate average rating from reviews
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : product.rating || 0;

  // Format specifications into key-value pairs
  const formatSpecs = (specs: string[]) => {
    return specs.map((spec, index) => {
      // Try to split spec into key and value
      const colonIndex = spec.indexOf(':');
      if (colonIndex > 0) {
        const key = spec.substring(0, colonIndex).trim();
        const value = spec.substring(colonIndex + 1).trim();
        return { key, value, original: spec };
      }
      // If no colon, treat the whole spec as value with a generic key
      return { key: `Specification ${index + 1}`, value: spec, original: spec };
    });
  };

  const formattedSpecs = formatSpecs(specs);
  const maxSpecsToShow = 5;

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Product Detail Section */}
      <section className={`py-12 px-4 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div className="flex flex-col gap-6">
              <div className="relative">
                <ImageZoom
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96"
                />

                {/* Image Navigation - Only show if more than 1 image */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-10"
                    >
                      <ChevronLeft className="w-6 h-6 text-black" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-10"
                    >
                      <ChevronRight className="w-6 h-6 text-black" />
                    </button>
                    
                    {/* Image counter */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm z-10">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery - Only show if more than 1 image */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl transition-all duration-300 transform hover:scale-110 overflow-hidden ${
                        idx === currentImageIndex ? "ring-2 ring-primary scale-110" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div
              className={`flex flex-col justify-center transition-all duration-700 transform ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
            >
              <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wide">{product.category}</p>
              <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  {renderStars(averageRating)}
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {averageRating > 0 ? averageRating.toFixed(1) : '0.0'}
                </span>
                <span className="text-foreground/60">({reviews.length} reviews)</span>
              </div>

              {/* Description with expand/collapse */}
              <div className="mb-8">
                <div className="text-lg text-foreground/80 leading-relaxed mb-4">
                  {showFullDescription 
                    ? formatWithBullets(product.fullDescription, true) 
                    : formatWithBullets(truncateDescription(product.fullDescription), true)}
                </div>
                {product.fullDescription.length > 300 && (
                  <button 
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="flex items-center text-primary font-semibold hover:text-accent transition-colors"
                  >
                    {showFullDescription ? (
                      <>
                        Show Less <ChevronUp className="ml-1 w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Read More <ChevronDown className="ml-1 w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Specs in Amazon-like format with expand/collapse */}
              {specs.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">Product Specifications</h3>
                  <div className="bg-muted/50 rounded-2xl overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {(showAllSpecs ? formattedSpecs : formattedSpecs.slice(0, maxSpecsToShow)).map((spec, idx) => (
                          <tr 
                            key={idx} 
                            className={idx % 2 === 0 ? "bg-white" : "bg-muted/30"}
                          >
                            <td className="px-4 py-3 font-medium text-foreground/80 border-b border-muted/50 w-1/3">
                              {spec.key}
                            </td>
                            <td className="px-4 py-3 text-foreground border-b border-muted/50">
                              {spec.value.includes('-') && spec.value.split('-').filter(v => v.trim() !== '').length > 1 ? (
                                <ul className="list-disc pl-5 space-y-1">
                                  {spec.value.split('-').filter(v => v.trim() !== '').map((item, itemIndex) => (
                                    <li key={itemIndex} className="text-foreground/80">{item.trim()}</li>
                                  ))}
                                </ul>
                              ) : (
                                spec.value
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {formattedSpecs.length > maxSpecsToShow && (
                      <button
                        onClick={() => setShowAllSpecs(!showAllSpecs)}
                        className="w-full py-3 text-center text-primary font-semibold hover:bg-muted/50 transition-colors flex items-center justify-center"
                      >
                        {showAllSpecs ? (
                          <>
                            Show Less <ChevronUp className="ml-1 w-4 h-4" />
                          </>
                        ) : (
                          <>
                            View All {formattedSpecs.length} Specifications <ChevronDown className="ml-1 w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* <button className="w-full border-2 border-primary text-primary px-8 py-4 rounded-full hover:bg-primary/10 transition-all duration-300 font-bold text-lg transform hover:scale-105">
                Learn More
              </button> */}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-3xl font-bold text-foreground mb-8">Customer Reviews ({reviews.length})</h2>
            
            {reviewsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : reviewsError ? (
              <div className="text-center py-12">
                <p className="text-red-500">Error loading reviews</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/60 text-lg">No reviews yet. Be the first to review this product!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{review.author}</h3>
                        <p className="text-sm text-foreground/60">{formatDate(review.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-foreground/80">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className="mb-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 animate-fade-in-up shadow-lg"
            style={{ animationDelay: "400ms" }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Rate This Product</h2>
            <div className="max-w-2xl">
              <div className="mb-6">
                <label className="block text-lg font-semibold text-foreground mb-4">Your Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-4 rounded-2xl border-2 border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-lg font-semibold text-foreground mb-4">Your Rating</label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="transition-all duration-300 transform hover:scale-125"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= userRating ? "fill-primary text-primary" : "text-foreground/30 hover:text-primary/50"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-semibold text-foreground mb-4">Your Comment</label>
                <textarea
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="Share your feedback about this product..."
                  className="w-full p-4 rounded-2xl border-2 border-border focus:border-primary focus:outline-none transition-colors resize-none"
                  rows={4}
                />
              </div>

              <button
                onClick={handleSubmitRating}
                disabled={userRating === 0 || userName.trim() === ""}
                className={`w-full px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  userRating === 0 || userName.trim() === ""
                    ? "bg-foreground/20 text-foreground/50 cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-accent"
                }`}
              >
                Submit Rating
              </button>
            </div>
          </div>

          {showThankYouPopup && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center animate-scale-in">
                <div className="text-6xl mb-6">👍</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Thank You for Your Review!</h3>
                <p className="text-foreground/70 text-lg">Your feedback helps us improve and serve you better.</p>
              </div>
            </div>
          )}

          {/* Related Products */}
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            <h2 className="text-3xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.slice(0, 3).map((relatedProduct, idx) => {
                const reviewData = relatedProductReviews[relatedProduct.id] || { count: 0, averageRating: 0 }

                return (
                  <a
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="group block bg-card border-2 border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 shadow-lg"
                    style={{ animationDelay: `${600 + idx * 100}ms` }}
                  >
                    <div className="h-40 bg-muted overflow-hidden group-hover:scale-110 transition-transform duration-500">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-foreground/70 text-sm mb-4">{relatedProduct.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {renderStars(reviewData.averageRating)}
                          <span className="text-sm font-semibold text-foreground">
                            {reviewData.averageRating > 0 ? reviewData.averageRating.toFixed(1) : '0.0'}
                          </span>
                          <span className="text-xs text-foreground/60">({reviewData.count})</span>
                        </div>
                        <span className="text-primary font-bold">→</span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Browse More Section */}
          <div
            className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-12 text-center animate-fade-in-up shadow-lg"
            style={{ animationDelay: "700ms" }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Explore More Categories</h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Discover our complete range of laptops, desktops, network devices, and audio equipment
            </p>
            <div className="grid md:grid-cols-4 gap-4">
              {["Laptops", "Desktops", "Network Devices", "Audio Equipment"].map((category, idx) => (
                <a
                  key={idx}
                  href="/products"
                  className="bg-white hover:bg-primary hover:text-primary-foreground text-foreground px-6 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}