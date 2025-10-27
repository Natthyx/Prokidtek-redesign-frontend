import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, User } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <img src="/prokidtek-logo1.png" alt="ProKidTek" className="h-12 w-auto" />
            </div>
            <p className="text-gray-300">Your trusted partner for premium technology solutions.</p>
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  Laptops
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  Desktops
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  Network Devices
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  Audio Equipment
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span className="text-gray-300">011-5-54-08-57/58</span>
              </li>
              <li className="flex gap-2">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span className="text-gray-300">info@prokidtek.com</span>
              </li>
              <li className="flex gap-2">
                <MapPin size={20} className="text-primary flex-shrink-0" />
                <span className="text-gray-300"> Aberus Building ground floor rom. No G03</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Powered by SMS technologies. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0 items-center">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                Sitemap
              </a>
              <Link
                href="/admin/login"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <User size={18} />
                <span className="text-sm font-medium"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
