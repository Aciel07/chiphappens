"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  X,
} from "lucide-react";

function Footer() {
  const [modalType, setModalType] = useState(null);

  const closeModal = () => setModalType(null);

  return (
    <footer className="bg-white text-footer-text border-t border-cookie-brown">
      <div className="max-w-7xl mx-auto px-8 py-12 text-[#373737]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-cookie-golden">
              Chip Happens
            </h3>
            <p className="text-sm leading-relaxed">
              Life's too short for boring cookies. We believe every bite should
              be bold, gooey, and unforgettable.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-footer-text hover:text-cookie-golden transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-footer-text hover:text-cookie-golden transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-footer-text hover:text-cookie-golden transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cookie-golden">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin
                  size={16}
                  className="text-cookie-golden flex-shrink-0"
                />
                <span className="text-sm">
                  123 Cookie Lane, Sweet City, SC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-cookie-golden flex-shrink-0" />
                <span className="text-sm">(555) 123-CHIP</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-cookie-golden flex-shrink-0" />
                <span className="text-sm">support@chiphappens.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 ]">
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

        <div className="border-t border-cookie-brown/30 pt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-[#bcbcbc]">
          <p className="text-sm text-[#111]">
            © 2025 Chip Happens. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-[#111]">
            <button
              onClick={() => setModalType("privacy")}
              className="hover:text-cookie-golden transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType("terms")}
              className="hover:text-cookie-golden transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {modalType && (
        <div className="mx-auto fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full p-6 rounded-2xl shadow-lg relative overflow-y-auto max-h-[80vh]">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            {modalType === "privacy" ? (
              <>
                <h2 className="text-2xl font-bold text-cookie-golden mb-4 text-center">
                  🍪 Privacy Policy
                </h2>
                <div className="text-sm text-gray-700 space-y-4">
                    <p className=" text-justify">
                    At <strong>Chip Happens</strong>, we value your privacy as
                    much as we value our cookie dough. This Privacy Policy
                    explains how we collect, use, and protect your personal data
                    in accordance with the Philippine Data Privacy Act of 2012
                    (RA10173).
                  </p>
                  <h3 className="font-semibold text-cookie-golden">
                    What We Collect
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <strong>Personal Information:</strong> Name, email, phone
                      number, shipping address, and payment details.
                    </li>
                    <li>
                      <strong>Device & Usage Data:</strong> IP address, browser
                      type, and pages visited.
                    </li>
                    <li>
                      <strong>Cookies:</strong> Used to personalize your
                      experience and track preferences.
                    </li>
                  </ul>
                  <h3 className="font-semibold text-cookie-golden">
                    How We Use Your Data
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>To process and deliver your orders</li>
                    <li>
                      To send updates, promotions, and sweet surprises (only if
                      you opt in)
                    </li>
                    <li>To improve our website and services</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                  <p>
                    For any concerns, email us at{" "}
                    <span className="text-cookie-golden">
                      support@chiphappens.com
                    </span>
                    .
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-cookie-golden mb-4 text-center">
                  📜 Terms & Conditions
                </h2>
                <div className="text-sm text-gray-700 space-y-4 ">
                  <h3 className="font-bold text-cookie-golden">
                    Orders & Payments
                  </h3>
                  <p className=" text-justify">
                    All prices are listed in Philippine Peso (₱) and include
                    applicable taxes. Orders are confirmed once payment is
                    successfully processed. We reserve the right to cancel or
                    refuse any order at our discretion.
                  </p>

                  <h3 className="font-semibold text-cookie-golden">
                    Shipping & Delivery
                  </h3>
                  <p className=" text-justify">
                    We ship within Metro Manila and select areas. Delivery times
                    may vary based on location and order volume. While we strive
                    for timely delivery, we are not liable for delays beyond our
                    control.
                  </p>

                  <h3 className="font-semibold text-cookie-golden">
                    Returns & Refunds
                  </h3>
                  <p className=" text-justify">
                    Due to the perishable nature of our products, all sales are
                    final. If your order arrives damaged or incorrect, contact
                    us within 48 hours for a resolution.
                  </p>

                  <h3 className="font-semibold text-cookie-golden">
                    Intellectual Property
                  </h3>
                  <p className=" text-justify">
                    All content on this site—including images, logos, and
                    recipes—is owned by Chip Happens. Unauthorized use is
                    prohibited.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
