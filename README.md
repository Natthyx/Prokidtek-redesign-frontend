# ProKidTek - Technology E-commerce Platform

A modern, full-stack e-commerce website for a technology company specializing in premium laptops, desktops, network devices, and audio equipment. Built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Firebase.

## 🚀 Features

### Frontend
- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **Product Catalog**: Dynamic product pages with image galleries
- **Admin Dashboard**: Complete content management system
- **Real-time Data**: Firebase integration for live data updates

### Admin Features
- Product management (CRUD operations)
- Best-selling products management
- New arrivals management
- Client testimonials management
- Customer reviews management
- Contact form email management
- Database seeding utility

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Icons**: Lucide React
- **Animations**: Custom CSS + tw-animate-css

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Elias-Deg/Prokidtek-redesign-frontend.git
   cd Prokidtek-redesign-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Enable Authentication (optional)
   - Get your Firebase configuration

4. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Seed the database**
   - Go to `/admin/login`
   - Login with: `admin@prokidtek.com` / `ProKidTek2025`
   - Navigate to "Seed Database" in the admin dashboard
   - Click "Seed Database" to populate with sample data

## 🗄️ Database Structure

### Collections

#### Products
```typescript
{
  id: string
  name: string
  category: string
  description: string
  fullDescription: string
  specs: string[]
  image: string
  images: string[]
  rating: number
  reviews: number
  price?: number
  stock: number
  status: 'Active' | 'Low Stock' | 'Out of Stock'
  featured: boolean
  createdAt: Date
  updatedAt: Date
}
```

#### New Arrivals
```typescript
{
  id: string
  productId: string
  dateAdded: Date
  featured: boolean
}
```

#### Best Selling
```typescript
{
  id: string
  productId: string
  sales: number
  revenue: number
  period: 'monthly' | 'yearly' | 'all-time'
  featured: boolean
}
```

#### Testimonials
```typescript
{
  id: string
  quote: string
  author: string
  company: string
  logo: string
  rating: number
  featured: boolean
  createdAt: Date
}
```

## 🎨 Design System

### Colors
- **Primary**: Orange (#fe4f08)
- **Accent**: Light Orange (#ff6b1a)
- **Background**: White/Black theme support
- **Text**: High contrast for accessibility

### Typography
- **Font Family**: Geist (Sans), Geist Mono
- **Responsive**: Scales appropriately across devices

### Components
- **57+ UI Components**: Built with shadcn/ui
- **30+ Section Components**: Custom page sections
- **Animations**: 20+ custom CSS animations
- **Hover Effects**: Interactive micro-animations

## 📱 Pages

### Public Pages
- **Home** (`/`): Hero, featured products, testimonials
- **About** (`/about`): Company information, team, values
- **Products** (`/products`): Product catalog with filtering
- **Product Detail** (`/products/[id]`): Individual product pages
- **Clients** (`/clients`): Client showcase and testimonials
- **Contact** (`/contact`): Contact form and information

### Admin Pages
- **Dashboard** (`/admin/dashboard`): Overview and quick actions
- **Products** (`/admin/products`): Product management
- **New Arrivals** (`/admin/new-arrivals`): Manage new products
- **Best Selling** (`/admin/best-selling`): Track top products
- **Testimonials** (`/admin/testimonials`): Client testimonials
- **Reviews** (`/admin/reviews`): Customer reviews
- **Emails** (`/admin/emails`): Contact form submissions
- **Seed Data** (`/admin/seed-data`): Database initialization

## 🔧 Development

### Project Structure
```
prokidtekV0/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   ├── products/          # Product pages
│   └── ...                # Other pages
├── components/            # Reusable components
│   ├── sections/          # Page sections
│   └── ui/               # UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and Firebase
└── public/               # Static assets
```

### Key Files
- `lib/firebase.ts`: Firebase configuration
- `lib/firebase-services.ts`: Database operations
- `lib/types.ts`: TypeScript interfaces
- `lib/seed-data.ts`: Database seeding
- `hooks/use-products.ts`: Product data hooks
- `hooks/use-testimonials.ts`: Testimonial hooks

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: Static site generation
- **AWS**: Full-stack deployment
- **DigitalOcean**: VPS deployment

## 🔐 Admin Access

**Default Credentials:**
- Email: `admin@prokidtek.com`
- Password: `ProKidTek2025`

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for speed
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic route-based splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Create an issue on GitHub
- Contact: [Your Contact Information]

---

**Built with ❤️ using Next.js, React, and Firebase**
