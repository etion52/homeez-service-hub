
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center mb-6">
              <span className="text-2xl font-bold text-white">
                Home<span className="text-homeez-400">EZ</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Your one-stop solution for all home services. We connect you with verified professionals to take care of your home needs.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-homeez-600 transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-homeez-600 transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-homeez-600 transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-homeez-600 transition-colors"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-homeez-600"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link>
              </li>
            </ul>
          </div>
          
          {/* Popular Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-homeez-600"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/home-cleaning" className="text-gray-400 hover:text-white transition-colors">Home Cleaning</Link>
              </li>
              <li>
                <Link to="/services/plumbing" className="text-gray-400 hover:text-white transition-colors">Plumbing</Link>
              </li>
              <li>
                <Link to="/services/electrician" className="text-gray-400 hover:text-white transition-colors">Electrician</Link>
              </li>
              <li>
                <Link to="/services/pest-control" className="text-gray-400 hover:text-white transition-colors">Pest Control</Link>
              </li>
              <li>
                <Link to="/services/women-salon" className="text-gray-400 hover:text-white transition-colors">Women's Salon & Spa</Link>
              </li>
              <li>
                <Link to="/services/medicine-delivery" className="text-gray-400 hover:text-white transition-colors">Medicine Delivery</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-homeez-600"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-homeez-500 mt-0.5" />
                <span className="text-gray-400">
                  HomeEZ Headquarters, <br />
                  123 Service Road, <br />
                  Mumbai, India 400001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-homeez-500" />
                <a href="tel:+918308370972" className="text-gray-400 hover:text-white transition-colors">
                  +91 8308370972
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-homeez-500" />
                <a href="mailto:gauranggosavi6@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  gauranggosavi6@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} HomeEZ. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-gray-400 text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/refund-policy" className="text-gray-400 text-sm hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
