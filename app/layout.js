import "./globals.css";
import { Poppins, Zilla_Slab } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "700"],
  variable: "--font-poppins",
});

export const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-zilla",
});

export const metadata = {
  title: "Chip Happens ",
  description: "Chip Happens is a fictional cookie shop brought to life as a mock e-commerce website, blending playful branding with modern web tech. Built using Next.js, React, JavaScript, Tailwind CSS, and Supabase, the site offers users a seamless experience to browse and order cookies online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${zillaSlab.variable} antialiased  `}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
