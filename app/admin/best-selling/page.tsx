"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Edit2, Trash2, X, Loader2 } from "lucide-react"
import FileUpload from "@/components/ui/file-upload"
import { getBestSelling, addBestSelling, deleteBestSelling, updateBestSelling, getProducts } from "@/lib/firebase-services"
import { BestSelling as FirebaseBestSelling, Product } from "@/lib/types"
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

interface BestSellingDisplay {
  id: string
  name: string
  category: string
  sales: number
  revenue: string
  description: string
  specs: string
  image: string
  productId: string
  period: 'monthly' | 'yearly' | 'all-time' // Add period to the display interface
}

export default function BestSellingAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false) // Add submitting state
  const [formData, setFormData] = useState({
    productId: "",
    sales: "",
    revenue: "",
    period: "monthly" as "monthly" | "yearly" | "all-time",
  })
  const [products, setProducts] = useState<BestSellingDisplay[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([]) // Add state for all products
  const router = useRouter()

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
      await fetchBestSelling() // Then fetch best selling products
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllProducts = async () => {
    try {
      const productData = await getProducts()
      setAllProducts(productData)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchBestSelling = async () => {
    try {
      setLoading(true)
      const data = await getBestSelling()
      
      // Transform to display format by fetching actual product data
      const displayProducts: BestSellingDisplay[] = []
      for (const item of data) {
        try {
          // Find the actual product in our products list
          const product = allProducts.find(p => p.id === item.productId)
          if (product) {
            displayProducts.push({
              id: item.id,
              name: product.name,
              category: product.category || "Product",
              sales: item.sales,
              revenue: `$${item.revenue.toLocaleString()}`,
              description: product.description || "Product description",
              specs: product.specs ? product.specs.join(", ") : "Product specs",
              image: product.image || "/placeholder.svg",
              productId: item.productId,
              period: item.period
            })
          } else {
            // If product not found, still show the item with productId
            displayProducts.push({
              id: item.id,
              name: `Product ${item.productId} (Not Found)`,
              category: "Product",
              sales: item.sales,
              revenue: `$${item.revenue.toLocaleString()}`,
              description: "Product description",
              specs: "Product specs",
              image: "/placeholder.svg",
              productId: item.productId,
              period: item.period
            })
          }
        } catch (error) {
          console.error(`Error fetching product ${item.productId}:`, error)
        }
      }
      setProducts(displayProducts)
    } catch (error) {
      console.error('Error fetching best selling products:', error)
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
        const success = await deleteBestSelling(itemToDelete)
        if (success) {
          setProducts(products.filter((item) => item.id !== itemToDelete))
        } else {
          alert('Failed to delete best selling product')
        }
      } catch (error) {
        console.error('Error deleting best selling product:', error)
        alert('Failed to delete best selling product')
      } finally {
        setShowDeleteDialog(false)
        setItemToDelete(null)
      }
    }
  }

  const handleEdit = (product: BestSellingDisplay) => {
    setEditingId(product.id)
    setFormData({
      productId: product.productId || "",
      sales: product.sales.toString(),
      revenue: product.revenue.replace('$', '').replace(/,/g, ''),
      period: product.period || "monthly"
    })
    setShowModal(true)
  }

  const handleAddProduct = async () => {
    if (formData.productId && formData.sales && formData.revenue) {
      try {
        setIsSubmitting(true) // Set submitting state to true
        
        const bestSellingData = {
          productId: formData.productId, // Use actual product ID
          sales: Number.parseInt(formData.sales),
          revenue: Number.parseInt(formData.revenue),
          period: formData.period,
          featured: false // Add the missing featured property
        }

        if (editingId) {
          // Update existing best selling product
          const success = await updateBestSelling(editingId, bestSellingData)
          if (success) {
            await fetchBestSelling() // Refresh the products list
            setEditingId(null)
          } else {
            alert('Failed to update best selling product')
          }
        } else {
          // Add new best selling product
          const productId = await addBestSelling(bestSellingData)
          if (productId) {
            await fetchBestSelling() // Refresh the products list
          } else {
            alert('Failed to add best selling product')
          }
        }
        setFormData({ productId: "", sales: "", revenue: "", period: "monthly" })
        setShowModal(false)
      } catch (error) {
        console.error('Error saving best selling product:', error)
        alert('Failed to save best selling product')
      } finally {
        setIsSubmitting(false) // Reset submitting state
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ productId: "", sales: "", revenue: "", period: "monthly" })
  }

  if (!isAuthenticated) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading best selling products...</p>
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
            <h1 className="text-2xl font-bold text-foreground">Best Selling Products</h1>
          </div>
          <button
            onClick={() => {
              setEditingId(null)
              setFormData({ productId: "", sales: "", revenue: "", period: "monthly" })
              setShowModal(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium hover:scale-105"
          >
            <Plus size={18} />
            Add Product
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Sales</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Revenue</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.sales}</td>
                  <td className="px-6 py-4 text-primary font-semibold">{item.revenue}</td>
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
                {editingId ? "Edit Best Selling Product" : "Add Best Selling Product"}
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
                  {allProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Sales Count</label>
                <input
                  type="number"
                  value={formData.sales}
                  onChange={(e) => setFormData({ ...formData, sales: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter sales count"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Revenue</label>
                <input
                  type="number"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter revenue amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Period</label>
                <select
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value as any })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="all-time">All Time</option>
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
                    <>{editingId ? "Update" : "Add"} Product</>
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
              This action cannot be undone. This will permanently delete the best selling product.
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