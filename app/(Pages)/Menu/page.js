"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { supabase } from "@/lib/supabaseClient";
import FilterBar from "@/components/filter-bar";
import CookieSlot from "@/components/cookie-slot";
import Head from "next/head";

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const [boxSize, setBoxSize] = useState(null);
  const [cookies, setCookies] = useState([]);

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

  const boxImages = {
    1: "https://images.unsplash.com/photo-1597733153203-a54d0fbc47de?q=80&w=790&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    4: "https://images.unsplash.com/photo-1598839950984-034f6dc7b495?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2llc3xlbnwwfHwwfHx8Mg%3D%3D",
    6: "https://images.unsplash.com/photo-1639678111962-88fffeb071cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvb2tpZXN8ZW58MHx8MHx8fDI%3D",
    8: "https://images.unsplash.com/photo-1557310717-d6bea9f36682?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29va2llc3xlbnwwfHwwfHx8Mg%3D%3D",
    10: "https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29va2llc3xlbnwwfHwwfHx8Mg%3D%3D",
  };

  if (!boxSize) {
    return (
      <>
        <Navbar />
        <Head>
          <title>Menu - Chip Happens</title>
          <meta
            name="description"
            content="Choose your cookie box size and start building your perfect cookie selection!"
          />
          <meta name="author" content="Chip Happens" />
        </Head>
        <main className="bg-amber-50 w-full flex flex-col items-center">
          <h2 className="text-3xl font-bold pt-6 mb-6 text-[#4B3B2A] text-center">
            Choose Your Cookie Box
          </h2>

          <div className="max-h-screen max-w-5xl grid grid-cols-2 md:grid-cols-3 gap-6 w-full overflow-y-auto">
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
                    return "Eight is great for sharing.";
                  case 10:
                    return "Ten times the chip, ten times the fun.";
                  default:
                    return "";
                }
              };

              return (
                <div
                  key={size}
                  onClick={() => setBoxSize(size)}
                  className="relative cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 group"
                >
                  <img
                    src={boxImages[size]}
                    alt={getTitle()}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#4B3B2A]/70 via-[#A47551]/30 to-transparent" />

                  <div className="relative z-10 flex flex-col items-center justify-end h-[220px] px-4 pb-6 text-center">
                    <h4 className="text-lg font-bold text-[#FFF8F0] drop-shadow-md">
                      {getTitle()}
                    </h4>
                    <p className="text-xs text-[#F1E4C3] mt-1">
                      {getSubtitle()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#ffffff] min-h-screen w-full flex flex-col">
        <div className="flex flex-col items-center">
          <div className="items-center px-6 py-4 w-full mt-2">
            <CookieSlot
              cookies={cookies}
              maxCookies={boxSize}
              onRemove={handleRemove}
              onResetBox={() => {
                setBoxSize(null);
                setCookies([]);
              }}
            />
          </div>
          <section className="pl-10 pr-10 py-5 flex flex-1 gap-6 w-full ">
            <FilterBar
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className=" card bg-[#FAF3E0] h-full sm:h-80 cursor-pointer shadow-md rounded-lg border-2 border-yellow-200 "
                  onClick={() => {
                    const isComingSoon =
                      item.image === null ||
                      item.image.includes(
                        "https://cdtmcdxrdnauwehohxkh.supabase.co/storage/v1/object/sign/images/menu_items/coming_soon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85N2VhODBjMy1hYjczLTRlMGYtYTVjZi01YWFiM2RlODFkNTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvbWVudV9pdGVtcy9jb21pbmdfc29vbi5wbmciLCJpYXQiOjE3NTc5MjM2MjIsImV4cCI6MjA3MzI4MzYyMn0.DBtQKcf1R-VLkkhmeEptYugtjYWRUcv1fl9sKh3oEh0"
                      );
                    if (!isComingSoon) {
                      handleAddToSlot(item);
                    }
                  }}
                >
                  <figure>
                    <img
                      src={
                        item.image ||
                        "https://cdtmcdxrdnauwehohxkh.supabase.co/storage/v1/object/sign/images/menu_items/coming_soon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85N2VhODBjMy1hYjczLTRlMGYtYTVjZi01YWFiM2RlODFkNTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvbWVudV9pdGVtcy9jb21pbmdfc29vbi5wbmciLCJpYXQiOjE3NTc5MjM2MjIsImV4cCI6MjA3MzI4MzYyMn0.DBtQKcf1R-VLkkhmeEptYugtjYWRUcv1fl9sKh3oEh0"
                      }
                      alt={item.name}
                      className="h-full w-full object-cover bg-gray-50 rounded-lg overflow-hidden"
                    />
                  </figure>
                  <div className="card-body p-2">
                    <div className="flex items-center justify-between">
                      <h4 className="card-title">{item.name}</h4>
                      <p className="mt-4 text-[14px] font-semibold text-green-700 ml-2">
                        ₱{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default MenuPage;
