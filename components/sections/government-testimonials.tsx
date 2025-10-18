"use client"

import { useEffect, useRef } from "react"
import { Building2, Star } from "lucide-react"

const testimonials = [
  {
    company: "Ministry of Technology",
    department: "Digital Infrastructure Division",
    quote:
      "ProKidTek has been an exceptional partner in our digital transformation initiatives. Their products and support have exceeded our expectations.",
    author: "Dr. Rajesh Patel",
    position: "Director",
  },
  {
    company: "National Defense Agency",
    department: "IT Operations",
    quote:
      "The reliability and security of ProKidTek solutions have been instrumental in our critical operations. Highly recommended.",
    author: "Brigadier Sharma",
    position: "Chief Technology Officer",
  },
  {
    company: "Government Education Board",
    department: "Technology Services",
    quote:
      "ProKidTek provided us with scalable solutions that have improved our educational infrastructure significantly.",
    author: "Prof. Meera Singh",
    position: "Head of IT",
  },
]

export default function GovernmentTestimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)

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

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div ref={sectionRef} className="opacity-0">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Trusted by Government Organizations</h2>
            <p className="text-xl text-foreground/70">
              Leading government agencies rely on ProKidTek for their technology needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border border-primary/10 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-105 stagger-item-{index + 1} animate-fade-in-up"
              >
                {/* Header with icon */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg">{testimonial.company}</h3>
                    <p className="text-sm text-primary font-semibold">{testimonial.department}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/80 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>

                {/* Author */}
                <div className="border-t border-primary/10 pt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-foreground/60">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
