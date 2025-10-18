import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h2>
          <p className="text-foreground/70 mb-8">
            Sorry, the page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-accent transition-colors font-bold"
          >
            Go Home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
