"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProductsHero from "@/components/sections/products-hero"
import ProductCategories from "@/components/sections/product-categories"
import ProductGrid from "@/components/sections/product-grid"
import { ProductFilterProvider } from "@/contexts/product-filter-context"
import { useState } from "react"
import { X, Filter } from "lucide-react"

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProductsHero />
      <ProductFilterProvider>
        <div className="flex flex-col md:flex-row">
          {/* Mobile filter button */}
          <div className="md:hidden p-4 bg-white border-b border-border">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Mobile filter overlay */}
          {showFilters && (
            <div className="md:hidden fixed inset-0 bg-black/50 z-50">
              <div className="absolute right-0 top-0 h-full w-4/5 bg-white overflow-y-auto">
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-muted rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <ProductCategories />
                </div>
              </div>
            </div>
          )}

          {/* Desktop sidebar */}
          <div className="hidden md:block w-64 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto bg-muted/30 border-r border-border">
            <ProductCategories />
          </div>

          {/* Main content area */}
          <div className="flex-1">
            <ProductGrid />
          </div>
        </div>
      </ProductFilterProvider>
      <Footer />
    </main>
  )
}