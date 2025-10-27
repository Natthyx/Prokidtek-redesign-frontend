"use client"

import { useState, useRef } from "react"

interface ImageZoomProps {
  src: string
  alt: string
  className?: string
}

export default function ImageZoom({ src, alt, className = "" }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%")
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    // Constrain position to 0-100%
    const constrainedX = Math.max(0, Math.min(100, x))
    const constrainedY = Math.max(0, Math.min(100, y))
    
    setPosition({ x: constrainedX, y: constrainedY })
    setBackgroundPosition(`${constrainedX}% ${constrainedY}%`)
  }

  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className={`relative overflow-hidden rounded-3xl ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
        />
        
        {/* Zoom lens indicator */}
        {isZoomed && (
          <div
            className="absolute w-32 h-32 border-2 border-white shadow-lg rounded pointer-events-none"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
              background: "rgba(255, 255, 255, 0.3)",
            }}
          />
        )}
      </div>
      
      {/* Zoom result panel - positioned to the right of the image */}
      {isZoomed && (
        <div
          className="absolute top-0 left-full ml-8 w-96 h-96 border border-gray-300 rounded-lg overflow-hidden shadow-xl z-50 bg-white"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "200%",
              backgroundPosition,
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      )}
    </div>
  )
}