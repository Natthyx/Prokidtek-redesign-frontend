"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Database, CheckCircle, AlertCircle } from "lucide-react"
import { seedAllData } from "@/lib/seed-data"

export default function SeedDataPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSeeding, setIsSeeding] = useState(false)
  const [seedingComplete, setSeedingComplete] = useState(false)
  const [seedingError, setSeedingError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleSeedData = async () => {
    setIsSeeding(true)
    setSeedingError(null)
    setSeedingComplete(false)

    try {
      await seedAllData()
      setSeedingComplete(true)
    } catch (error) {
      setSeedingError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsSeeding(false)
    }
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/admin/dashboard" className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Seed Database</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <Database className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Initialize Database</h2>
            <p className="text-muted-foreground text-lg">
              This will populate your Firebase database with sample products, testimonials, and other data.
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-foreground mb-4">What will be seeded:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                8 Sample Products (Laptops, Desktops, Network, Audio)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                4 New Arrivals
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                4 Best Selling Products
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                4 Client Testimonials
              </li>
            </ul>
          </div>

          {seedingComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-800 font-medium">Database seeded successfully!</p>
              </div>
            </div>
          )}

          {seedingError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-800 font-medium">Error: {seedingError}</p>
              </div>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={handleSeedData}
              disabled={isSeeding || seedingComplete}
              className={`px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
                isSeeding || seedingComplete
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-accent transform hover:scale-105"
              }`}
            >
              {isSeeding ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Seeding Database...
                </div>
              ) : seedingComplete ? (
                "Database Seeded"
              ) : (
                "Seed Database"
              )}
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/admin/dashboard"
              className="text-primary hover:text-accent font-medium transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
