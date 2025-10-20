"use client"

import { useState, useRef } from "react"
import { Upload, X, Image as ImageIcon, Plus, Loader2 } from "lucide-react"
import { uploadImage, ProductImageData } from "@/lib/image-storage"

interface MultipleFileUploadProps {
  value: string[]
  onChange: (value: string[]) => void
  onImageDataChange?: (imageData: ProductImageData[]) => void
  placeholder?: string
  accept?: string
  className?: string
  maxFiles?: number
}

export default function MultipleFileUpload({ 
  value = [], 
  onChange, 
  onImageDataChange,
  placeholder = "Choose image files", 
  accept = "image/*",
  className = "",
  maxFiles = 10
}: MultipleFileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (files: FileList) => {
    const fileArray = Array.from(files)
    const validFiles = fileArray.filter(file => file.type.startsWith('image/'))
    
    if (validFiles.length === 0) {
      setUploadError('Please select valid image files.')
      return
    }
    
    if (value.length + validFiles.length > maxFiles) {
      setUploadError(`You can only upload up to ${maxFiles} images. Please select fewer images.`)
      return
    }
    
    setUploading(true)
    setUploadError(null)
    
    try {
      console.log('Starting upload of', validFiles.length, 'files')
      
      const uploadPromises = validFiles.map(async (file, index) => {
        const timestamp = Date.now()
        const fileName = `${timestamp}_${index}_${file.name}`
        const path = `products/${fileName}`
        
        console.log('Uploading file:', fileName, 'to path:', path)
        
        // Update progress for this file
        setUploadProgress(prev => ({ ...prev, [fileName]: 0 }))
        
        try {
          const result = await uploadImage(file, path)
          console.log('Upload successful for:', fileName, 'URL:', result.url)
          
          // Update progress to 100%
          setUploadProgress(prev => ({ ...prev, [fileName]: 100 }))
          
          return result
        } catch (fileError) {
          console.error('Error uploading file:', fileName, fileError)
          throw new Error(`Failed to upload ${file.name}: ${fileError}`)
        }
      })
      
      const uploadedResults = await Promise.all(uploadPromises)
      const uploadedUrls = uploadedResults.map(result => result.url)
      
      console.log('All uploads completed successfully:', uploadedUrls)
      
      onChange([...value, ...uploadedUrls])
      
      // Also provide the full image data if callback is provided
      if (onImageDataChange) {
        onImageDataChange(uploadedResults)
      }
      
      // Clear progress after a short delay
      setTimeout(() => {
        setUploadProgress({})
      }, 1000)
      
    } catch (error) {
      console.error('Error uploading images:', error)
      setUploadError(error instanceof Error ? error.message : 'Failed to upload images. Please try again.')
    } finally {
      setUploading(false)
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
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = (index: number) => {
    const newImages = value.filter((_, i) => i !== index)
    onChange(newImages)
  }

  const handleRemoveAll = () => {
    onChange([])
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
        multiple
        onChange={handleChange}
        className="hidden"
      />
      
      {/* Upload Area */}
      <div
        onClick={uploading ? undefined : handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
          uploading 
            ? "border-primary/50 bg-primary/5 cursor-not-allowed"
            : dragActive
            ? "border-primary bg-primary/10 cursor-pointer"
            : "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
        }`}
      >
        {uploading ? (
          <>
            <Loader2 className="w-8 h-8 text-primary mx-auto mb-3 animate-spin" />
            <p className="text-primary font-medium mb-1">Uploading images...</p>
            <p className="text-sm text-muted-foreground">
              Please wait while your images are being uploaded
            </p>
          </>
        ) : uploadError ? (
          <>
            <X className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <p className="text-red-500 font-medium mb-1">Upload Failed</p>
            <p className="text-sm text-red-400 mb-3">{uploadError}</p>
            <button
              onClick={() => {
                setUploadError(null)
                handleClick()
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Try Again
            </button>
          </>
        ) : (
          <>
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium mb-1">{placeholder}</p>
            <p className="text-sm text-muted-foreground">
              Click to browse or drag and drop multiple image files
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Max {maxFiles} images • Current: {value.length}
            </p>
          </>
        )}
      </div>

      {/* Image Grid */}
      {value.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">
              Uploaded Images ({value.length})
            </h4>
            <button
              onClick={handleRemoveAll}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Remove All
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {value.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-border">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Remove button */}
                <button
                  onClick={() => handleRemove(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
                
                {/* Image number */}
                <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
            
            {/* Add more button */}
            {value.length < maxFiles && !uploading && (
              <div
                onClick={handleClick}
                className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <div className="text-center">
                  <Plus className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Add More</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
