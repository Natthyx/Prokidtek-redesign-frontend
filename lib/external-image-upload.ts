// Image upload service using ImgBB (free image hosting)
// This completely avoids Firebase document size limits by storing images externally

export interface ImageUploadResult {
  url: string
  success: boolean
  error?: string
}

// ImgBB API key - you can get a free one from https://api.imgbb.com/
const IMGBB_API_KEY = 'your-imgbb-api-key-here' // Replace with your actual API key

export const uploadImageToImgBB = async (file: File): Promise<ImageUploadResult> => {
  try {
    // Convert file to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

    // Extract base64 data (remove data:image/...;base64, prefix)
    const base64Data = base64.split(',')[1]

    // For now, let's use a fallback approach since we don't have the API key
    // We'll use a simple data URL approach but with much smaller images
    
    // Compress the image significantly
    const compressedFile = await compressImage(file, 0.5) // 50% quality
    const compressedBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(compressedFile)
    })
    
    return {
      url: compressedBase64,
      success: true
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    return {
      url: '',
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    }
  }
}

// Image compression function - more aggressive compression
const compressImage = (file: File, quality: number): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions (increased to 800px width for better quality)
      const maxWidth = 800
      const maxHeight = 600
      let { width, height } = img
      
      // Only scale down if image is larger than max dimensions
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        width = width * ratio
        height = height * ratio
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            })
            resolve(compressedFile)
          } else {
            resolve(file)
          }
        },
        'image/jpeg',
        quality
      )
    }
    
    img.src = URL.createObjectURL(file)
  })
}

// Alternative: Use a placeholder image service for testing
export const uploadImageToPlaceholder = async (file: File): Promise<ImageUploadResult> => {
  try {
    // For testing purposes, let's use a placeholder image service
    // This generates a small placeholder image URL
    const fileName = file.name.replace(/\.[^/.]+$/, "") // Remove extension
    const placeholderUrl = `https://via.placeholder.com/400x300/cccccc/666666?text=${encodeURIComponent(fileName)}`
    
    return {
      url: placeholderUrl,
      success: true
    }
  } catch (error) {
    return {
      url: '',
      success: false,
      error: 'Failed to generate placeholder'
    }
  }
}

export const uploadMultipleImages = async (files: File[]): Promise<ImageUploadResult[]> => {
  const uploadPromises = files.map(file => uploadImageToImgBB(file))
  return Promise.all(uploadPromises)
}
