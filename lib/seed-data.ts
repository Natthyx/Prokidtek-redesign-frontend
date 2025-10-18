import { Product, NewArrival, BestSelling, Testimonial } from './types'
import { addProduct, addNewArrival, addBestSelling, addTestimonial } from './firebase-services'

export const seedProducts = async (): Promise<void> => {
  const products: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      name: "ProBook Elite 15",
      category: "laptops",
      description: "High-performance laptop for professionals",
      fullDescription: "Experience ultimate performance with the ProBook Elite 15. Engineered for professionals who demand speed and reliability. Features a stunning 15-inch display, all-day battery life, and premium build quality.",
      specs: ["Intel i7", "16GB RAM", "512GB SSD"],
      image: "/professional-laptop-computer.jpg",
      images: ["/professional-laptop-front-view.jpg", "/laptop-keyboard-and-screen.jpg", "/laptop-side-view.jpg"],
      rating: 4.8,
      reviews: 324,
      price: 1299,
      stock: 45,
      status: "Active",
      featured: true,
    },
    {
      name: "UltraBook Pro",
      category: "laptops",
      description: "Ultra-thin and powerful computing",
      fullDescription: "The thinnest powerhouse ever created. UltraBook Pro combines portability with desktop-class performance. Perfect for professionals on the go.",
      specs: ["Intel i9", "32GB RAM", "1TB SSD"],
      image: "/ultrabook-thin-laptop.jpg",
      images: ["/ultrabook-laptop-thin-design.jpg", "/ultrabook-keyboard.jpg", "/ultrabook-side-profile.jpg"],
      rating: 4.9,
      reviews: 512,
      price: 1899,
      stock: 32,
      status: "Active",
      featured: true,
    },
    {
      name: "WorkStation X1",
      category: "desktops",
      description: "Professional workstation for creative work",
      fullDescription: "Built for creators. WorkStation X1 delivers the power needed for 4K video editing, 3D rendering, and more. Professional-grade components ensure reliability.",
      specs: ["Xeon Processor", "64GB RAM", "2TB SSD"],
      image: "/professional-desktop-workstation.jpg",
      images: ["/desktop-workstation-tower.jpg", "/workstation-with-monitor.jpg", "/desktop-computer-setup.jpg"],
      rating: 4.7,
      reviews: 287,
      price: 2499,
      stock: 18,
      status: "Active",
      featured: true,
    },
    {
      name: "Desktop Pro Max",
      category: "desktops",
      description: "Powerful desktop for gaming and work",
      fullDescription: "Maximum performance for maximum productivity. Desktop Pro Max is ready for anything you throw at it. Gaming, streaming, or professional work.",
      specs: ["Intel i7", "32GB RAM", "1TB SSD"],
      image: "/gaming-desktop-computer.jpg",
      images: ["/gaming-desktop-tower.jpg", "/desktop-gaming-setup.jpg", "/desktop-computer-front.jpg"],
      rating: 4.6,
      reviews: 198,
      price: 1599,
      stock: 25,
      status: "Active",
      featured: false,
    },
    {
      name: "Enterprise Router 5G",
      category: "network",
      description: "Next-gen 5G network router",
      fullDescription: "Connect to the future with 5G technology. Enterprise Router 5G ensures blazing-fast connectivity for your entire network.",
      specs: ["5G Support", "WiFi 6E", "Gigabit Ports"],
      image: "/5g-network-router.jpg",
      images: ["/5g-router-device.jpg", "/network-device.jpg", "/network-hub-device.jpg"],
      rating: 4.5,
      reviews: 156,
      price: 899,
      stock: 12,
      status: "Low Stock",
      featured: true,
    },
    {
      name: "Network Switch Pro",
      category: "network",
      description: "Enterprise-grade network switch",
      fullDescription: "Enterprise-grade reliability meets cutting-edge performance. Network Switch Pro handles your most demanding workloads.",
      specs: ["48 Ports", "10Gbps", "PoE Support"],
      image: "/network-switch-device.jpg",
      images: ["/network-device.jpg", "/network-hub-device.jpg", "/placeholder.svg"],
      rating: 4.4,
      reviews: 142,
      price: 1299,
      stock: 8,
      status: "Low Stock",
      featured: false,
    },
    {
      name: "Studio Monitor Speakers",
      category: "audio",
      description: "Professional studio audio monitors",
      fullDescription: "Studio-quality sound for professionals. Studio Monitor Speakers deliver accurate, detailed audio for critical listening.",
      specs: ["120W Power", "Frequency: 20Hz-20kHz", "XLR Input"],
      image: "/audio-speakers.jpg",
      images: ["/professional-audio-headphones.jpg", "/placeholder.svg", "/placeholder.svg"],
      rating: 4.8,
      reviews: 267,
      price: 599,
      stock: 67,
      status: "Active",
      featured: true,
    },
    {
      name: "Wireless Headphones Pro",
      category: "audio",
      description: "Premium wireless audio experience",
      fullDescription: "Immerse yourself in sound. Wireless Headphones Pro combines premium audio with industry-leading noise cancellation.",
      specs: ["40hr Battery", "Active Noise Cancel", "Bluetooth 5.3"],
      image: "/professional-audio-headphones.jpg",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      rating: 4.9,
      reviews: 891,
      price: 399,
      stock: 89,
      status: "Active",
      featured: true,
    },
  ]

  for (const product of products) {
    await addProduct(product)
  }
}

