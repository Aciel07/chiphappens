"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Wrench, Truck, FlaskConical, Globe2, Trophy } from "lucide-react";
import { motion } from "framer-motion";

function AboutPage() {
  const milestones = [
    {
      year: "2021",
      title: "Baking Beginnings",
      description:
        "During the pandemic lockdowns, creativity became a lifeline. Our founder, stuck at home and restless, turned to baking—starting with cheesecakes, banana bread, and muffins. But one day, she made cookies… and everything changed.",
      icon: Wrench,
    },
    {
      year: "2022",
      title: "Trials and Triumphs",
      description:
        "Burned out, heartbroken, and teetering on the edge, she found solace in the kitchen. Baking became therapy—messy, imperfect, and healing. From undercooked disasters to overbaked flops, every failure fueled her fire.",
      icon: Truck,
    },
    {
      year: "2022",
      title: "The Flavor Lab",
      description:
        "She started experimenting like a rebel with a whisk. Sea salt, lavender, chili—no combo was too wild. Some batches were magic, others were trash, but each one brought her closer to the signature Chip Happens flavor.",
      icon: FlaskConical,
    },
    {
      year: "2022",
      title: "Family and Friends",
      description:
        "The cookies started as comfort, but quickly became obsession. Friends begged for more, neighbors lined up, and word spread fast. What began as a coping mechanism turned into a local legend.",
      icon: Globe2,
    },
    {
      year: "2023",
      title: "The Cookie Cult",
      description:
        "Chip Happens became more than a cookie—it became a movement. A celebration of flavor, flaws, and finding joy in the mess. We don’t chase perfection. We embrace the crumble.",
      icon: Trophy,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-amber-50 min-h-screen w-full flex flex-col">
        <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-200 text-amber-900">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
            🍪 About Us: The Story of Chip Happens
          </h1>
          <p className="max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-[#f3f0ee]">
            Our founder was unraveling—burnt out, heartbroken, and teetering on
            the edge of a breakdown. With nothing but silence and a half-stocked
            pantry, she grabbed the flour and started baking, just to feel
            something. The cookies came out lumpy, gooey, and wildly uneven—but
            they were insanely good. Friends devoured them. And someone
            muttered,
            <span className="font-semibold text-amber-700">
              "Well… chip happens."
            </span>
            <br /> That phrase stuck. So did the cookies. What began as a coping
            mechanism turned into a delicious rebellion against perfection. Chip
            Happens became a rally cry—for flavor, flaws, and finding joy in the
            mess.
          </p>
        </section>

        <section className="w-full mx-auto px-6 py-16">
          <div className="relative ">
            <div className="before:absolute before:top-0 before:left-1/2 before:w-1 before:h-full before:bg-amber-600/40 before:-translate-x-1/2 hidden md:block" />
            {milestones.map((m, i) => {
              const Icon = m.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`mb-12 w-full flex flex-col md:flex-row ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-start md:items-center`}
                >
                  {/* Content card */}
                  <div
                    className={`md:w-1/2 flex ${
                      isEven ? "justify-end md:pr-6" : "justify-start md:pl-6"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all max-w-xs sm:max-w-lg w-full border border-amber-200">
                      <h3 className="text-xl font-semibold text-amber-900 flex items-center gap-2">
                        <Icon className="w-6 h-6 text-amber-700" /> {m.year}:{" "}
                        {m.title}
                      </h3>
                      <p className="mt-2 text-amber-900/80 text-sm md:text-base leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="relative w-12 h-12 bg-amber-300 rounded-full border-4 border-amber-50 shadow-lg -translate-y-5 md:-translate-y-0 flex items-center justify-center"
                  >
                    <Icon className="w-6 h-6 text-amber-900" />
                  </motion.div>

                  <div className="md:w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="bg-gradient-to-b from-amber-100 to-amber-200 px-6 py-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-900 mb-6">
            💬 Why We Bake
          </h2>
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-amber-900/90 leading-relaxed">
            We believe cookies should be bold, imperfect, and unforgettable. We
            don't chase perfection—we chase flavor. Every batch is a little
            different, and that's exactly how we like it.
            <br />
            <br />
            So if your cookie crumbles, melts, or explodes with chips… just
            smile. Because at Chip Happens,{" "}
            <span className="font-semibold text-amber-700">
              that's kind of the point.
            </span>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default AboutPage;
