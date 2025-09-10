import React from 'react'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

function Footer() {
  return (
 <footer className="bg-stone-50 text-footer-text mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-cookie-golden">Chip Happens</h3>
            <p className="text-sm leading-relaxed">
              Life's too short for boring cookies. We believe every bite should be bold, 
              gooey, and unforgettable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-footer-text hover:text-cookie-golden transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-footer-text hover:text-cookie-golden transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-footer-text hover:text-cookie-golden transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cookie-golden">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-sm hover:text-cookie-golden transition-colors">About Us</a>
              <a href="#menu" className="text-sm hover:text-cookie-golden transition-colors">Menu</a>
              <a href="#services" className="text-sm hover:text-cookie-golden transition-colors">Services</a>
              <a href="#" className="text-sm hover:text-cookie-golden transition-colors">Catering</a>
              <a href="#" className="text-sm hover:text-cookie-golden transition-colors">Cookie Cart</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-[#555555]">
            <h4 className="text-lg font-semibold text-cookie-golden">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-cookie-golden flex-shrink-0" />
                <span className="text-sm">123 Cookie Lane, Sweet City, SC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-cookie-golden flex-shrink-0" />
                <span className="text-sm">(555) 123-CHIP</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-cookie-golden flex-shrink-0" />
                <span className="text-sm">hello@chiphappens.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4  text-[#555555]">
            <h4 className="text-lg font-semibold text-cookie-golden">Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-cookie-golden flex-shrink-0" />
                <div className="text-sm">
                  <div>Mon-Fri: 7AM - 8PM</div>
                  <div>Sat-Sun: 8AM - 9PM</div>
                </div>
              </div>
            </div>
            <div className="bg-cookie-brown/20 p-3 rounded-lg">
              <p className="text-xs text-cookie-golden font-medium">
                🍪 Fresh cookies baked daily at 9AM, 2PM & 6PM
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-cookie-brown/30 pt-8 mb-8  text-[#bcbcbc]">
          <div className="text-center max-w-md mx-auto">
            <h4 className="text-lg font-semibold text-cookie-golden mb-2">Stay Sweet</h4>
            <p className="text-sm mb-4">Get the latest on new flavors and special offers!</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 rounded-lg bg-cookie-brown/20 border border-cookie-brown/30 text-footer-text placeholder-footer-text/60 focus:outline-none focus:border-cookie-golden"
              />
              <button className="px-6 py-2 bg-cookie-golden text-cookie-brown font-medium rounded-lg hover:bg-cookie-amber transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cookie-brown/30 pt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-[#bcbcbc]">
          <p className="text-sm">
            © 2024 Chip Happens. All rights reserved. Made with 🍪 and love.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-cookie-golden transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cookie-golden transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
