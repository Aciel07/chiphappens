"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { cartCountAtom } from "@/lib/atom";

export default function Navbar() {
  const [cartCount] = useAtom(cartCountAtom);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white p-4 sm:p-10 flex items-center justify-between z-50 shadow-md">
      {/* Logo */}
      <Link href="/" className="text-[22px] sm:text-[28px] font-bold">
        Chip Happens
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex text-[15px] sm:text-[18px] space-x-6 items-center">
        <li>
          <Link href="/" className="hover:text-yellow-600 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/About" className="hover:text-yellow-600 transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link href="/Menu" className="hover:text-yellow-600 transition-colors">
            Shop Now
          </Link>
        </li>
        <li className="relative">
          <Link
            href="/Cart"
            className="relative inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
          >
            Cart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 
                   1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 
                   1.125 0 0 1-1.12-1.243l1.264-12A1.125 
                   1.125 0 0 1 5.513 7.5h12.974c.576 0 
                   1.059.435 1.119 1.007ZM8.625 10.5a.375.375 
                   0 1 1-.75 0 .375.375 0 0 1 .75 
                   0Zm7.5 0a.375.375 0 1 1-.75 
                   0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </Link>

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md border-t md:hidden">
          <ul className="flex flex-col space-y-2 p-4 text-[16px]">
            <li>
              <Link
                href="/"
                className="block px-2 py-1 hover:text-yellow-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/About"
                className="block px-2 py-1 hover:text-yellow-600"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/Menu"
                className="block px-2 py-1 hover:text-yellow-600"
                onClick={() => setIsOpen(false)}
              >
                Shop Now
              </Link>
            </li>
            <li className="relative">
              <Link
                href="/Cart"
                className="block px-2 py-1 hover:text-yellow-600"
                onClick={() => setIsOpen(false)}
              >
                Cart
                {cartCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
