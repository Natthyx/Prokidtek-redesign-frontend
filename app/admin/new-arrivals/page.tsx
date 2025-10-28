"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Edit2, Trash2, X, Loader2 } from "lucide-react"
import FileUpload from "@/components/ui/file-upload"
import { getNewArrivals, addNewArrival, deleteNewArrival, getProducts, updateNewArrival } from "@/lib/firebase-services"
import { NewArrival as FirebaseNewArrival, Product } from "@/lib/types"
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

interface NewArrivalDisplay {
  id: string
  name: string
  category: string
  dateAdded: Date | string
  description: string
  specs: string
  image: string
  productId: string // Add productId to the display interface
}

export default function NewArrivalsAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false) // Add submitting state
  const [formData, setFormData] = useState({ 
    productId: "", // Change from name to productId
    category: "", 
    description: "", 
    specs: "", 
    image: "" 
  })
  const [arrivals, setArrivals] = useState<NewArrivalDisplay[]>([])
  const [products, setProducts] = useState<Product[]>([]) // Add state for all products
  const router = useRouter()

  const categories = ["Laptops", "Desktops", "Network Devices", "Audio Equipment", "Accessories"]

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      fetchData() // Fetch all data
    }
  }, [router])

  const fetchData = async () => {
    try {
      setLoading(true)
      await fetchAllProducts() // Fetch all products first
      await fetchNewArrivals() // Then fetch arrivals
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllProducts = async () => {
    try {
      const productData = await getProducts()
      setProducts(productData)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchNewArrivals = async () => {
    try {
      // Refresh products first to ensure we have the latest data
      await fetchAllProducts()
      
      const data = await getNewArrivals()
      
      // Transform Firebase NewArrival to display format by fetching actual product data
      const displayData: NewArrivalDisplay[] = []
      for (const item of data) {
        try {
          // Find the actual product in our products list
          const product = products.find(p => p.id === item.productId)
          if (product) {
            displayData.push({
              id: item.id,
              name: product.name,
              category: product.category || "Product",
              dateAdded: item.dateAdded,
              description: product.description || "Product description",
              specs: product.specs ? product.specs.join(", ") : "",
              image: product.image || "/placeholder.svg",
              productId: item.productId
            })
          } else {
            // If product not found, still show the item with productId
            displayData.push({
              id: item.id,
              name: `Product ${item.productId} (Not Found)`,
              category: "Product",
              dateAdded: item.dateAdded,
              description: "Product description",
              specs: "",
              image: "/placeholder.svg",
              productId: item.productId
            })
          }
        } catch (error) {
          console.error(`Error fetching product ${item.productId}:`, error)
        }
      }
      setArrivals(displayData)
    } catch (error) {
      console.error('Error fetching new arrivals:', error)
    }
  }

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      try {
        const success = await deleteNewArrival(itemToDelete)
        if (success) {
          setArrivals(arrivals.filter((item: NewArrivalDisplay) => item.id !== itemToDelete))
        } else {
          alert('Failed to delete new arrival')
        }
      } catch (error) {
        console.error('Error deleting new arrival:', error)
        alert('Failed to delete new arrival')
      } finally {
        setShowDeleteDialog(false)
        setItemToDelete(null)
      }
    }
  }

  const handleEdit = (arrival: NewArrivalDisplay) => {
    setEditingId(arrival.id)
    setFormData({
      productId: arrival.productId, // Use productId instead of name
      category: arrival.category,
      description: arrival.description,
      specs: arrival.specs,
      image: arrival.image,
    })
    setShowModal(true)
  }

  const handleAddProduct = async () => {
    if (formData.productId) { // Change validation to check productId
      try {
        setIsSubmitting(true) // Set submitting state to true
        
        // Create new arrival with actual product ID
        const newArrivalData = {
          productId: formData.productId, // Use actual product ID
          featured: false,
          dateAdded: new Date()
        }

        if (editingId) {
          // Update existing new arrival
          const success = await updateNewArrival(editingId, newArrivalData)
          if (success) {
            await fetchNewArrivals() // Refresh the arrivals list
            setEditingId(null)
          } else {
            alert('Failed to update new arrival')
          }
        } else {
          // Add new new arrival
          const arrivalId = await addNewArrival(newArrivalData)
          if (arrivalId) {
            await fetchNewArrivals() // Refresh the arrivals list
          } else {
            alert('Failed to add new arrival')
          }
        }
        setFormData({ productId: "", category: "", description: "", specs: "", image: "" }) // Reset form
        setShowModal(false)
      } catch (error) {
        console.error('Error saving new arrival:', error)
        alert('Failed to save new arrival')
      } finally {
        setIsSubmitting(false) // Reset submitting state
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ productId: "", category: "", description: "", specs: "", image: "" }) // Reset form
  }

  if (!isAuthenticated) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading new arrivals...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Manage New Arrivals</h1>
          </div>
          <button
            onClick={() => {
              setEditingId(null)
              setFormData({ productId: "", category: "", description: "", specs: "", image: "" }) // Reset form
              setShowModal(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium hover:scale-105"
          >
            <Plus size={18} />
            Add New
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Product Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date Added</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {arrivals.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.category}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.dateAdded instanceof Date ? item.dateAdded.toLocaleDateString() : item.dateAdded}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors hover:scale-110"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors hover:scale-110"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4 animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {editingId ? "Edit New Arrival" : "Add New Arrival"}
              </h2>
              <button onClick={handleCloseModal} className="p-1 hover:bg-muted rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Product</label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
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
                  onClick={handleAddProduct}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingId ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    <>{editingId ? "Update" : "Add"} Arrival</>
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
              This action cannot be undone. This will permanently delete the new arrival.
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