"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Edit2, Trash2, X } from "lucide-react"
import MultipleFileUpload from "@/components/ui/multiple-file-upload-real"
import { Product } from "@/lib/types"
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/firebase-services"

export default function ProductsAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ 
    name: "", 
    category: "", 
    stock: "", 
    description: "", 
    fullDescription: "",
    specs: "", 
    images: [] as string[],
    price: "",
    rating: "5",
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

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteProduct(id)
      if (success) {
        setProducts(products.filter((item) => item.id !== id))
      } else {
        alert('Failed to delete product')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setFormData({
      name: product.name,
      category: product.category,
      stock: product.stock.toString(),
      description: product.description,
      fullDescription: product.fullDescription || "",
      specs: product.specs.join(", "),
      images: product.images || [product.image || ""],
      price: product.price?.toString() || "",
      rating: product.rating.toString(),
      reviews: product.reviews.toString()
    })
    setShowModal(true)
  }

  const handleAddProduct = async () => {
    if (
      formData.name &&
      formData.category &&
      formData.stock &&
      formData.description &&
      formData.specs &&
      formData.images.length > 0
    ) {
      try {
        const stockNumber = Number.parseInt(formData.stock)
        const status = stockNumber > 20 ? "Active" : stockNumber > 0 ? "Low Stock" : "Out of Stock"
        
        const productData: any = {
          name: formData.name,
          category: formData.category,
          stock: stockNumber,
          status: status as 'Active' | 'Low Stock' | 'Out of Stock',
          description: formData.description,
          fullDescription: formData.fullDescription || formData.description,
          specs: formData.specs.split(',').map(spec => spec.trim()).filter(spec => spec),
          image: formData.images[0], // First image as main image
          images: formData.images,
          rating: Number.parseFloat(formData.rating),
          reviews: Number.parseInt(formData.reviews),
          featured: false
        }

        // Only add price if it's provided and not empty
        if (formData.price && formData.price.trim() !== '') {
          productData.price = Number.parseFloat(formData.price)
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
          stock: "", 
          description: "", 
          fullDescription: "",
          specs: "", 
          images: [],
          price: "",
          rating: "5",
          reviews: "0"
        })
        setShowModal(false)
      } catch (error) {
        console.error('Error saving product:', error)
        alert('Failed to save product')
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ 
      name: "", 
      category: "", 
      stock: "", 
      description: "", 
      fullDescription: "",
      specs: "", 
      images: [],
      price: "",
      rating: "5",
      reviews: "0"
    })
  }

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
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-white">Product Details</h1>
          </div>
          <button
            onClick={() => {
              setEditingId(null)
              setFormData({ 
                name: "", 
                category: "", 
                stock: "", 
                description: "", 
                fullDescription: "",
                specs: "", 
                images: [],
                price: "",
                rating: "5",
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
        <div className="bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-900 border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Product Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-white/80">{item.category}</td>
                  <td className="px-6 py-4 text-white/80">{item.stock}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Active" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 hover:bg-blue-500/10 text-blue-400 rounded-lg transition-colors hover:scale-110"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
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
                <label className="block text-sm font-medium text-foreground mb-2">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter stock quantity"
                />
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
                <label className="block text-sm font-medium text-foreground mb-2">Full Description</label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Enter detailed product description"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter price (optional)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="5.0"
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
                <label className="block text-sm font-medium text-foreground mb-2">Specifications</label>
                <textarea
                  value={formData.specs}
                  onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Enter specifications separated by commas (e.g., Intel i7, 16GB RAM, 512GB SSD)"
                  rows={3}
                />
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
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  {editingId ? "Update" : "Add"} Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
