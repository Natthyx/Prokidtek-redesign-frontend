"use client"

import { useEffect, useState } from "react"

export default function ClientCaseStudies() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const caseStudies = [
    {
      company: "TechCorp",
      challenge: "Needed enterprise-grade network infrastructure",
      solution: "Implemented complete network overhaul with 5G routers",
      result: "40% improvement in network speed and reliability",
      color: "from-blue-500 to-blue-600",
    },
    {
      company: "GlobalSystems",
      challenge: "Required high-performance workstations",
      solution: "Deployed WorkStation X1 systems across departments",
      result: "3x faster project completion times",
      color: "from-green-500 to-green-600",
    },
    {
      company: "InnovateLabs",
      challenge: "Needed portable yet powerful computing",
      solution: "Provided UltraBook Pro laptops for mobile teams",
      result: "Increased team productivity by 50%",
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Success Stories</h2>
          <p className="text-xl text-foreground/70">How we've helped our clients achieve their goals</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${study.color} rounded-2xl p-8 text-white transform transition-all duration-500 hover:shadow-2xl hover:scale-105 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${idx * 100}ms`,
              }}
            >
              <h3 className="text-2xl font-bold mb-6">{study.company}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold opacity-90 mb-1">Challenge</p>
                  <p className="text-sm opacity-80">{study.challenge}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold opacity-90 mb-1">Solution</p>
                  <p className="text-sm opacity-80">{study.solution}</p>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <p className="text-sm font-semibold opacity-90 mb-1">Result</p>
                  <p className="text-lg font-bold">{study.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
