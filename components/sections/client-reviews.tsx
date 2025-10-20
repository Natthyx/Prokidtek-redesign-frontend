"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTestimonials } from "@/hooks/use-testimonials"

export default function ClientReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { testimonials, loading, error } = useTestimonials()

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  if (loading) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error || testimonials.length === 0) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 text-center">
            <p className="text-red-500">Error loading testimonials</p>
          </div>
        </div>
      </section>
    )
  }

  const review = testimonials[currentIndex]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Why customers <span className="text-primary">love</span>
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">working with us</h2>

        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-border p-8 md:p-16 text-center">
          <div className="flex gap-1 mb-8 justify-center">
            {[...Array(review.rating)].map((_, i) => (
              <span key={i} className="text-primary text-3xl">
                ★
              </span>
            ))}
          </div>

          <p className="text-lg md:text-xl text-foreground mb-12 leading-relaxed max-w-3xl mx-auto">"{review.quote}"</p>

          <div className="flex flex-col items-center gap-4 mb-12">
            <img
              src={(review as any).photo || "/placeholder-user.jpg"}
              alt={review.author}
              className="w-28 h-28 rounded-full object-cover shadow-xl border-2 border-primary"
            />
            <div>
              <p className="font-bold text-xl text-primary">{review.author}</p>
              <p className="text-foreground/70">{review.company}</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-6">
            <button
              onClick={goToPrevious}
              className="bg-white border-2 border-primary text-primary p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label="Previous review"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-primary w-8" : "bg-border w-3"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="bg-white border-2 border-primary text-primary p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label="Next review"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
