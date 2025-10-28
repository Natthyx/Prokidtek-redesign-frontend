"use client"

import { useEffect, useState } from "react"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/hero-welcome.png)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </div>

      <div className="relative h-full flex items-center justify-start text-left px-4 md:px-10">
        <div className="max-w-2xl">
          <h1
            className={`text-2xl md:text-6xl font-bold text-white mb-4 text-balance transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Premium Tech Solutions
          </h1>
          <p
            className={`text-lg md:text-xl text-gray-100 mb-8 text-balance transition-all duration-1000 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Discover cutting-edge laptops, desktops, network devices, and audio equipment. Your trusted partner for all
            technology needs.
          </p>
          <button
            className={`bg-primary hover:bg-accent text-primary-foreground px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover-lift ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{
              transitionDelay: isLoaded ? "0.4s" : "0s",
            }}
          >
            Shop Now
          </button>
        </div>
      </div>

      <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-10 left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
    </section>
  )
}
