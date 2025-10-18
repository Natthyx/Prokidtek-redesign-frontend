import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ClientsHero from "@/components/sections/clients-hero"
import ClientLogos from "@/components/sections/client-logos"
import ClientTestimonials from "@/components/sections/client-testimonials"
import ClientStats from "@/components/sections/client-stats"
import ClientCaseStudies from "@/components/sections/client-case-studies"
import ClientBenefits from "@/components/sections/client-benefits"

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ClientsHero />
      <div className="bg-white">
        <ClientStats />
      </div>
      <div className="bg-primary/5">
        <ClientLogos />
      </div>
      <div className="bg-white">
        <ClientTestimonials />
      </div>
      {/* Visual Separation */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"></div>
        </div>
      </div>
      <div className="bg-primary/5">
        <ClientBenefits />
      </div>
      <div className="bg-white">
        <ClientCaseStudies />
      </div>
      <Footer />
    </main>
  )
}
