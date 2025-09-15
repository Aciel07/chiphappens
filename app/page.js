"use client";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

function Homepage() {
  const items = [
    {
      id: "1e8b0462-1a8e-47e5-a259-d3cf2f2e26c8",
      name: "OG Choco Chunk",
      description:
        "Thick, chewy, and loaded with semi-sweet chocolate chunks. A classic with zero regrets.",
      image:
        "https://cdtmcdxrdnauwehohxkh.supabase.co/storage/v1/object/sign/images/menu_items/OG%20Choco%20Chunk.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85N2VhODBjMy1hYjczLTRlMGYtYTVjZi01YWFiM2RlODFkNTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvbWVudV9pdGVtcy9PRyBDaG9jbyBDaHVuay5wbmciLCJpYXQiOjE3NTc5MjM0MjYsImV4cCI6MjA3MzI4MzQyNn0.WaLy0iFg4M4EOTWbvVvPSlj0F3IygAHym5vnkQqveH0",
      type: "classic",
    },
    {
      id: "4f3ed955-9861-44b2-bc59-336ea8c484c3",
      name: "Caramel Bloom",
      description:
        "Vanilla cookie with pockets of caramel and edible flower sprinkles.",
      image:
        "https://cdtmcdxrdnauwehohxkh.supabase.co/storage/v1/object/sign/images/menu_items/Caramel%20Bloom.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85N2VhODBjMy1hYjczLTRlMGYtYTVjZi01YWFiM2RlODFkNTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvbWVudV9pdGVtcy9DYXJhbWVsIEJsb29tLnBuZyIsImlhdCI6MTc1NzkyMzQ0OCwiZXhwIjoyMDczMjgzNDQ4fQ.dR6X_vtZwn-axemHxJnsVq0CoWjFEKHR4j-L3RAqnFg",
      type: "stuffed",
    },
    {
      id: "c21f98e1-9cdd-40ea-917d-a604940eac89",
      name: "Double Trouble",
      description:
        "Chocolate dough + dark chocolate chips = dangerously delicious..",
      image:
        "https://cdtmcdxrdnauwehohxkh.supabase.co/storage/v1/object/sign/images/menu_items/Double%20Trouble.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85N2VhODBjMy1hYjczLTRlMGYtYTVjZi01YWFiM2RlODFkNTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvbWVudV9pdGVtcy9Eb3VibGUgVHJvdWJsZS5wbmciLCJpYXQiOjE3NTc5MjM0OTcsImV4cCI6MjA3MzI4MzQ5N30.CKalupsxtjeAShDNCzC7zgJAibY92YbKYmVfQgNp7UI",
      type: "fruity",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-[#ffffff] w-full text-[#4B3B2A]">
        <section className=" bg-gradient-to-r from-amber-700 via-amber-500 to-amber-200 flex-1 flex flex-row justify-items-center min-h-screen -mt-3">
          <div className="m-10 flex-1 flex flex-col items-center  w-1/2 justify-center text-center">
            <h1 className="text-4xl font-bold text-[#4B3B2A]">
              When life crumbles...
              <br /> Chip Happens.
            </h1>
            <p className="mt-4 text-lg text-[#f3f0ee] text-center">
              Life’s a mess, but our cookies don’t apologize for it.
              <br />
              Grab a handful, break the rules, and let the crumbs fall where
              they may.
            </p>
            <a
              href="#"
              className="mt-6 border border-[#F6E6A7]  text-[#4B3B2A] px-5 py-3 rounded-lg shadow hover:bg-[#E6D3B3]"
            >
              Explore our Menu
            </a>
          </div>
          <div className="w-1/2 flex-1 flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1631642034885-4f4ef938f32a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Chip Happens"
              className="w-full min-h-screen object-cover rounded-l-3xl bg-[#E6D3B3]"
            />
          </div>
        </section>

        <section
          id="services"
          className="w-full px-6 min-h-screen flex flex-col justify-center items-center"
        >
          <h1 className=" text-3xl font-bold text-[#4B3B2A]">Our Services</h1>
          <div className="flex flex-col md:flex-row gap-8 mb-10 max-w-7xl">
            {[
              {
                title: "Pre-packed Cookies",
                text: "Pre-packaged cookies for on-the-go indulgence, perfect for satisfying your sweet tooth anytime, anywhere.",
                image:
                  "https://images.unsplash.com/photo-1723990581262-bb6265db03d9?q=80&w=505&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "Daily Cookies",
                text: "Freshly baked cookies available daily at our bakery and select local cafes. Stop by for a warm treat!",
                image:
                  "https://images.unsplash.com/photo-1602198905482-0f42ad21ba2d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "Cookie Cart",
                text: "Bring the cookie magic to your next celebration! Our mobile cookie cart serves fresh-baked joy at parties, weddings, and corporate events.",
                image:
                  "https://images.unsplash.com/photo-1731867101282-fe434cf2a90d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
            ].map((item, idx) => (
              <article
                key={idx}
                className="flex-1 overflow-hidden rounded-2xl drop-shadow-xl bg-[#FFF8F0] border border-[#E6D3B3]"
              >
                <img
                  alt={item.title}
                  src={item.image}
                  className="h-60  w-full object-cover"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="p-5 bg-[#F1E4C3]">
                  <h3 className="text-xl font-semibold text-[#4B3B2A]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5C4631]">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="best-sellers"
          className="w-full  px-8 pb-16 bg-gradient-to-b from-amber-100 to-amber-200 -mt-3"
        >
          <h1 className="p-12 text-3xl font-bold text-center text-[#4B3B2A]">
            Recent Chip Happenings
          </h1>

          <div className="space-y-12 max-w-5xl mx-auto">
            {items.map((item, idx) => {
              const reverse = idx % 2 !== 0;
              const bg = idx % 2 === 0 ? "bg-[#ffffff]" : "bg-[#ffffff]";
              const imageUrl = item.image;

              return (
                <div key={item.id} className={`${bg} w-full rounded-2xl`}>
                  <div
                    className={`mx-auto flex flex-col ${
                      reverse ? "md:flex-row-reverse" : "md:flex-row"
                    } items-center p-10 md:p-14`}
                  >
                    <div
                      className={`flex-1 flex flex-col ${
                        reverse
                          ? "items-center md:items-end text-center md:text-right"
                          : "items-center md:items-start text-center md:text-left"
                      }`}
                    >
                      <h2 className="text-2xl mb-4 text-[#4B3B2A]">
                        {item.name}
                      </h2>
                      <p className="text-[#4f4f4e] max-w-sm ">
                        {item.description}
                      </p>
                    </div>

                    <div
                      className={`flex-1 flex justify-center pt-8 md:pt-0 ${
                        reverse ? "md:justify-start" : "md:justify-end"
                      }`}
                    >
                      <motion.img
                        src={imageUrl}
                        alt={item.name}
                        className="w-60 h-60 md:w-80 md:h-80 object-cover rounded-full bg-[#E6D3B3]"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        animate={{
                          y: [0, -20, 0, 20, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Homepage;
