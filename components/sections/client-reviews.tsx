"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Yonas Mekonnen",
    company: "Yonas Mobile",
    text: "Working with ProKidTek has been a great experience. Their team is professional, responsive, and always willing to go the extra mile. The products they supplied for us were delivered on time, with excellent quality and functionality. We're proud to partner with them for our technology solutions.",
    rating: 5,
    logo: "bg-gradient-to-br from-purple-500 to-purple-700",
  },
  {
    id: 2,
    name: "John Smith",
    company: "Tech Corp",
    text: "ProKidTek provided exceptional service and quality products. Highly recommended!",
    rating: 5,
    logo: "bg-gradient-to-br from-blue-500 to-blue-700",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    company: "Digital Solutions",
    text: "Great selection and competitive pricing. Our team loves the new equipment.",
    rating: 5,
    logo: "bg-gradient-to-br from-green-500 to-green-700",
  },
  {
    id: 4,
    name: "Mike Chen",
    company: "Innovation Labs",
    text: "Professional support and reliable products. Best tech supplier we have worked with.",
    rating: 5,
    logo: "bg-gradient-to-br from-orange-500 to-orange-700",
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    company: "Future Minds Academy",
    text: "Outstanding customer service and fast shipping. The educational kits are perfect for our students.",
    rating: 5,
    logo: "bg-gradient-to-br from-pink-500 to-pink-700",
  },
  {
    id: 6,
    name: "David Park",
    company: "StartUp Ventures",
    text: "Excellent quality and competitive pricing. ProKidTek is our go-to supplier for all tech needs.",
    rating: 5,
    logo: "bg-gradient-to-br from-red-500 to-red-700",
  },
  {
    id: 7,
    name: "Lisa Thompson",
    company: "Creative Studios",
    text: "Fantastic products and responsive support team. They really understand our business needs.",
    rating: 5,
    logo: "bg-gradient-to-br from-cyan-500 to-cyan-700",
  },
]

export default function ClientReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
  }

  const review = reviews[currentIndex]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Why customers <span className="text-primary">love</span>
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">working with us</h2>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 text-center">
          <div className="flex gap-1 mb-8 justify-center">
            {[...Array(review.rating)].map((_, i) => (
              <span key={i} className="text-primary text-3xl">
                ★
              </span>
            ))}
          </div>

          <p className="text-lg md:text-xl text-foreground mb-12 leading-relaxed max-w-3xl mx-auto">"{review.text}"</p>

          <div className="flex flex-col items-center gap-4 mb-12">
            <div className={`w-24 h-24 rounded-full ${review.logo} shadow-lg`}></div>
            <div>
              <p className="font-bold text-xl text-primary">{review.name}</p>
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
              {reviews.map((_, index) => (
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
