"use client"

import { useEffect, useRef, useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

export default function ClientTestimonials() {
  const testimonials = [
    {
      quote:
        "ProKidTek transformed our IT infrastructure. Their team was professional, responsive, and delivered exactly what we needed.",
      author: "James Wilson",
      company: "TechCorp",
      logo: "🏢",
      rating: 5,
    },
    {
      quote:
        "Outstanding service and support. ProKidTek has been a reliable partner for our technology needs for over 5 years.",
      author: "Maria Garcia",
      company: "GlobalSystems",
      logo: "🌍",
      rating: 5,
    },
    {
      quote:
        "The quality of products and expertise of the team is unmatched. Highly recommended for any business looking for tech solutions.",
      author: "David Chen",
      company: "InnovateLabs",
      logo: "🔬",
      rating: 5,
    },
    {
      quote:
        "Exceptional customer service and product quality. ProKidTek goes above and beyond to ensure customer satisfaction.",
      author: "Sarah Johnson",
      company: "DigitalFirst",
      logo: "💻",
      rating: 5,
    },
    {
      quote:
        "We've been working with ProKidTek for 3 years and they consistently deliver high-quality products and excellent support.",
      author: "Ahmed Hassan",
      company: "TechVision",
      logo: "👁️",
      rating: 5,
    },
    {
      quote: "ProKidTek's commitment to excellence and innovation makes them our preferred technology partner.",
      author: "Lisa Anderson",
      company: "FutureWorks",
      logo: "🚀",
      rating: 5,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const startAutoRotate = () => {
      autoRotateRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
    }

    startAutoRotate()

    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current)
    }
  }, [testimonials.length])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    if (autoRotateRef.current) clearInterval(autoRotateRef.current)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    if (autoRotateRef.current) clearInterval(autoRotateRef.current)
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div ref={sectionRef} className="opacity-0">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Client Testimonials</h2>
            <p className="text-xl text-foreground/70">
              Hear from our satisfied clients about their experience with ProKidTek
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex gap-8 justify-center items-center min-h-96">
              {testimonials.map((testimonial, index) => {
                const distance = Math.abs(index - currentIndex)
                const isVisible = distance <= 1
                const scale = distance === 0 ? 1.1 : distance === 1 ? 0.9 : 0.7
                const opacity = distance <= 1 ? 1 : 0

                return (
                  <div
                    key={index}
                    className={`flex-shrink-0 transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0 hidden"}`}
                    style={{
                      transform: `scale(${scale})`,
                      width: "320px",
                      opacity: opacity,
                    }}
                  >
                    <div className="bg-white rounded-2xl p-8 border border-primary/10 hover:border-primary/50 transition-all duration-300 hover:shadow-xl h-full flex flex-col shadow-lg">
                      {/* Institution Logo */}
                      <div className="text-5xl mb-4 text-center">{testimonial.logo}</div>

                      {/* Stars */}
                      <div className="flex gap-1 mb-4 justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-foreground/80 mb-6 leading-relaxed italic flex-grow">"{testimonial.quote}"</p>

                      {/* Author */}
                      <div className="border-t border-primary/10 pt-4">
                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                        <p className="text-sm text-foreground/60">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 bg-primary hover:bg-primary/90 text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 bg-primary hover:bg-primary/90 text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary w-8" : "bg-primary/30 w-2 hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
