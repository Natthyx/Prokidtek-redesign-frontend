"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface ProductFilterContextType {
  activeCategory: string
  setActiveCategory: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
}

const ProductFilterContext = createContext<ProductFilterContextType | undefined>(undefined)

export function ProductFilterProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")

  return (
    <ProductFilterContext.Provider 
      value={{ 
        activeCategory, 
        setActiveCategory, 
        searchQuery, 
        setSearchQuery,
        sortBy,
        setSortBy
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  )
}

export function useProductFilter() {
  const context = useContext(ProductFilterContext)
  if (context === undefined) {
    throw new Error('useProductFilter must be used within a ProductFilterProvider')
  }
  return context
}