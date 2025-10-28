"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Star } from "lucide-react"
import { getTestimonials } from "@/lib/firebase-services"
import { Testimonial as FirebaseTestimonial } from "@/lib/types"

interface DisplayTestimonial {
  quote: string
  author: string
  company: string
  photo: string
  rating: number
}

export default function ClientTestimonials() {
  const [testimonials, setTestimonials] = useState<DisplayTestimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const speedMs = 35000
  const [isInView, setIsInView] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        const firebaseTestimonials = await getTestimonials()
        
        // Transform to display format
        const displayTestimonials = firebaseTestimonials.map(item => ({
          quote: item.quote,
          author: item.author,
          company: item.company,
          photo: item.logo || "/placeholder-user.jpg", // Use logo from testimonial or default placeholder
          rating: item.rating
        }))
        
        setTestimonials(displayTestimonials)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  // Auto-rotate testimonials for carousel view
  useEffect(() => {
    const startAutoRotate = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000) // Rotate every 5 seconds
    }

    if (testimonials.length > 0) {
      startAutoRotate()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [testimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    
    // Reset the auto-rotate timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const rowA = useMemo(() => [...testimonials, ...testimonials], [testimonials])

  if (loading) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Client Testimonials</h2>
            <p className="text-xl text-foreground/70">
              Hear from our satisfied clients about their experience with ProKidTek
            </p>
          </div>
          <div className="h-64 bg-muted rounded-3xl animate-pulse"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div ref={sectionRef} className="opacity-0 animate-fade-in-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Client Testimonials</h2>
            <p className="text-xl text-foreground/70">
              Hear from our satisfied clients about their experience with ProKidTek
            </p>
          </div>
          
          {/* Carousel View for Mobile */}
          <div className="md:hidden relative overflow-hidden rounded-3xl mb-8">
            <div className="relative h-80">
              {testimonials.map((t, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    idx === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Continuous Marquee for Desktop with Auto Slide Animation */}
          <div 
            className="hidden md:block relative overflow-hidden rounded-3xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="flex gap-6"
              style={{ 
                animation: "slide-alternate 30s linear infinite alternate",
                width: "fit-content",
              }}
            >
              {testimonials.map((t, idx) => (
                <TestimonialCard key={idx} t={t} />
              ))}
            </div>
            
          </div>

          <style>{`
            @keyframes slide-alternate { 
              0% { transform: translateX(0); } 
              100% { transform: translateX(-50%); } 
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ t }: { t: DisplayTestimonial }) {
  return (
    <div className="group relative w-[23rem] sm:w-[20rem] md:w-[30rem] lg:w-[34rem] flex-shrink-0 mb-8">
      <div className="bg-white rounded-3xl border border-primary/10 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Left: Image */}
          <div className="sm:w-1/2 h-35 sm:h-56 md:h-64 lg:h-72">
            <img 
              src={t.photo || '/placeholder-user.jpg'} 
              alt={t.author} 
              className="w-full h-full object-cover" 
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-user.jpg';
              }}
            />
          </div>
          {/* Right: Content */}
          <div className="sm:w-1/2 p-4 sm:p-7 flex flex-col">
            <div className="flex gap-1 mb-2 sm:mb-3">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground/80 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 flex-grow">
              "{t.quote}"
            </p>
            <div className="mt-auto border-t border-primary/10 pt-2 sm:pt-3">
              <p className="font-semibold text-foreground text-sm sm:text-base">{t.author}</p>
              <p className="text-xs sm:text-sm text-foreground/60">{t.company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}