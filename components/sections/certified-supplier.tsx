"use client"

import { useEffect, useRef } from "react"
import { Award, CheckCircle, Shield } from "lucide-react"

export default function CertifiedSupplier() {
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
    <section className="py-20 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div ref={sectionRef} className="opacity-0">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Certified & Trusted</h2>
            <p className="text-xl text-white/80">
              We are an officially certified product supplier with industry-leading quality standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Badges */}
            <div className="space-y-6">
              <div className="bg-white/10 rounded-2xl p-8 border-2 border-white/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">ISO 9001:2015 Certified</h3>
                    <p className="text-white/80">Quality Management System Certification</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-8 border-2 border-white/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Authorized Distributor</h3>
                    <p className="text-white/80">Official partner of leading tech brands</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-8 border-2 border-white/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">100% Genuine Products</h3>
                    <p className="text-white/80">Authenticity guaranteed on all items</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Quality Badge */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80">
                {/* Outer glow circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>

                {/* Main badge */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl">
                  <div className="bg-white rounded-full w-72 h-72 flex flex-col items-center justify-center text-center p-8">
                    <Award className="w-20 h-20 text-primary mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">Quality Assured</h3>
                    <p className="text-foreground/70 text-sm mb-4">Industry-Leading Standards & Certifications</p>
                    <div className="flex gap-2 justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
