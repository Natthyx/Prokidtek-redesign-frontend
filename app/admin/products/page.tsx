"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Edit2, Trash2, X } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  stock: number
  status: string
  description: string
  specs: string
  image: string
}

export default function ProductsAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", category: "", stock: "", description: "", specs: "", image: "" })
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "MacBook Pro 16",
      category: "Laptops",
      stock: 45,
      status: "Active",
      description: "High-performance laptop for professionals",
      specs: "Intel i7, 16GB RAM, 512GB SSD",
      image: "/product-image.jpg",
    },
    {
      id: "2",
      name: "Dell XPS 13",
      category: "Laptops",
      stock: 32,
      status: "Active",
      description: "Ultra-portable powerhouse",
      specs: "Intel i5, 8GB RAM, 256GB SSD",
      image: "/product-image.jpg",
    },
    {
      id: "3",
      name: "HP Pavilion Desktop",
      category: "Desktops",
      stock: 18,
      status: "Active",
      description: "Reliable desktop for everyday use",
      specs: "Intel i5, 16GB RAM, 1TB HDD",
      image: "/product-image.jpg",
    },
    {
      id: "4",
      name: "Cisco Switch",
      category: "Network Devices",
      stock: 12,
      status: "Low Stock",
      description: "Enterprise-grade network switch",
      specs: "24 Ports, Gigabit, PoE",
      image: "/product-image.jpg",
    },
    {
      id: "5",
      name: "Sony WH-1000XM5",
      category: "Audio Equipment",
      stock: 67,
      status: "Active",
      description: "Premium noise-canceling headphones",
      specs: "40hr Battery, ANC, Bluetooth 5.3",
      image: "/product-image.jpg",
    },
  ])
  const router = useRouter()

  const categories = ["Laptops", "Desktops", "Network Devices", "Audio Equipment", "Accessories"]

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleDelete = (id: string) => {
    setProducts(products.filter((item) => item.id !== id))
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setFormData({
      name: product.name,
      category: product.category,
      stock: product.stock.toString(),
      description: product.description,
      specs: product.specs,
      image: product.image,
    })
    setShowModal(true)
  }

  const handleAddProduct = () => {
    if (
      formData.name &&
      formData.category &&
      formData.stock &&
      formData.description &&
      formData.specs &&
      formData.image
    ) {
      if (editingId) {
        setProducts(
          products.map((item) =>
            item.id === editingId
              ? {
                  ...item,
                  name: formData.name,
                  category: formData.category,
                  stock: Number.parseInt(formData.stock),
                  status: Number.parseInt(formData.stock) > 20 ? "Active" : "Low Stock",
                  description: formData.description,
                  specs: formData.specs,
                  image: formData.image,
                }
              : item,
          ),
        )
        setEditingId(null)
      } else {
        const newProduct: Product = {
          id: Date.now().toString(),
          name: formData.name,
          category: formData.category,
          stock: Number.parseInt(formData.stock),
          status: Number.parseInt(formData.stock) > 20 ? "Active" : "Low Stock",
          description: formData.description,
          specs: formData.specs,
          image: formData.image,
        }
        setProducts([newProduct, ...products])
      }
      setFormData({ name: "", category: "", stock: "", description: "", specs: "", image: "" })
      setShowModal(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ name: "", category: "", stock: "", description: "", specs: "", image: "" })
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
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
              setFormData({ name: "", category: "", stock: "", description: "", specs: "", image: "" })
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.category}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.stock}</td>
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
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors hover:scale-110"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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
                <label className="block text-sm font-medium text-foreground mb-2">Specifications</label>
                <textarea
                  value={formData.specs}
                  onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Enter specifications (e.g., Intel i7, 16GB RAM, 512GB SSD)"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Product Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter image URL (e.g., /product-image.jpg)"
                />
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
