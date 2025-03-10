import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Leviss</h3>
            <p className="text-gray-600 mb-4">Your one-stop shop for quality products at affordable prices.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=Clothing" className="text-gray-600 hover:text-blue-600">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=Shoes" className="text-gray-600 hover:text-blue-600">
                  Shoes
                </Link>
              </li>
              <li>
                <Link to="/products?category=Accessories" className="text-gray-600 hover:text-blue-600">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="text-gray-600 hover:text-blue-600">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=Home" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products?category=Beauty" className="text-gray-600 hover:text-blue-600">
                  Beauty
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-blue-600">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-blue-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blue-600">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-gray-500 mt-0.5" />
                <span className="text-gray-600">Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-gray-500" />
                <span className="text-gray-600">+92-3339167909</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-gray-500" />
                <span className="text-gray-600">abdul.wasay308@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Levi's. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

