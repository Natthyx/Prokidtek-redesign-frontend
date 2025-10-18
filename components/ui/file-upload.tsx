"use client"

import { useState, useRef } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"

interface FileUploadProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  accept?: string
  className?: string
}

export default function FileUpload({ 
  value, 
  onChange, 
  placeholder = "Choose an image file", 
  accept = "image/*",
  className = ""
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreview(result)
        onChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    setPreview(null)
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      
      {preview ? (
        <div className="relative">
          <div className="border-2 border-dashed border-primary/30 rounded-lg p-4 bg-primary/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Image Selected</p>
                  <p className="text-xs text-muted-foreground">Click to change or drag a new image</p>
                </div>
              </div>
              <button
                onClick={handleRemove}
                className="p-1 hover:bg-red-100 text-red-600 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          </div>
          <div
            onClick={handleClick}
            className="absolute inset-0 cursor-pointer"
          />
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragActive
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50 hover:bg-primary/5"
          }`}
        >
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">{placeholder}</p>
          <p className="text-sm text-muted-foreground">
            Click to browse or drag and drop an image file
          </p>
        </div>
      )}
    </div>
  )
}
