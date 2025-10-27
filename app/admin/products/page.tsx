"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Edit2, Trash2, X, PlusCircle, Trash, List, Loader2 } from "lucide-react"
import MultipleFileUpload from "@/components/ui/multiple-file-upload-real"
import { Product } from "@/lib/types"
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/firebase-services"
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

export default function ProductsAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false) // Add submitting state
  const [formData, setFormData] = useState({ 
    name: "", 
    category: "", 
    description: "", 
    fullDescription: "",
    specs: [] as { key: string; value: string }[], // Changed to array of key-value pairs
    images: [] as string[],
    rating: "0",
    reviews: "0"
  })
  const [products, setProducts] = useState<Product[]>([])
  const router = useRouter()

  const categories = ["Laptops", "Desktops", "Network Devices", "Audio Equipment", "Accessories"]

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      fetchProducts()
    }
  }, [router])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
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
        const success = await deleteProduct(itemToDelete)
        if (success) {
          setProducts(products.filter((item) => item.id !== itemToDelete))
        } else {
          alert('Failed to delete product')
        }
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product')
      } finally {
        setShowDeleteDialog(false)
        setItemToDelete(null)
      }
    }
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      fullDescription: product.fullDescription || "",
      // Convert existing specs string to key-value pairs
      specs: product.specs.map(spec => {
        const colonIndex = spec.indexOf(':');
        if (colonIndex > 0) {
          return {
            key: spec.substring(0, colonIndex).trim(),
            value: spec.substring(colonIndex + 1).trim()
          };
        }
        return { key: "", value: spec };
      }),
      images: product.images || [product.image || ""],
      rating: product.rating.toString(),
      reviews: product.reviews.toString()
    })
    setShowModal(true)
  }

  const handleAddProduct = async () => {
    // Remove price validation since we're removing the price field
    if (
      formData.name &&
      formData.category &&
      formData.description &&
      formData.images.length > 0
    ) {
      try {
        setIsSubmitting(true) // Set submitting state to true
        
        // Convert specs array to strings
        const specsStrings = formData.specs
          .filter(spec => spec.key.trim() !== "" || spec.value.trim() !== "")
          .map(spec => spec.key ? `${spec.key}: ${spec.value}` : spec.value);

        const productData: any = {
          name: formData.name,
          category: formData.category,
          description: formData.description,
          fullDescription: formData.fullDescription || formData.description,
          specs: specsStrings,
          image: formData.images[0], // First image as main image
          images: formData.images,
          rating: Number.parseFloat(formData.rating) || 0, // Default to 0 if invalid
          reviews: Number.parseInt(formData.reviews) || 0, // Default to 0 if invalid
          featured: false
        }

        if (editingId) {
          const success = await updateProduct(editingId, productData)
          if (success) {
            await fetchProducts() // Refresh the products list
            setEditingId(null)
          } else {
            alert('Failed to update product')
          }
        } else {
          const productId = await addProduct(productData)
          if (productId) {
            await fetchProducts() // Refresh the products list
          } else {
            alert('Failed to add product')
          }
        }
        
        setFormData({ 
          name: "", 
          category: "", 
          description: "", 
          fullDescription: "",
          specs: [],
          images: [],
          rating: "0",
          reviews: "0"
        })
        setShowModal(false)
      } catch (error) {
        console.error('Error saving product:', error)
        alert('Failed to save product')
      } finally {
        setIsSubmitting(false) // Reset submitting state
      }
    } else {
      alert('Please fill in all required fields')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ 
      name: "", 
      category: "", 
      description: "", 
      fullDescription: "",
      specs: [],
      images: [],
      rating: "0",
      reviews: "0"
    })
  }

  // Functions for handling specifications
  const addSpecField = () => {
    setFormData({
      ...formData,
      specs: [...formData.specs, { key: "", value: "" }]
    });
  };

  const removeSpecField = (index: number) => {
    const newSpecs = [...formData.specs];
    newSpecs.splice(index, 1);
    setFormData({
      ...formData,
      specs: newSpecs
    });
  };

  const updateSpecField = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...formData.specs];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setFormData({
      ...formData,
      specs: newSpecs
    });
  };

  // Function to insert bullet point in full description
  const insertBulletPoint = () => {
    const textarea = document.getElementById('fullDescription') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = formData.fullDescription;
      
      // Determine if we need a newline before the bullet point
      const needsNewline = start > 0 && text.charAt(start - 1) !== '\n';
      const bulletPoint = needsNewline ? '\n- ' : '- ';
      
      // Insert bullet point at cursor position
      const newText = text.substring(0, start) + bulletPoint + text.substring(end);
      
      setFormData({
        ...formData,
        fullDescription: newText
      });
      
      // Set cursor position after the bullet point
      setTimeout(() => {
        if (textarea) {
          const cursorPosition = start + bulletPoint.length;
          textarea.selectionStart = cursorPosition;
          textarea.selectionEnd = cursorPosition;
          textarea.focus();
        }
      }, 0);
    }
  };

  if (!isAuthenticated) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Product Details</h1>
          </div>
          <button
            onClick={() => {
              setEditingId(null)
              setFormData({ 
                name: "", 
                category: "", 
                description: "", 
                fullDescription: "",
                specs: [],
                images: [],
                rating: "0",
                reviews: "0"
              })
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.category}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 hover:bg-blue-500/10 text-blue-400 rounded-lg transition-colors hover:scale-110"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors hover:scale-110"
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
        <div className="fixed inset-0 bg-black/550 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4 animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">{editingId ? "Edit Product" : "Add Product"}</h2>
              <button onClick={handleCloseModal} className="p-1 hover:bg-muted rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter product name"
                />
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

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-foreground">Full Description</label>
                  <button
                    type="button"
                    onClick={insertBulletPoint}
                    className="flex items-center text-primary hover:text-primary/80 text-sm"
                  >
                    <List size={16} className="mr-1" />
                    Add Bullet Point
                  </button>
                </div>
                <textarea
                  id="fullDescription"
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Enter detailed product description. Use the 'Add Bullet Point' button to insert bullet points."
                  rows={6}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Tip: Place your cursor where you want to add a bullet point and click the "Add Bullet Point" button.
                </p>
              </div>

              {/* Specifications Section */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-foreground">Specifications</label>
                  <button
                    type="button"
                    onClick={addSpecField}
                    className="flex items-center text-primary hover:text-primary/80 text-sm"
                  >
                    <PlusCircle size={16} className="mr-1" />
                    Add Specification
                  </button>
                </div>
                
                <div className="space-y-2">
                  {formData.specs.map((spec, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={spec.key}
                        onChange={(e) => updateSpecField(index, 'key', e.target.value)}
                        className="w-2/5 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Key (e.g., Processor)"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => updateSpecField(index, 'value', e.target.value)}
                        className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Value (e.g., Apple M4)"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecField(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  ))}
                  
                  {formData.specs.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      No specifications added. Click "Add Specification" to add one.
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Reviews Count</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.reviews}
                    onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Product Images</label>
                <MultipleFileUpload
                  value={formData.images}
                  onChange={(images) => setFormData({ ...formData, images })}
                  placeholder="Choose your actual product photos"
                  maxFiles={3}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Upload your actual product photos to create a slideshow. The first photo will be used as the main product image.
                  <br />
                  <span className="text-green-600 font-medium">
                    Your real photos are compressed to fit within Firebase limits while maintaining quality.
                  </span>
                </p>
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
              This action cannot be undone. This will permanently delete the product
              and remove all associated data.
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