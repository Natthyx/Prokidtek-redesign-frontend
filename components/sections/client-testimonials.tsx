"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Star } from "lucide-react"

export default function ClientTestimonials() {
  const testimonials = [
    {
      quote:
        "ProKidTek transformed our IT infrastructure. Their team was professional, responsive, and delivered exactly what we needed.",
      author: "James Wilson",
      company: "TechCorp",
      photo: "/professional-man-ceo.jpg",
      rating: 5,
    },
    {
      quote:
        "Outstanding service and support. ProKidTek has been a reliable partner for our technology needs for over 5 years.",
      author: "Maria Garcia",
      company: "GlobalSystems",
      photo: "/professional-woman-tech.jpg",
      rating: 5,
    },
    {
      quote:
        "The quality of products and expertise of the team is unmatched. Highly recommended for any business looking for tech solutions.",
      author: "David Chen",
      company: "InnovateLabs",
      photo: "/professional-man-sales.jpg",
      rating: 5,
    },
    {
      quote:
        "Exceptional customer service and product quality. ProKidTek goes above and beyond to ensure customer satisfaction.",
      author: "Sarah Johnson",
      company: "DigitalFirst",
      photo: "/professional-woman-service.jpg",
      rating: 5,
    },
    {
      quote:
        "We've been working with ProKidTek for 3 years and they consistently deliver high-quality products and excellent support.",
      author: "Ahmed Hassan",
      company: "TechVision",
      photo: "/professional-man-ceo.jpg",
      rating: 5,
    },
    {
      quote: "ProKidTek's commitment to excellence and innovation makes them our preferred technology partner.",
      author: "Lisa Anderson",
      company: "FutureWorks",
      photo: "/professional-woman-tech.jpg",
      rating: 5,
    },
  ]
  // Build marquee rows similar to InternationalEventsExpo
  const sectionRef = useRef<HTMLDivElement>(null)
  const speedMs = 35000
  const rowA = useMemo(() => [...testimonials, ...testimonials], [testimonials])
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

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
          
          {/* Row A */}
          <div className="relative overflow-hidden rounded-3xl">
            <div
              className="flex gap-6 will-change-transform"
              style={{ animation: isInView ? `testi-marquee-left ${speedMs}ms linear infinite` : "none" }}
            >
              {rowA.map((t, idx) => (
                <TestimonialCard key={`a-${idx}`} t={t} />
              ))}
            </div>
          </div>

          <style>{`
            @keyframes testi-marquee-left { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
            @keyframes testi-pulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.06) } }
          `}</style>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ t }: { t: { photo: string; author: string; company: string; rating: number; quote: string } }) {
  return (
    <div className="group relative w-[28rem] sm:w-[34rem] flex-shrink-0">
      <div className="bg-white rounded-3xl border border-primary/10 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl animate-[testi-pulse_4000ms_ease-in-out_infinite] group-hover:scale-105 overflow-hidden">
        <div className="flex">
          {/* Left: Image (half width) */}
          <div className="w-1/2 h-56 sm:h-64 md:h-72">
            <img src={t.photo || '/placeholder-user.jpg'} alt={t.author} className="w-full h-full object-cover" />
          </div>
          {/* Right: Content */}
          <div className="w-1/2 p-6 flex flex-col">
            <div className="flex gap-1 mb-3">
              {[...Array(t.rating)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="w-5 h-5 fill-primary text-primary"><path d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.79 1.402 8.168L12 18.897l-7.339 3.872 1.402-8.168L.125 9.211l8.207-1.193z"/></svg>
              ))}
            </div>
            {/* Short description to increase card height */}
            <p className="text-foreground/80 text-sm sm:text-base leading-relaxed mb-4 line-clamp-5">
              "{t.quote}"
            </p>
            <div className="mt-auto border-t border-primary/10 pt-3">
              <p className="font-semibold text-foreground">{t.author}</p>
              <p className="text-sm text-foreground/60">{t.company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
