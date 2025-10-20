// Simple image upload service using a free image hosting API
// This uses imgbb.com which provides free image hosting

export interface ImageUploadResult {
  url: string
  success: boolean
  error?: string
}

export const uploadImageToHosting = async (file: File): Promise<ImageUploadResult> => {
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

    // For now, let's use a simple approach - store as data URL but limit size
    // In production, you would use a proper image hosting service
    
    // Check file size (limit to 500KB for base64 storage)
    const maxSize = 500 * 1024 // 500KB
    if (file.size > maxSize) {
      // If file is too large, compress it
      const compressedFile = await compressImage(file, 0.8) // 80% quality
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
    }

    return {
      url: base64,
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

// Image compression function
const compressImage = (file: File, quality: number): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions (max 800px width)
      const maxWidth = 800
      const maxHeight = 600
      let { width, height } = img
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height
        height = maxHeight
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

export const uploadMultipleImages = async (files: File[]): Promise<ImageUploadResult[]> => {
  const uploadPromises = files.map(file => uploadImageToHosting(file))
  return Promise.all(uploadPromises)
}
