"use client"

import { useEffect, useRef } from "react"

export default function FounderLetter() {
  const letterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      },
      { threshold: 0.1 },
    )

    if (letterRef.current) {
      observer.observe(letterRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto">
        <div
          ref={letterRef}
          className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 border border-primary/10 opacity-0 animate-fade-in-up"
        >
          {/* Letter Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">P</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">ProKidTek</h2>
                <p className="text-primary font-semibold">A Message from Our Founder</p>
              </div>
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full"></div>
          </div>

          {/* Letter Content */}
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p className="text-lg">
              <span className="font-semibold text-foreground">Dear Valued Customers,</span>
            </p>

            <p>
              When I founded ProKidTek over a decade ago, I had a simple vision: to bridge the gap between cutting-edge
              technology and accessibility. I wanted to create a company where quality wasn't just a promise, but a
              guarantee.
            </p>

            <p>
              Today, as I look at what we've built together with our incredible team and loyal customers, I'm filled
              with pride. We've grown from a small startup to a trusted partner for hundreds of businesses and thousands
              of individuals. But our mission remains unchanged: to deliver excellence in every interaction.
            </p>

            <p>
              Every product we offer, every service we provide, and every customer we serve represents our commitment to
              innovation and integrity. We don't just sell technology; we empower people to achieve their goals and
              transform their businesses.
            </p>

            <p>
              Thank you for being part of our journey. Your trust inspires us to continuously improve and innovate.
              Together, we're not just building a business—we're building a community of tech enthusiasts and
              professionals who believe in the power of quality technology.
            </p>

            <p className="pt-4">
              <span className="font-semibold text-foreground">With gratitude and commitment,</span>
            </p>

            <div className="pt-6">
              <div className="text-2xl font-bold text-primary mb-2">Rajesh Kumar</div>
              <p className="text-foreground/60">Founder & CEO, ProKidTek</p>
              <p className="text-sm text-foreground/50 mt-2">Est. 2014</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
