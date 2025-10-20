import Navigation from "@/components/navigation"
import HeroSection from "@/components/sections/hero-section"
import NewArrivals from "@/components/sections/new-arrivals"
import FeaturedBrands from "@/components/sections/featured-brands"
import BestSelling from "@/components/sections/best-selling"
import BulkDiscount from "@/components/sections/bulk-discount"
import ClientReviews from "@/components/sections/client-reviews"
import GenuineProducts from "@/components/sections/genuine-products"
import StatsSection from "@/components/sections/stats-section"
import OutplayCompetition from "@/components/sections/outplay-competition"
import VideoSection from "@/components/sections/video-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <NewArrivals />
      <FeaturedBrands />
      <BestSelling />
      <StatsSection />
      <BulkDiscount />
      <GenuineProducts />
      <ClientReviews />
      <OutplayCompetition />
      <VideoSection />
      <Footer />
    </main>
  )
}
