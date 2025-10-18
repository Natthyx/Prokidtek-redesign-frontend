"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Trash2, Eye } from "lucide-react"

interface Email {
  id: string
  from: string
  subject: string
  message: string
  date: string
  read: boolean
}

export default function EmailsAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [emails, setEmails] = useState<Email[]>([
    {
      id: "1",
      from: "customer@example.com",
      subject: "Product Inquiry",
      message: "I would like to know more about your MacBook Pro 16 specifications.",
      date: "2025-01-15",
      read: false,
    },
    {
      id: "2",
      from: "business@company.com",
      subject: "Bulk Order Request",
      message: "We are interested in ordering 50 units of Dell XPS 13 laptops.",
      date: "2025-01-14",
      read: true,
    },
    {
      id: "3",
      from: "support@email.com",
      subject: "Technical Support",
      message: "I need help with my Sony headphones warranty claim.",
      date: "2025-01-13",
      read: false,
    },
  ])
  const router = useRouter()

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleDelete = (id: string) => {
    setEmails(emails.filter((item) => item.id !== id))
  }

  const handleMarkAsRead = (id: string) => {
    setEmails(emails.map((email) => (email.id === id ? { ...email, read: true } : email)))
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
          <h1 className="text-2xl font-bold text-foreground">Contact Form Emails</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {emails.map((email) => (
            <div
              key={email.id}
              className={`rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow ${
                email.read ? "bg-white" : "bg-blue-50 border-l-4 border-primary"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{email.subject}</h3>
                    {!email.read && (
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">New</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    From: {email.from} • {email.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMarkAsRead(email.id)}
                    className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(email.id)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-foreground">{email.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
