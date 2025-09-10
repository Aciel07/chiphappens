"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { supabase } from "@/lib/supabaseClient";
import FilterBar from "@/components/filter-bar";
import CookieSlot from "@/components/cookie-slot";

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  // Steps
  const [boxSize, setBoxSize] = useState(null); // Step 1
  const [cookies, setCookies] = useState([]); // Step 3

  // fetch cookies
  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase.from("menu_items").select("*");
      if (error) console.error("Error fetching menu:", error);
      else setMenuItems(data || []);
    };
    fetchMenu();
  }, []);

  const filteredItems = selectedType
    ? menuItems.filter((item) => item.category === selectedType)
    : menuItems;

  const handleAddToSlot = (cookie) => {
    if (cookies.length < boxSize) {
      setCookies((prev) => [...prev, cookie]);
    } else {
      alert("Your box is full! Remove an item first.");
    }
  };

  const handleRemove = (index) => {
    setCookies((prev) => prev.filter((_, i) => i !== index));
  };

  const setFlavorPrices = (prices) => {
    setFlavorPrices(prices);
  };

  if (!boxSize) {
    return (
      <>
        <Navbar />
       <main className="bg-white min-h-screen w-full flex flex-col items-center">
  <div className="flex flex-col items-center w-full min-h-screen pt-10 pb-20 px-6 md:px-12 bg-gray-100">
    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 text-center">
      Choose Your Cookie Box
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
      {[1, 4, 6, 8, 10].map((size) => {
        const getTitle = () => {
          switch (size) {
            case 1:
              return "Just One Bite";
            case 4:
              return "Snack Pack";
            case 6:
              return "Half-Baked Heaven";
            case 8:
              return "Chip Happens Box";
            case 10:
              return "Total Chip Show";
            default:
              return `Box of ${size}`;
          }
        };

        const getSubtitle = () => {
          switch (size) {
            case 1:
              return "When chip really happens.";
            case 4:
              return "Four chip goes a long way.";
            case 6:
              return "Six chances to snack smarter.";
            case 8:
              return "It’s getting serious now.";
            case 10:
              return "You didn’t come to play.";
            default:
              return "";
          }
        };

        return (
          <div
  key={size}
  onClick={() => setBoxSize(size)}
  className="relative cursor-pointer rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group"
>
  {/* Background Image */}
  <img
    src={
      size === 1
        ? "https://via.placeholder.com/300?text=Single"
        : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
    }
    alt={getTitle()}
    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  />

  {/* Overlay (darker at bottom) */}
  <div className="absolute inset-0 bg-gradient-to-t from-yellow/60 via-black/20 to-transparent" />

  {/* Text Content */}
  <div className="relative z-10 flex flex-col items-center justify-end h-[220px] px-4 pb-6 text-center">
    <h4 className="text-lg font-bold text-white drop-shadow-md">
      {getTitle()}
    </h4>
    <p className="text-xs text-gray-200 mt-1">{getSubtitle()}</p>
  </div>
</div>

        );
      })}
    </div>
  </div>
</main>

      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen w-full flex flex-col">
        <FilterBar
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <section className="m-10  mr-10 -mt-5 flex flex-1 gap-6 ">
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="card bg-gray-100 h-[250px] cursor-pointer"
                onClick={() => handleAddToSlot(item)}
              >
                <figure>
                  <img
                    src={item.image || "https://via.placeholder.com/300"}
                    alt={item.name}
                    className="h-48 w-full object-cover bg-gray-50"
                  />
                </figure>
                <div className="card-body p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="card-title">{item.name}</h4>
                    <p className="text-[14px] font-semibold text-green-700 ml-2">
                      ₱{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CookieSlot
            cookies={cookies}
            maxCookies={boxSize}
            onRemove={handleRemove}
            onResetBox={() => {
              setBoxSize(null);
              setCookies([]);
            }}
          />
        </section>
      </main>
    </>
  );
}

export default MenuPage;
