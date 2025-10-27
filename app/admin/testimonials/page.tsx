"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Edit2, Trash2, X, Loader2 } from "lucide-react"
import FileUpload from "@/components/ui/file-upload"
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/firebase-services"
import { Testimonial as FirebaseTestimonial } from "@/lib/types"
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

export default function TestimonialsAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false) // Add submitting state
  const [formData, setFormData] = useState({ quote: "", author: "", company: "", logo: "", rating: "5" })
  const [testimonials, setTestimonials] = useState<FirebaseTestimonial[]>([])
  const router = useRouter()

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      fetchTestimonials()
    }
  }, [router])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const data = await getTestimonials()
      setTestimonials(data)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
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
        const success = await deleteTestimonial(itemToDelete)
        if (success) {
          setTestimonials(testimonials.filter((item: FirebaseTestimonial) => item.id !== itemToDelete))
        } else {
          alert('Failed to delete testimonial')
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error)
        alert('Failed to delete testimonial')
      } finally {
        setShowDeleteDialog(false)
        setItemToDelete(null)
      }
    }
  }

  const handleEdit = (testimonial: FirebaseTestimonial) => {
    setEditingId(testimonial.id)
    setFormData({
      quote: testimonial.quote,
      author: testimonial.author,
      company: testimonial.company,
      logo: testimonial.logo,
      rating: testimonial.rating.toString(),
    })
    setShowModal(true)
  }

  const handleSubmit = async () => {
    if (formData.quote && formData.author && formData.company && formData.logo && formData.rating) {
      try {
        setIsSubmitting(true) // Set submitting state to true
        
        const testimonialData = {
          quote: formData.quote,
          author: formData.author,
          company: formData.company,
          logo: formData.logo,
          rating: Number.parseInt(formData.rating),
          featured: false,
        }

        if (editingId) {
          const success = await updateTestimonial(editingId, testimonialData)
          if (success) {
            await fetchTestimonials() // Refresh the testimonials list
            setEditingId(null)
          } else {
            alert('Failed to update testimonial')
          }
        } else {
          const testimonialId = await addTestimonial(testimonialData)
          if (testimonialId) {
            await fetchTestimonials() // Refresh the testimonials list
          } else {
            alert('Failed to add testimonial')
          }
        }
        setFormData({ quote: "", author: "", company: "", logo: "", rating: "5" })
        setShowModal(false)
      } catch (error) {
        console.error('Error saving testimonial:', error)
        alert('Failed to save testimonial')
      } finally {
        setIsSubmitting(false) // Reset submitting state
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ quote: "", author: "", company: "", logo: "", rating: "5" })
  }

  if (!isAuthenticated) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading testimonials...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Manage Client Testimonials</h1>
          </div>
          <button
            onClick={() => {
              setEditingId(null)
              setFormData({ quote: "", author: "", company: "", logo: "", rating: "5" })
              setShowModal(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium hover:scale-105"
          >
            <Plus size={18} />
            Add Testimonial
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all">
              {/* <div className="text-4xl mb-3">{item.logo}</div> */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3 italic">"{item.quote}"</p>
              <div className="border-t pt-3 mb-4">
                <p className="font-semibold text-foreground">{item.author}</p>
                <p className="text-sm text-muted-foreground">{item.company}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                >
                  <Edit2 size={18} className="mx-auto" />
                </button>
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="flex-1 p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 size={18} className="mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4 animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button onClick={handleCloseModal} className="p-1 hover:bg-muted rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Quote</label>
                <textarea
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Enter testimonial quote"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Author Name</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter company name"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company Logo</label>
                <FileUpload
                  value={formData.logo}
                  onChange={(value) => setFormData({ ...formData, logo: value })}
                  placeholder="Choose a company logo"
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingId ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    <>{editingId ? "Update" : "Add"} Testimonial</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the testimonial.
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