import { useState, useEffect } from 'react'
import { Testimonial } from '@/lib/types'
import { getTestimonials } from '@/lib/firebase-services'

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        const data = await getTestimonials()
        setTestimonials(data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch testimonials')
        console.error('Error fetching testimonials:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return { testimonials, loading, error }
}
