"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function ProductCategories() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")

  const categories = [
    { id: "all", label: "All Products" },
    { id: "laptops", label: "Laptops" },
    { id: "desktops", label: "Desktops" },
    { id: "network", label: "Network Devices" },
    { id: "audio", label: "Audio Equipment" },
    { id: "accessories", label: "Accessories" },
  ]

  const sortOptions = [
    { id: "featured", label: "Featured" },
    { id: "newest", label: "Newest" },
    { id: "rating", label: "Highest Rated" },
    { id: "name", label: "Name (A-Z)" },
  ]

  return (
    <div className="p-6 space-y-6 animate-fade-in-down">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-border focus:border-primary focus:outline-none transition-colors"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-foreground mb-3">Categories</h3>
        {categories.map((category, idx) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`w-full text-left px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-white text-foreground border border-border hover:border-primary hover:bg-muted"
            }`}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-foreground mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border-2 border-border focus:border-primary focus:outline-none transition-colors font-medium bg-white"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
