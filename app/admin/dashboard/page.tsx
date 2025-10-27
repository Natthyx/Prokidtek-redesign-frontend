"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogOut, Package, Star, Mail, TrendingUp } from "lucide-react"
import { 
  getProducts, 
  getNewArrivals, 
  getBestSelling, 
  getReviews, 
  getContactEmails, 
  getTestimonials 
} from "@/lib/firebase-services"

interface AdminStats {
  totalProducts: number
  newArrivals: number
  bestSelling: number
  totalReviews: number
  totalEmails: number
  totalTestimonials: number
  totalHomeReviews: number
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState<AdminStats>({
    totalProducts: 0,
    newArrivals: 0,
    bestSelling: 0,
    totalReviews: 0,
    totalEmails: 0,
    totalTestimonials: 0,
    totalHomeReviews: 0
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      fetchDashboardStats()
    }
  }, [router])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      
      // Fetch all data in parallel
      const [products, newArrivals, bestSelling, reviews, emails, testimonials] = await Promise.all([
        getProducts(),
        getNewArrivals(),
        getBestSelling(),
        getReviews(),
        getContactEmails(),
        getTestimonials()
      ])

      setStats({
        totalProducts: products.length,
        newArrivals: newArrivals.length,
        bestSelling: bestSelling.length,
        totalReviews: reviews.length,
        totalEmails: emails.length,
        totalTestimonials: testimonials.filter(t => t.featured).length,
        totalHomeReviews: testimonials.filter(t => !t.featured).length
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    router.push("/admin/login")
  }

  if (!isAuthenticated) {
    return null
  }

  const dashboardItems = [
    {
      title: "New Arrivals",
      count: stats.newArrivals,
      icon: Package,
      href: "/admin/new-arrivals",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Best Selling",
      count: stats.bestSelling,
      icon: TrendingUp,
      href: "/admin/best-selling",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Product Details",
      count: stats.totalProducts,
      icon: Package,
      href: "/admin/products",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Client Testimonials",
      count: stats.totalTestimonials,
      icon: Star,
      href: "/admin/testimonials",
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Home Reviews",
      count: stats.totalHomeReviews,
      icon: Star,
      href: "/admin/home-reviews",
      color: "bg-pink-50 text-pink-600",
    },
    {
      title: "Reviews",
      count: stats.totalReviews,
      icon: Star,
      href: "/admin/reviews",
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Contact Emails",
      count: stats.totalEmails,
      icon: Mail,
      href: "/admin/emails",
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Seed Database",
      count: "Setup",
      icon: Package,
      href: "/admin/seed-data",
      color: "bg-indigo-50 text-indigo-600",
    },
  ]

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/prokidtek-logo.png" alt="ProKidTek" className="h-10 w-auto" />
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 font-medium hover:scale-105"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to Admin Panel</h2>
          <p className="text-muted-foreground">Manage your ProKidTek products, reviews, and customer inquiries</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {dashboardItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 group cursor-pointer transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-3xl font-bold text-primary">{item.count}</p>
              </Link>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-8 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          <h3 className="text-xl font-bold text-foreground mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300 group transform hover:scale-105 hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`${item.color} p-2 rounded-lg`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                      Manage {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.count} items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}