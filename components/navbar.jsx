"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { cartCountAtom } from "@/lib/atom";

export default function Navbar() {
  const [cartCount] = useAtom(cartCountAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 bg-amber-50/95 backdrop-blur-md p-8 flex items-center justify-between z-50 shadow-md">
      {/* Logo */}
      <Link
        href="/"
        className="text-[24px] sm:text-[28px] font-extrabold tracking-wide text-amber-900 hover:text-amber-700 transition-colors"
      >
        Chip Happens
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex text-[15px] sm:text-[17px] space-x-6 items-center font-medium">
        <li>
          <Link
            href="/"
            className="px-3 py-1.5 rounded-full hover:bg-amber-200/50 hover:text-amber-700 transition-all"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/About"
            className="px-3 py-1.5 rounded-full hover:bg-amber-200/50 hover:text-amber-700 transition-all"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/Menu"
            className="px-3 py-1.5 rounded-full hover:bg-amber-200/50 hover:text-amber-700 transition-all"
          >
            Menu
          </Link>
        </li>
        <li className="relative">
          <Link
            href="/Cart"
            className="relative inline-flex items-center px-3 py-1.5 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold transition-all"
          >
            Cart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
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
            {/* Render cartCount only after hydration */}
            {mounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                {cartCount}
              </span>
            )}
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-amber-100 transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-amber-900"
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
        <div className="absolute top-full left-0 w-full bg-amber-50/95 backdrop-blur-md shadow-lg border-t border-amber-200 md:hidden animate-fadeIn">
          <ul className="flex flex-col space-y-2 p-5 text-[16px] font-medium">
            <li>
              <Link
                href="/"
                className="block px-3 py-2 rounded-lg hover:bg-amber-200/50 hover:text-amber-700 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/About"
                className="block px-3 py-2 rounded-lg hover:bg-amber-200/50 hover:text-amber-700 transition-all"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/Menu"
                className="block px-3 py-2 rounded-lg hover:bg-amber-200/50 hover:text-amber-700 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/Cart"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-amber-200/50 hover:text-amber-700 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Cart
                {mounted && cartCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
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
