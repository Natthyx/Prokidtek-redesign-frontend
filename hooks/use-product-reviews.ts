import { useState, useEffect } from 'react'
import { Review } from '@/lib/types'
import { getProductReviews, addReview } from '@/lib/firebase-services'

export const useProductReviews = (productId: string) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const data = await getProductReviews(productId)
        setReviews(data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch reviews')
        console.error('Error fetching reviews:', err)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchReviews()
    }
  }, [productId])

  const submitReview = async (reviewData: Omit<Review, 'id' | 'createdAt'>): Promise<boolean> => {
    try {
      const reviewId = await addReview(reviewData)
      if (reviewId) {
        // Refresh reviews after adding new one
        const updatedReviews = await getProductReviews(productId)
        setReviews(updatedReviews)
        return true
      }
      return false
    } catch (err) {
      console.error('Error submitting review:', err)
      return false
    }
  }

  return { reviews, loading, error, submitReview }
}