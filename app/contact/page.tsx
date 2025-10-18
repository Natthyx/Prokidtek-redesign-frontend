import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ContactHero from "@/components/sections/contact-hero"
import ContactForm from "@/components/sections/contact-form"
import ContactInfo from "@/components/sections/contact-info"
import LocationMap from "@/components/sections/location-map"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ContactHero />
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <ContactInfo />
          <div className="md:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
      <LocationMap />
      <Footer />
    </main>
  )
}
