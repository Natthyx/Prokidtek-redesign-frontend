"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Trash2, Eye } from "lucide-react"
import { getReviews, deleteReview, getProduct } from "@/lib/firebase-services"
import { Review as FirebaseReview } from "@/lib/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ReviewDisplay {
  id: string
  product: string
  productId: string
  author: string
  rating: number
  comment: string
  date: string
}

export default function ReviewsAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState<ReviewDisplay[]>([])
  const router = useRouter()

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      fetchReviews()
    }
  }, [router])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const data = await getReviews()
      
      // Transform Firebase Review to display format
      const displayData: ReviewDisplay[] = []
      for (const item of data) {
        try {
          // Fetch the actual product name
          const product = await getProduct(item.productId)
          displayData.push({
            id: item.id,
            product: product ? product.name : `Product ${item.productId}`,
            productId: item.productId,
            author: item.author,
            rating: item.rating,
            comment: item.comment,
            date: item.createdAt instanceof Date ? item.createdAt.toLocaleDateString() : new Date().toLocaleDateString(),
          })
        } catch (error) {
          console.error(`Error fetching product ${item.productId}:`, error)
          // Fallback to productId if product fetch fails
          displayData.push({
            id: item.id,
            product: `Product ${item.productId}`,
            productId: item.productId,
            author: item.author,
            rating: item.rating,
            comment: item.comment,
            date: item.createdAt instanceof Date ? item.createdAt.toLocaleDateString() : new Date().toLocaleDateString(),
          })
        }
      }
      
      setReviews(displayData)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      try {
        const success = await deleteReview(itemToDelete)
        if (success) {
          setReviews(reviews.filter((item: ReviewDisplay) => item.id !== itemToDelete))
        } else {
          alert('Failed to delete review')
        }
      } catch (error) {
        console.error('Error deleting review:', error)
        alert('Failed to delete review')
      } finally {
        setShowDeleteDialog(false)
        setItemToDelete(null)
      }
    }
  }

  if (!isAuthenticated) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading reviews...</p>
        </div>
      </div>
    )
  }

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
                    onClick={() => handleDeleteClick(review.id)}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the customer review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}