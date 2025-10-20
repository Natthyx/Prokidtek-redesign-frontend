import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './firebase'

export interface UploadResult {
  url: string
  path: string
}

export interface ProductImageData {
  url: string
  path: string
}

export const uploadImage = async (file: File, path: string): Promise<UploadResult> => {
  try {
    console.log('Firebase Storage: Starting upload for', file.name, 'to path:', path)
    
    // Validate file size (optional - Firebase Storage has its own limits)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      throw new Error(`File size too large. Maximum size is ${maxSize / (1024 * 1024)}MB`)
    }
    
    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, path)
    console.log('Firebase Storage: Created reference:', storageRef.fullPath)
    
    // Upload the file
    console.log('Firebase Storage: Starting upload...')
    const snapshot = await uploadBytes(storageRef, file)
    console.log('Firebase Storage: Upload completed, getting download URL...')
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref)
    console.log('Firebase Storage: Got download URL:', downloadURL)
    
    return {
      url: downloadURL,
      path: snapshot.ref.fullPath
    }
  } catch (error) {
    console.error('Firebase Storage: Error uploading image:', error)
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const uploadMultipleImages = async (files: File[], basePath: string): Promise<UploadResult[]> => {
  try {
    const uploadPromises = files.map((file, index) => {
      const timestamp = Date.now()
      const fileName = `${timestamp}_${index}_${file.name}`
      const fullPath = `${basePath}/${fileName}`
      
      return uploadImage(file, fullPath)
    })
    
    const results = await Promise.all(uploadPromises)
    return results
  } catch (error) {
    console.error('Error uploading multiple images:', error)
    throw new Error('Failed to upload images')
  }
}

export const deleteImage = async (imagePath: string): Promise<void> => {
  try {
    const imageRef = ref(storage, imagePath)
    await deleteObject(imageRef)
  } catch (error) {
    console.error('Error deleting image:', error)
    throw new Error('Failed to delete image')
  }
}

export const deleteMultipleImages = async (imagePaths: string[]): Promise<void> => {
  try {
    const deletePromises = imagePaths.map(path => deleteImage(path))
    await Promise.all(deletePromises)
  } catch (error) {
    console.error('Error deleting multiple images:', error)
    throw new Error('Failed to delete images')
  }
}
