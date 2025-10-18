"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Edit2, Trash2, X } from "lucide-react"

interface Review {
  id: number
  name: string
  company: string
  text: string
  rating: number
  logo: string
}

export default function HomeReviewsAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", company: "", text: "", rating: "5", logo: "" })
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Yonas Mekonnen",
      company: "Yonas Mobile",
      text: "Working with ProKidTek has been a great experience. Their team is professional, responsive, and always willing to go the extra mile.",
      rating: 5,
      logo: "bg-gradient-to-br from-purple-500 to-purple-700",
    },
    {
      id: 2,
      name: "John Smith",
      company: "Tech Corp",
      text: "ProKidTek provided exceptional service and quality products. Highly recommended!",
      rating: 5,
      logo: "bg-gradient-to-br from-blue-500 to-blue-700",
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

  const handleDelete = (id: number) => {
    setReviews(reviews.filter((item) => item.id !== id))
  }

  const handleEdit = (review: Review) => {
    setEditingId(review.id)
    setFormData({
      name: review.name,
      company: review.company,
      text: review.text,
      rating: review.rating.toString(),
      logo: review.logo,
    })
    setShowModal(true)
  }

  const handleSubmit = () => {
    if (formData.name && formData.company && formData.text && formData.rating && formData.logo) {
      if (editingId) {
        setReviews(
          reviews.map((item) =>
            item.id === editingId
              ? {
                  ...item,
                  name: formData.name,
                  company: formData.company,
                  text: formData.text,
                  rating: Number.parseInt(formData.rating),
                  logo: formData.logo,
                }
              : item,
          ),
        )
        setEditingId(null)
      } else {
        const newReview: Review = {
          id: Date.now(),
          name: formData.name,
          company: formData.company,
          text: formData.text,
          rating: Number.parseInt(formData.rating),
          logo: formData.logo,
        }
        setReviews([...reviews, newReview])
      }
      setFormData({ name: "", company: "", text: "", rating: "5", logo: "" })
      setShowModal(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ name: "", company: "", text: "", rating: "5", logo: "" })
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Manage Home Page Reviews</h1>
          </div>
          <button
            onClick={() => {
              setEditingId(null)
              setFormData({ name: "", company: "", text: "", rating: "5", logo: "" })
              setShowModal(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium hover:scale-105"
          >
            <Plus size={18} />
            Add Review
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all">
              <div className={`w-16 h-16 rounded-full ${item.logo} mb-4`}></div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">"{item.text}"</p>
              <div className="border-t pt-3 mb-4">
                <p className="font-semibold text-foreground">{item.name}</p>
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
                  onClick={() => handleDelete(item.id)}
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
              <h2 className="text-2xl font-bold text-foreground">{editingId ? "Edit Review" : "Add Review"}</h2>
              <button onClick={handleCloseModal} className="p-1 hover:bg-muted rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Customer Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter customer name"
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

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Review Text</label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Enter review text"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Logo Gradient</label>
                <select
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select gradient</option>
                  <option value="bg-gradient-to-br from-purple-500 to-purple-700">Purple</option>
                  <option value="bg-gradient-to-br from-blue-500 to-blue-700">Blue</option>
                  <option value="bg-gradient-to-br from-green-500 to-green-700">Green</option>
                  <option value="bg-gradient-to-br from-orange-500 to-orange-700">Orange</option>
                  <option value="bg-gradient-to-br from-pink-500 to-pink-700">Pink</option>
                  <option value="bg-gradient-to-br from-red-500 to-red-700">Red</option>
                </select>
              </div>

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
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  {editingId ? "Update" : "Add"} Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