export const seedNewArrivals = async (): Promise<void> => {
  const newArrivals: Omit<NewArrival, 'id'>[] = [
    { productId: "1", dateAdded: new Date(), featured: true },
    { productId: "2", dateAdded: new Date(Date.now() - 86400000), featured: true },
    { productId: "3", dateAdded: new Date(Date.now() - 172800000), featured: true },
    { productId: "4", dateAdded: new Date(Date.now() - 259200000), featured: false },
  ]

  for (const arrival of newArrivals) {
    await addNewArrival(arrival)
  }
}

export const seedBestSelling = async (): Promise<void> => {
  const bestSelling: Omit<BestSelling, 'id'>[] = [
    { productId: "1", sales: 245, revenue: 612500, period: "monthly", featured: true },
    { productId: "2", sales: 189, revenue: 471750, period: "monthly", featured: true },
    { productId: "3", sales: 156, revenue: 390000, period: "monthly", featured: true },
    { productId: "8", sales: 312, revenue: 187200, period: "monthly", featured: true },
  ]

  for (const item of bestSelling) {
    await addBestSelling(item)
  }
}

export const seedTestimonials = async (): Promise<void> => {
  const testimonials: Omit<Testimonial, 'id' | 'createdAt'>[] = [
    {
      quote: "ProKidTek transformed our IT infrastructure. Their team was professional, responsive, and delivered exactly what we needed.",
      author: "James Wilson",
      company: "TechCorp",
      logo: "🏢",
      rating: 5,
      featured: true,
    },
    {
      quote: "Outstanding service and support. ProKidTek has been a reliable partner for our technology needs for over 5 years.",
      author: "Maria Garcia",
      company: "GlobalSystems",
      logo: "🌍",
      rating: 5,
      featured: true,
    },
    {
      quote: "Working with ProKidTek has been a great experience. Their team is professional, responsive, and always willing to go the extra mile.",
      author: "Yonas Mekonnen",
      company: "Yonas Mobile",
      logo: "📱",
      rating: 5,
      featured: true,
    },
    {
      quote: "Excellent quality and competitive pricing. ProKidTek is our go-to supplier for all tech needs.",
      author: "David Park",
      company: "StartUp Ventures",
      logo: "🚀",
      rating: 5,
      featured: true,
    },
  ]

  for (const testimonial of testimonials) {
    await addTestimonial(testimonial)
  }
}

export const seedAllData = async (): Promise<void> => {
  console.log('Starting data seeding...')
  
  try {
    await seedProducts()
    console.log('✅ Products seeded successfully')
    
    await seedNewArrivals()
    console.log('✅ New arrivals seeded successfully')
    
    await seedBestSelling()
    console.log('✅ Best selling seeded successfully')
    
    await seedTestimonials()
    console.log('✅ Testimonials seeded successfully')
    
    console.log('🎉 All data seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding data:', error)
  }
}
