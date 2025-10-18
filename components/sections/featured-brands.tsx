"use client"

import Image from "next/image"

const brands = [
  { name: "Dell", logo: "/dell-logo.jpg" },
  { name: "HP", logo: "/hp-logo.jpg" },
  { name: "Lenovo", logo: "/lenovo-logo.jpg" },
  { name: "ASUS", logo: "/asus-logo.jpg" },
  { name: "Apple", logo: "/stylized-apple.png" },
  { name: "Sony", logo: "/sony-logo.jpg" },
  { name: "Cisco", logo: "/cisco-logo.jpg" },
  { name: "Netgear", logo: "/netgear-logo.jpg" },
]

export default function FeaturedBrands() {
  return (
    <section className="py-20 px-4 bg-secondary/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-secondary animate-fade-in-down">Featured Brands</h2>

        <div className="relative overflow-hidden">
          <div
            className="flex gap-8"
            style={{
              animation: "slide-alternate 30s linear infinite alternate",
              width: "fit-content",
            }}
          >
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 h-40 bg-white rounded-3xl flex items-center justify-center transition-all duration-500 cursor-pointer border-2 border-border hover:shadow-2xl transform hover:scale-110 hover:border-primary group shadow-lg"
              >
                <div className="text-center">
                  <div className="w-20 h-20 mb-3 flex items-center justify-center">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="font-bold text-secondary text-sm group-hover:text-primary transition-colors duration-300">
                    {brand.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
