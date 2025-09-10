import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
function homepage() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen w-full flex flex-col">
        <section className="bg-amber-50 flex-1 flex flex-row justify-items-center min-h-screen">
          <div className="m-10 flex-1 flex flex-col justify-center items-start">
            <h1 className="text-3xl font-bold">
              When life crumbles... Chip Happens.
            </h1>
            <p className="mt-2">
              Life’s too short for boring cookies.
              <br />
              At Chip Happens, we believe every bite should be bold, gooey, and
              unforgettable.
            </p>
            <a href="#" className="mt-4 bg-yellow-200 p-2 hover:underline">
              Explore the menu
            </a>
          </div>
          <div className="w-1/2  flex-1 flex justify-center items-center">
            <img
              src="/chip-placeholder.png"
              alt="Chip Happens"
              className="w-full h-screen bg-gray-200 object-cover"
            />
          </div>
        </section>

        <section
          id="services"
          className="w-full px-4 md:px-10 mt-40 min-h-screen"
        >
          <h1 className="text-3xl font-bold pb-3 text-center">What We Offer</h1>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 max-w-7xl mx-auto">
            {[
              {
                title: "Pre-packed Cookies",
                text: "Pre-packaged cookies for on-the-go indulgence, perfect for satisfying your sweet tooth anytime, anywhere.",
                image:
                  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
              },
              {
                title: "Daily Cookies",
                text: "Freshly baked cookies available daily at our bakery and select local cafes. Stop by for a warm treat!",
                image:
                  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
              },
              {
                title: "Cookie Cart",
                text: "Bring the cookie magic to your next celebration! Our mobile cookie cart serves fresh-baked joy at parties, weddings, and corporate events.",
                image:
                  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
              },
            ].map((item, idx) => (
              <article
                key={idx}
                className="flex-1 overflow-hidden rounded-xl shadow-lg transition hover:shadow-xl bg-white"
              >
                <img
                  alt={item.title}
                  src={item.image}
                  className="h-48 md:h-60 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="w-full px-8 ">
          <h1 className="text-3xl font-bold text-center pb-12">
            Recent Chip Happenings
          </h1>

          <div className="space-y-12">
            {[
              {
                title: "Freshly Baked Cookies",
                text: "Our cookies are baked fresh daily with the finest ingredients for a gooey, unforgettable experience.",
                image: "/chip-placeholder.png",
                bg: "bg-amber-50",
                reverse: false,
              },
              {
                title: "Unique Flavors",
                text: "Discover a rotating menu of bold, creative flavors you won’t find anywhere else.",
                image: "/chip-placeholder.png",
                bg: "bg-white",
                reverse: true,
              },
              {
                title: "Cookie Cart",
                text: "Bring the cookie magic to your next celebration! Our mobile cookie cart serves fresh-baked joy at parties, weddings, and corporate events.",
                image: "/chip-placeholder.png",
                bg: "bg-amber-50",
                reverse: false,
              },
            ].map((item, idx) => (
              <div key={idx} className={`${item.bg} w-full rounded-xl`}>
                <div
                  className={`max-w-7xl mx-auto flex flex-col ${
                    item.reverse ? "md:flex-row-reverse" : "md:flex-row"
                  } items-center p-8 md:p-12`}
                >
                  {/* Text Content */}
                  <div
                    className={`flex-1 flex flex-col ${
                      item.reverse
                        ? "items-center md:items-end text-center md:text-right"
                        : "items-center md:items-start text-center md:text-left"
                    }`}
                  >
                    <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                    <p className="text-gray-700">{item.text}</p>
                    <a
                      href="#"
                      className="mt-6 bg-yellow-200 px-4 py-2 rounded-md font-medium hover:underline"
                    >
                      Explore the menu
                    </a>
                  </div>

                  {/* Image */}
                  <div
                    className={`flex-1 flex justify-center pt-8 md:pt-0 ${
                      item.reverse ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full bg-gray-200"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default homepage;
