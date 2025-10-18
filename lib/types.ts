export interface Product {
  id: string
  name: string
  category: string
  description: string
  fullDescription: string
  specs: string[]
  image: string
  images: string[]
  rating: number
  reviews: number
  price?: number
  stock: number
  status: 'Active' | 'Low Stock' | 'Out of Stock'
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface NewArrival {
  id: string
  productId: string
  dateAdded: Date
  featured: boolean
}

export interface BestSelling {
  id: string
  productId: string
  sales: number
  revenue: number
  period: 'monthly' | 'yearly' | 'all-time'
  featured: boolean
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  company: string
  logo: string
  rating: number
  featured: boolean
  createdAt: Date
}

export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  comment: string
  verified: boolean
  createdAt: Date
}

export interface ContactEmail {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
}
