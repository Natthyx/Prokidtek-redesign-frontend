import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AboutHero from "@/components/sections/about-hero"
import AboutMission from "@/components/sections/about-mission"
import AboutTeam from "@/components/sections/about-team"
import AboutValues from "@/components/sections/about-values"
import CertifiedSupplier from "@/components/sections/certified-supplier"
import ProductsWeOffer from "@/components/sections/products-we-offer"
import GovernmentTestimonials from "@/components/sections/government-testimonials"
import CEOLetterSection from "@/components/sections/ceo-letter-section"
import Certificates from "@/components/sections/certificates"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="bg-white">
        <CEOLetterSection />
      </div>
      <div className="bg-primary/5">
        <CertifiedSupplier />
      </div>
      <div className="bg-white">
        <Certificates />
      </div>
      <div className="bg-primary/5">
        <ProductsWeOffer />
      </div>
      {/* <div className="bg-white">
        <GovernmentTestimonials />
      </div> */}
      <div className="bg-primary/5">
        <AboutHero />
      </div>
      <div className="bg-white">
        <AboutMission />
      </div>
      <div className="bg-primary/5">
        <AboutValues />
      </div>
      {/* <div className="bg-white">
        <AboutTeam />
      </div> */}
      <Footer />
    </main>
  )
}
