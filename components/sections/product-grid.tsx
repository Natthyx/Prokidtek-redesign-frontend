"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const products = [
    {
      id: 1,
      name: "ProBook Elite 15",
      category: "laptops",
      description: "High-performance laptop for professionals",
      specs: ["Intel i7", "16GB RAM", "512GB SSD"],
      image: "/professional-laptop-computer.jpg",
      images: ["/professional-laptop-front-view.jpg", "/laptop-keyboard-and-screen.jpg", "/laptop-side-view.jpg"],
      fullDescription:
        "Experience ultimate performance with the ProBook Elite 15. Engineered for professionals who demand speed and reliability.",
      rating: 4.8,
      reviews: 324,
    },
    {
      id: 2,
      name: "UltraBook Pro",
      category: "laptops",
      description: "Ultra-thin and powerful computing",
      specs: ["Intel i9", "32GB RAM", "1TB SSD"],
      image: "/ultrabook-thin-laptop.jpg",
      images: ["/ultrabook-laptop-thin-design.jpg", "/ultrabook-keyboard.jpg", "/ultrabook-side-profile.jpg"],
      fullDescription:
        "The thinnest powerhouse ever created. UltraBook Pro combines portability with desktop-class performance.",
      rating: 4.9,
      reviews: 512,
    },
    {
      id: 3,
      name: "WorkStation X1",
      category: "desktops",
      description: "Professional workstation for creative work",
      specs: ["Xeon Processor", "64GB RAM", "2TB SSD"],
      image: "/professional-desktop-workstation.jpg",
      images: ["/desktop-workstation-tower.jpg", "/workstation-with-monitor.jpg", "/desktop-computer-setup.jpg"],
      fullDescription:
        "Built for creators. WorkStation X1 delivers the power needed for 4K video editing, 3D rendering, and more.",
      rating: 4.7,
      reviews: 287,
    },
    {
      id: 4,
      name: "Desktop Pro Max",
      category: "desktops",
      description: "Powerful desktop for gaming and work",
      specs: ["Intel i7", "32GB RAM", "1TB SSD"],
      image: "/gaming-desktop-computer.jpg",
      images: ["/gaming-desktop-tower.jpg", "/desktop-gaming-setup.jpg", "/desktop-computer-front.jpg"],
      fullDescription:
        "Maximum performance for maximum productivity. Desktop Pro Max is ready for anything you throw at it.",
      rating: 4.6,
      reviews: 198,
    },
    {
      id: 5,
      name: "Enterprise Router 5G",
      category: "network",
      description: "Next-gen 5G network router",
      specs: ["5G Support", "WiFi 6E", "Gigabit Ports"],
      image: "/5g-network-router.jpg",
      images: [
        "/5g-router-device.jpg",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      fullDescription:
        "Connect to the future with 5G technology. Enterprise Router 5G ensures blazing-fast connectivity for your entire network.",
      rating: 4.5,
      reviews: 156,
    },
    {
      id: 6,
      name: "Network Switch Pro",
      category: "network",
      description: "Enterprise-grade network switch",
      specs: ["48 Ports", "10Gbps", "PoE Support"],
      image: "/placeholder.svg?height=300&width=300",
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      fullDescription:
        "Enterprise-grade reliability meets cutting-edge performance. Network Switch Pro handles your most demanding workloads.",
      rating: 4.4,
      reviews: 142,
    },
    {
      id: 7,
      name: "Studio Monitor Speakers",
      category: "audio",
      description: "Professional studio audio monitors",
      specs: ["120W Power", "Frequency: 20Hz-20kHz", "XLR Input"],
      image: "/placeholder.svg?height=300&width=300",
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      fullDescription:
        "Studio-quality sound for professionals. Studio Monitor Speakers deliver accurate, detailed audio for critical listening.",
      rating: 4.8,
      reviews: 267,
    },
    {
      id: 8,
      name: "Wireless Headphones Pro",
      category: "audio",
      description: "Premium wireless audio experience",
      specs: ["40hr Battery", "Active Noise Cancel", "Bluetooth 5.3"],
      image: "/placeholder.svg?height=300&width=300",
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      fullDescription:
        "Immerse yourself in sound. Wireless Headphones Pro combines premium audio with industry-leading noise cancellation.",
      rating: 4.9,
      reviews: 891,
    },
  ]

  const filteredProducts = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory)

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
