"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function CEOLetterSection() {
  const [isLetterOpen, setIsLetterOpen] = useState(false)

  return (
    <>
      {/* CEO Letter Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-16">About Us</h1>

          <div className="relative">
            <div className="grid md:grid-cols-2 gap-0 items-stretch">
              {/* Left Side - Orange Background with Text */}
              <div className="bg-primary rounded-3xl p-12 text-white space-y-6 h-full flex flex-col justify-between md:rounded-r-none shadow-2xl">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">A letter from our CEO</h2>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Read about our team's commitment to provide everyone on our platform with the technology that can
                    help them move ahead.
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => setIsLetterOpen(true)}
                    className="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Read Kidist's letter
                  </button>
                </div>
              </div>

              {/* Right Side - CEO Image with Overlap and Sticky Effect */}
              <div className="relative md:-ml-12 md:z-10">
                <div className="rounded-3xl overflow-hidden shadow-2xl md:sticky md:top-24 md:h-fit">
                  <img
                    src="/professional-ceo-woman-office.jpg"
                    alt="Kidist Tekeste, CEO"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* CEO Name and Title - Positioned below */}
            <div className="mt-6 text-right pr-4">
              <h3 className="text-2xl font-bold text-foreground">Kidist Tekeste</h3>
              <p className="text-primary font-semibold text-lg">President</p>
            </div>
          </div>
        </div>
      </section>

      {/* Letter Modal */}
      {isLetterOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-primary/10 p-6 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-2xl font-bold text-primary">Letter from Our CEO</h2>
              <button
                onClick={() => setIsLetterOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6 text-foreground/80 leading-relaxed">
              {/* Letter Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">P</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">ProKidTek</h3>
                    <p className="text-primary font-semibold">A Message from Our Founder</p>
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              </div>

              {/* Letter Content */}
              <div className="space-y-6">
                <p className="text-lg">
                  <span className="font-semibold text-foreground">Dear Valued Customers,</span>
                </p>

                <p>
                  When I founded ProKidTek over a decade ago, I had a simple vision: to bridge the gap between
                  cutting-edge technology and accessibility. I wanted to create a company where quality wasn't just a
                  promise, but a guarantee.
                </p>

                <p>
                  Today, as I look at what we've built together with our incredible team and loyal customers, I'm filled
                  with pride. We've grown from a small startup to a trusted partner for hundreds of businesses and
                  thousands of individuals. But our mission remains unchanged: to deliver excellence in every
                  interaction.
                </p>

                <p>
                  Every product we offer, every service we provide, and every customer we serve represents our
                  commitment to innovation and integrity. We don't just sell technology; we empower people to achieve
                  their goals and transform their businesses.
                </p>

                <p>
                  Thank you for being part of our journey. Your trust inspires us to continuously improve and innovate.
                  Together, we're not just building a business—we're building a community of tech enthusiasts and
                  professionals who believe in the power of quality technology.
                </p>

                <p className="pt-4">
                  <span className="font-semibold text-foreground">With gratitude and commitment,</span>
                </p>

                <div className="pt-6 border-t border-primary/10">
                  <div className="text-2xl font-bold text-primary mb-2">Kidist Tekeste</div>
                  <p className="text-foreground/60">Founder & CEO, ProKidTek</p>
                  <p className="text-sm text-foreground/50 mt-2">Est. 2014</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
