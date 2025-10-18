"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const allProducts = [
  {
    id: 1,
    name: "ProBook Elite 15",
    category: "laptops",
    description: "High-performance laptop for professionals",
    specs: ["Intel i7", "16GB RAM", "512GB SSD"],
    image: "/professional-laptop.jpg",
    images: ["/professional-laptop.jpg", "/laptop-keyboard.jpg", "/laptop-screen.jpg"],
    fullDescription:
      "Experience ultimate performance with the ProBook Elite 15. Engineered for professionals who demand speed and reliability. Features a stunning 15-inch display, all-day battery life, and premium build quality.",
    rating: 4.8,
    reviews: 324,
    reviewsList: [
      { author: "John Smith", rating: 5, text: "Excellent laptop! Fast, reliable, and beautiful design." },
      { author: "Sarah Johnson", rating: 5, text: "Best investment for my work. Highly recommended!" },
      { author: "Mike Chen", rating: 4, text: "Great performance, battery could be better." },
    ],
  },
  {
    id: 2,
    name: "UltraBook Pro",
    category: "laptops",
    description: "Ultra-thin and powerful computing",
    specs: ["Intel i9", "32GB RAM", "1TB SSD"],
    image: "/ultrabook-thin-laptop.jpg",
    images: ["/ultrabook-thin-laptop.jpg", "/laptop-side-view.jpg", "/laptop-front-view.jpg"],
    fullDescription:
      "The thinnest powerhouse ever created. UltraBook Pro combines portability with desktop-class performance. Perfect for professionals on the go.",
    rating: 4.9,
    reviews: 512,
    reviewsList: [
      { author: "Emma Wilson", rating: 5, text: "Incredibly thin yet powerful. Love it!" },
      { author: "David Brown", rating: 5, text: "Worth every penny. Best ultrabook on the market." },
      { author: "Lisa Anderson", rating: 5, text: "Exceeded my expectations in every way." },
    ],
  },
  {
    id: 3,
    name: "WorkStation X1",
    category: "desktops",
    description: "Professional workstation for creative work",
    specs: ["Xeon Processor", "64GB RAM", "2TB SSD"],
    image: "/desktop-workstation.jpg",
    images: ["/desktop-workstation.jpg", "/desktop-tower.jpg", "/desktop-setup.jpg"],
    fullDescription:
      "Built for creators. WorkStation X1 delivers the power needed for 4K video editing, 3D rendering, and more. Professional-grade components ensure reliability.",
    rating: 4.7,
    reviews: 287,
    reviewsList: [
      { author: "Alex Turner", rating: 5, text: "Perfect for video editing. No lag whatsoever." },
      { author: "Nina Patel", rating: 4, text: "Great workstation, a bit pricey but worth it." },
      { author: "Chris Lee", rating: 5, text: "Handles all my 3D projects smoothly." },
    ],
  },
  {
    id: 4,
    name: "Desktop Pro Max",
    category: "desktops",
    description: "Powerful desktop for gaming and work",
    specs: ["Intel i7", "32GB RAM", "1TB SSD"],
    image: "/gaming-desktop.jpg",
    images: ["/gaming-desktop.jpg", "/desktop-rgb-lighting.jpg", "/desktop-interior.jpg"],
    fullDescription:
      "Maximum performance for maximum productivity. Desktop Pro Max is ready for anything you throw at it. Gaming, streaming, or professional work.",
    rating: 4.6,
    reviews: 198,
    reviewsList: [
      { author: "Ryan Cooper", rating: 5, text: "Gaming beast! Runs everything at max settings." },
      { author: "Jessica White", rating: 4, text: "Great all-rounder for work and gaming." },
      { author: "Tom Harris", rating: 5, text: "Best desktop I've owned." },
    ],
  },
  {
    id: 5,
    name: "Enterprise Router 5G",
    category: "network",
    description: "Next-gen 5G network router",
    specs: ["5G Support", "WiFi 6E", "Gigabit Ports"],
    image: "/placeholder.svg?height=384&width=512",
    images: [
      "/placeholder.svg?height=384&width=512",
      "/placeholder.svg?height=384&width=512",
      "/placeholder.svg?height=384&width=512",
    ],
    fullDescription:
      "Connect to the future with 5G technology. Enterprise Router 5G ensures blazing-fast connectivity for your entire network.",
    rating: 4.5,
    reviews: 156,
    reviewsList: [
      { author: "Mark Davis", rating: 5, text: "5G speeds are incredible. Worth upgrading!" },
      { author: "Susan Miller", rating: 4, text: "Great router, setup was easy." },
      { author: "Kevin Moore", rating: 5, text: "Best network performance I've had." },
    ],
  },
  {
    id: 6,
    name: "Network Switch Pro",
    category: "network",
    description: "Enterprise-grade network switch",
    specs: ["48 Ports", "10Gbps", "PoE Support"],
    image: "/placeholder.svg?height=384&width=512",
    images: [
      "/placeholder.svg?height=384&width=512",
      "/placeholder.svg?height=384&width=512",
      "/placeholder.svg?height=384&width=512",
    ],
    fullDescription:
      "Enterprise-grade reliability meets cutting-edge performance. Network Switch Pro handles your most demanding workloads.",
    rating: 4.4,
    reviews: 142,
    reviewsList: [
      { author: "Patricia Garcia", rating: 5, text: "Reliable and fast. Perfect for our office." },
      { author: "Robert Taylor", rating: 4, text: "Good switch, professional support is great." },
      { author: "Linda Martinez", rating: 5, text: "No issues since installation." },
    ],
  },
  {
    id: 7,
    name: "Studio Monitor Speakers",
    category: "audio",
    description: "Professional studio audio monitors",
    specs: ["120W Power", "Frequency: 20Hz-20kHz", "XLR Input"],
    image: "/placeholder.svg?height=384&width=512",
    images: [
      "/placeholder.svg?height=384&width=512",
      "/placeholder.svg?height=384&width=512",
      "/placeholder.svg?height=384&width=512",
    ],
    fullDescription:
      "Studio-quality sound for professionals. Studio Monitor Speakers deliver accurate, detailed audio for critical listening.",
    rating: 4.8,
    reviews: 267,
    reviewsList: [
      { author: "James Wilson", rating: 5, text: "Crystal clear sound. Perfect for mixing." },
      { author: "Michelle Clark", rating: 5, text: "Professional quality at a great price." },
      { author: "Daniel Rodriguez", rating: 5, text: "Best monitors I've used." },
    ],
  },
  {
    id: 8,
    name: "Wireless Headphones Pro",
    category: "audio",
    description: "Premium wireless audio experience",
    specs: ["40hr Battery", "Active Noise Cancel", "Bluetooth 5.3"],
    image: "/placeholder.svg?height=384&width=512",
    images: [
      "/placeholder.svg?height=384&width=512",
      "/placeholder.svg?height=384&width=512",
      "/placeholder.svg?height=384&width=512",
    ],
    fullDescription:
      "Immerse yourself in sound. Wireless Headphones Pro combines premium audio with industry-leading noise cancellation.",
    rating: 4.9,
    reviews: 891,
    reviewsList: [
      { author: "Amanda Scott", rating: 5, text: "Best headphones ever! Noise cancellation is amazing." },
      { author: "Brandon Lee", rating: 5, text: "Comfortable and sounds incredible." },
      { author: "Chloe Green", rating: 5, text: "Worth every penny. Highly recommend!" },
    ],
  },
]

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState("")
  const [showThankYouPopup, setShowThankYouPopup] = useState(false)

  const product = allProducts.find((p) => p.id === Number.parseInt(params.id))

  useEffect(() => {
    setIsLoading(false)
    setIsVisible(true)
    window.scrollTo(0, 0)
  }, [])

  if (!product) {
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

  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleSubmitRating = () => {
    if (userRating > 0) {
      setShowThankYouPopup(true)
      setTimeout(() => {
        setShowThankYouPopup(false)
        setUserRating(0)
        setUserComment("")
      }, 3000)
    }
  }

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
                <img
                  src={product.images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 rounded-3xl object-cover transition-all duration-500 transform hover:scale-105"
                />

                {/* Image Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6 text-black" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-black" />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl transition-all duration-300 transform hover:scale-110 overflow-hidden ${
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
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-foreground/30"}`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">{product.rating}</span>
                <span className="text-foreground/60">({product.reviews} reviews)</span>
              </div>

              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">{product.fullDescription}</p>

              {/* Specs */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-foreground mb-4">Key Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="bg-muted/50 p-4 rounded-2xl hover:bg-muted transition-colors duration-300"
                    >
                      <p className="text-sm text-foreground/70">{spec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full border-2 border-primary text-primary px-8 py-4 rounded-full hover:bg-primary/10 transition-all duration-300 font-bold text-lg transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-3xl font-bold text-foreground mb-8">Customer Reviews</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {product.reviewsList.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-card border-2 border-border rounded-3xl p-6 hover:shadow-lg transition-all duration-500 transform hover:scale-105 shadow-lg"
                  style={{ animationDelay: `${300 + idx * 100}ms` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "text-foreground/30"}`}
                      />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-4">{review.text}</p>
                  <p className="font-semibold text-foreground">{review.author}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mb-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 animate-fade-in-up shadow-lg"
            style={{ animationDelay: "400ms" }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Rate This Product</h2>
            <div className="max-w-2xl">
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
                disabled={userRating === 0}
                className={`w-full px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  userRating === 0
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
              {relatedProducts.slice(0, 3).map((relatedProduct, idx) => (
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
                        <span className="text-sm font-semibold text-foreground">{relatedProduct.rating}</span>
                        <span className="text-xs text-foreground/60">({relatedProduct.reviews})</span>
                      </div>
                      <span className="text-primary font-bold">→</span>
                    </div>
                  </div>
                </a>
              ))}
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
