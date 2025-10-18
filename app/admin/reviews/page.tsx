"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Trash2, Eye } from "lucide-react"

interface Review {
  id: string
  product: string
  author: string
  rating: number
  comment: string
  date: string
}

export default function ReviewsAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      product: "MacBook Pro 16",
      author: "John Doe",
      rating: 5,
      comment: "Excellent product, very satisfied with the quality and performance.",
      date: "2025-01-15",
    },
    {
      id: "2",
      product: "Dell XPS 13",
      author: "Jane Smith",
      rating: 4,
      comment: "Great laptop, but battery life could be better.",
      date: "2025-01-14",
    },
    {
      id: "3",
      product: "Sony WH-1000XM5",
      author: "Mike Johnson",
      rating: 5,
      comment: "Best headphones I've ever owned. Noise cancellation is amazing.",
      date: "2025-01-13",
    },
  ])
  const router = useRouter()

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleDelete = (id: string) => {
    setReviews(reviews.filter((item) => item.id !== id))
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/admin/dashboard" className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Customer Reviews</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{review.product}</h3>
                  <p className="text-sm text-muted-foreground">
                    by {review.author} on {review.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
