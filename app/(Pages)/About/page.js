"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

function AboutPage() {
  const milestones = [
    {
      year: "2018",
      title: "The First Batch Goes Public",
      description:
        "Jamie started selling cookies at a local flea market under a hand-painted sign that read Chip Happens. The cookies were unapologetically chunky, loaded with flavor, and never perfectly round. People loved the imperfection—it felt real.",
      emoji: "🛠️",
    },
    {
      year: "2019",
      title: "From Kitchen to Café",
      description:
        "With demand growing, Jamie partnered with a local café to stock the cookies. They sold out daily. The brand’s motto became: “Life’s messy. Cookies should be too.”",
      emoji: "🚚",
    },
    {
      year: "2020",
      title: "The Flavor Lab",
      description:
        "We opened our first test kitchen, where we experimented with wild combos—like sea salt caramel pretzel, matcha white chip, and even a spicy cayenne dark chocolate. Some were hits. Some were disasters. But hey… chip happens.",
      emoji: "🧪",
    },
    {
      year: "2022",
      title: "Nationwide Crumbs",
      description:
        "We launched our online store and started shipping across the country. Our cookies arrived in eco-friendly boxes with cheeky messages like “Open at your own crumb risk.”",
      emoji: "🌍",
    },
    {
      year: "2024",
      title: "The Cookie Cult",
      description:
        "By now, Chip Happens had become more than a cookie—it was a movement. A celebration of flavor, flaws, and the joy of unexpected bites. We were featured in foodie blogs, snack awards, and even a late-night talk show where a celebrity called us “the cookie equivalent of a warm hug and a surprise party.”",
      emoji: "🏆",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen w-full flex flex-col">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-16 bg-amber-50">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🍪 About Us: The Story of Chip Happens
          </h1>
          <p className="max-w-3xl text-gray-700 text-lg leading-relaxed">
            In the beginning, there was flour. And chaos.
            <br />
            Back in 2017, in a tiny apartment kitchen in Brooklyn, our founder
            Jamie “Chip” Harper accidentally dropped an entire bag of chocolate
            chips into a batch of dough. The cookies came out lumpy, gooey, and
            wildly uneven—but they were insanely good. Friends devoured them.
            Neighbors begged for more. And someone muttered, “Well… chip
            happens.”
            <br />
            That phrase stuck. So did the cookies.
          </p>
        </section>

        {/* Timeline */}
        <section className="w-full mx-auto px-6 py-16">
          <div className="relative before:absolute before:top-0 before:left-1/2 before:w-1 before:h-full before:bg-gray-200 before:-translate-x-1/2">
            {milestones.map((m, i) => (
              <div
                key={i}
                className={`mb-10 w-full flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-start md:items-center`}
              >
                <div className="md:w-1/2 flex justify-center md:justify-end md:pr-6">
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all max-w-sm w-full">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <span className="text-2xl">{m.emoji}</span> {m.year}:{" "}
                      {m.title}
                    </h3>
                    <p className="mt-2 text-gray-700 text-sm md:text-base leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
                <div className="relative w-10 h-10 bg-amber-200 rounded-full border-4 border-white shadow-md -translate-y-5 md:-translate-y-0 flex items-center justify-center text-lg text-gray-800">
                  {m.emoji}
                </div>
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Why We Bake */}
        <section className="bg-amber-100 px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            💬 Why We Bake
          </h2>
          <p className="max-w-3xl mx-auto text-gray-800 leading-relaxed">
            We believe cookies should be bold, imperfect, and unforgettable. We
            don’t chase perfection—we chase flavor. Every batch is a little
            different, and that’s exactly how we like it.
            <br />
            So if your cookie crumbles, melts, or explodes with chips… just
            smile. Because at Chip Happens, that’s kind of the point.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default AboutPage;
