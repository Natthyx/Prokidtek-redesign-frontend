import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import { Product, NewArrival, BestSelling, Testimonial, Review, ContactEmail } from './types'
import { deleteMultipleImages } from './image-storage'

// Products Collection
export const productsCollection = collection(db, 'products')
export const newArrivalsCollection = collection(db, 'newArrivals')
export const bestSellingCollection = collection(db, 'bestSelling')
export const testimonialsCollection = collection(db, 'testimonials')
export const reviewsCollection = collection(db, 'reviews')
export const contactEmailsCollection = collection(db, 'contactEmails')

// Product Services
export const getProducts = async (): Promise<Product[]> => {
  try {
    const snapshot = await getDocs(productsCollection)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Product[]
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(productsCollection, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      } as Product
    }
    return null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(productsCollection, {
      ...product,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding product:', error)
    return null
  }
}

export const updateProduct = async (id: string, product: Partial<Product>): Promise<boolean> => {
  try {
    const docRef = doc(productsCollection, id)
    await updateDoc(docRef, {
      ...product,
      updatedAt: Timestamp.now(),
    })
    return true
  } catch (error) {
    console.error('Error updating product:', error)
    return false
  }
}

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    // First get the product to extract image paths
    const product = await getProduct(id)
    
    const docRef = doc(productsCollection, id)
    await deleteDoc(docRef)
    
    // Delete associated images from Firebase Storage
    if (product && product.images && product.images.length > 0) {
      try {
        // Extract storage paths from URLs (this is a simplified approach)
        // In a production app, you might want to store the storage paths separately
        const imagePaths = product.images.map(url => {
          // Extract path from Firebase Storage URL
          const urlParts = url.split('/')
          const pathIndex = urlParts.findIndex(part => part === 'o') + 1
          if (pathIndex > 0 && pathIndex < urlParts.length) {
            return decodeURIComponent(urlParts[pathIndex].split('?')[0])
          }
          return null
        }).filter(Boolean) as string[]
        
        if (imagePaths.length > 0) {
          await deleteMultipleImages(imagePaths)
        }
      } catch (storageError) {
        console.error('Error deleting images from storage:', storageError)
        // Don't fail the product deletion if image deletion fails
      }
    }
    
    return true
  } catch (error) {
    console.error('Error deleting product:', error)
    return false
  }
}

// New Arrivals Services
export const getNewArrivals = async (): Promise<NewArrival[]> => {
  try {
    const q = query(newArrivalsCollection, orderBy('dateAdded', 'desc'), limit(10))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      dateAdded: doc.data().dateAdded?.toDate() || new Date(),
    })) as NewArrival[]
  } catch (error) {
    console.error('Error fetching new arrivals:', error)
    return []
  }
}

export const addNewArrival = async (newArrival: Omit<NewArrival, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(newArrivalsCollection, {
      ...newArrival,
      dateAdded: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding new arrival:', error)
    return null
  }
}

// Best Selling Services
export const getBestSelling = async (): Promise<BestSelling[]> => {
  try {
    const q = query(bestSellingCollection, orderBy('sales', 'desc'), limit(10))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as BestSelling[]
  } catch (error) {
    console.error('Error fetching best selling:', error)
    return []
  }
}

export const addBestSelling = async (bestSelling: Omit<BestSelling, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(bestSellingCollection, bestSelling)
    return docRef.id
  } catch (error) {
    console.error('Error adding best selling:', error)
    return null
  }
}

// Testimonials Services
export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const q = query(testimonialsCollection, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Testimonial[]
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export const addTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(testimonialsCollection, {
      ...testimonial,
      createdAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding testimonial:', error)
    return null
  }
}

export const updateTestimonial = async (id: string, testimonial: Partial<Testimonial>): Promise<boolean> => {
  try {
    const docRef = doc(testimonialsCollection, id)
    await updateDoc(docRef, testimonial)
    return true
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return false
  }
}

export const deleteTestimonial = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(testimonialsCollection, id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return false
  }
}

// Reviews Services
export const getReviews = async (): Promise<Review[]> => {
  try {
    const q = query(reviewsCollection, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Review[]
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  try {
    const q = query(reviewsCollection, where('productId', '==', productId), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Review[]
  } catch (error) {
    console.error('Error fetching product reviews:', error)
    return []
  }
}

export const addReview = async (review: Omit<Review, 'id' | 'createdAt'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(reviewsCollection, {
      ...review,
      createdAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding review:', error)
    return null
  }
}

// Contact Emails Services
export const getContactEmails = async (): Promise<ContactEmail[]> => {
  try {
    const q = query(contactEmailsCollection, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as ContactEmail[]
  } catch (error) {
    console.error('Error fetching contact emails:', error)
    return []
  }
}

export const addContactEmail = async (email: Omit<ContactEmail, 'id' | 'createdAt'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(contactEmailsCollection, {
      ...email,
      createdAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding contact email:', error)
    return null
  }
}

export const markEmailAsRead = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(contactEmailsCollection, id)
    await updateDoc(docRef, { read: true })
    return true
  } catch (error) {
    console.error('Error marking email as read:', error)
    return false
  }
}

export const deleteContactEmail = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(contactEmailsCollection, id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error('Error deleting contact email:', error)
    return false
  }
}
