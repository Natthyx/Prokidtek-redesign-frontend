import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProductsHero from "@/components/sections/products-hero"
import ProductCategories from "@/components/sections/product-categories"
import ProductGrid from "@/components/sections/product-grid"

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProductsHero />
      <div className="flex">
        {/* Sticky left sidebar */}
        <div className="w-64 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto bg-muted/30 border-r border-border">
          <ProductCategories />
        </div>
        {/* Main content area */}
        <div className="flex-1">
          <ProductGrid />
        </div>
      </div>
      <Footer />
    </main>
  )
}
