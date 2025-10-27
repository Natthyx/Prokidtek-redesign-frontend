"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Trash2, Eye } from "lucide-react"
import { getContactEmails, deleteContactEmail, markEmailAsRead } from "@/lib/firebase-services"
import { ContactEmail } from "@/lib/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function EmailsAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [emails, setEmails] = useState<ContactEmail[]>([])
  const router = useRouter()

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      fetchEmails()
    }
  }, [router])

  const fetchEmails = async () => {
    try {
      setLoading(true)
      const data = await getContactEmails()
      setEmails(data)
    } catch (error) {
      console.error('Error fetching emails:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      try {
        const success = await deleteContactEmail(itemToDelete)
        if (success) {
          setEmails(emails.filter((item) => item.id !== itemToDelete))
        } else {
          alert('Failed to delete email')
        }
      } catch (error) {
        console.error('Error deleting email:', error)
        alert('Failed to delete email')
      } finally {
        setShowDeleteDialog(false)
        setItemToDelete(null)
      }
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      const success = await markEmailAsRead(id)
      if (success) {
        setEmails(emails.map((email) => (email.id === id ? { ...email, read: true } : email)))
      } else {
        alert('Failed to mark email as read')
      }
    } catch (error) {
      console.error('Error marking email as read:', error)
      alert('Failed to mark email as read')
    }
  }

  if (!isAuthenticated) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading emails...</p>
        </div>
      </div>
    )
  }

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
                    From: {email.name} ({email.email}) {email.phone ? `• Phone: ${email.phone}` : ''} • {email.createdAt instanceof Date ? email.createdAt.toLocaleDateString() : new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!email.read && (
                    <button
                      onClick={() => handleMarkAsRead(email.id)}
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(email.id)}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the contact email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}