"use client"

import { useEffect, useState } from "react"

interface Stat {
  number: string
  label: string
  target: number
}

function CountUpNumber({ target }: { target: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let current = 0
    const increment = target / 30
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 50)

    return () => clearInterval(timer)
  }, [target])

  return <span>{count}</span>
}

export default function ClientStats() {
  const stats: Stat[] = [
    { number: "500+", label: "Active Clients", target: 500 },
    { number: "50+", label: "Countries Served", target: 50 },
    { number: "10+", label: "Years in Business", target: 10 },
    { number: "99.9%", label: "Satisfaction Rate", target: 99 },
  ]

  return (
    <section className="py-16 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center stagger-item-{index + 1} animate-fade-in-up">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 animate-count">
                <CountUpNumber target={stat.target} />
                {stat.number.includes("+") ? "+" : "%"}
              </div>
              <p className="text-lg text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
