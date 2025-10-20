"use client"

import Image from "next/image"
import { useMemo } from "react"

interface ExpoItem {
  title: string
  location: string
  date: string
  image: string
}

const ROW_SPEED_MS = 35000 // slower for smooth flow

export default function InternationalEventsExpo() {
  const items: ExpoItem[] = useMemo(
    () => [
      { title: "AI Innovation Forum", location: "Kigali, Rwanda", date: "Nov 2025", image: "/expo/expo-1.jpg" },
      { title: "Digital Finance Summit", location: "Nairobi, Kenya", date: "Jan 2026", image: "/expo/expo-2.jpg" },
      { title: "Cloud & Infra Expo", location: "Accra, Ghana", date: "Mar 2026", image: "/expo/expo-3.jpg" },
      { title: "GovTech Congress", location: "Addis Ababa, Ethiopia", date: "May 2026", image: "/expo/expo-4.jpg" },
      { title: "Cybersecurity World", location: "Cairo, Egypt", date: "Jul 2026", image: "/expo/expo-5.jpg" },
      { title: "BPO & Outsourcing Week", location: "Lagos, Nigeria", date: "Sep 2026", image: "/expo/expo-6.jpg" },
    ],
    [],
  )

  const rowA = [...items, ...items]
  const rowB = [...items.slice().reverse(), ...items.slice().reverse()]

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">International Events Expo</h2>
          <p className="text-white/70 mt-3">A showcase of global technology summits and expos</p>
        </div>

        {/* Row A */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div
            className="flex gap-6 will-change-transform"
            style={{
              animation: `expo-marquee-left ${ROW_SPEED_MS}ms linear infinite`,
            }}
          >
            {rowA.map((e, idx) => (
              <ExpoCard key={`a-${idx}`} item={e} />
            ))}
          </div>
        </div>

        {/* Row B - opposite direction */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm mt-8">
          <div
            className="flex gap-6 will-change-transform"
            style={{
              animation: `expo-marquee-right ${ROW_SPEED_MS}ms linear infinite`,
            }}
          >
            {rowB.map((e, idx) => (
              <ExpoCard key={`b-${idx}`} item={e} />
            ))}
          </div>
        </div>

        {/* Keyframes */}
        <style>{`
          @keyframes expo-marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes expo-marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </div>
    </section>
  )
}

function ExpoCard({ item }: { item: ExpoItem }) {
  return (
    <div className="group relative w-72 sm:w-80 flex-shrink-0">
      <div className="relative h-48 rounded-2xl overflow-hidden border border-white/15 bg-black/30">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      <div className="px-3 pt-3">
        <h3 className="text-white font-semibold text-lg leading-tight">{item.title}</h3>
        <p className="text-white/70 text-sm">{item.location} • {item.date}</p>
      </div>
    </div>
  )
}


