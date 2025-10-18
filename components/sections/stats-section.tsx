"use client"

import { useEffect, useState } from "react"

interface Stat {
  label: string
  value: number
  suffix: string
}

const stats: Stat[] = [
  { label: "Orders Completed", value: 400, suffix: "+" },
  { label: "Product Categories", value: 6, suffix: "" },
  { label: "Happy Clients", value: 227, suffix: "+" },
]

function CountUpNumber({ target, speed = 50 }: { target: number; speed?: number }) {
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
    }, speed)

    return () => clearInterval(timer)
  }, [target, speed])

  return <span>{count}</span>
}

export default function StatsSection() {
  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Impact</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-4 animate-count">
                <CountUpNumber target={stat.value} speed={75} />
                {stat.suffix}
              </div>
              <p className="text-xl text-white">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
