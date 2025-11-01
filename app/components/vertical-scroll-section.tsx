"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardStack from "./cardStack";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Project 1",
    subtitle: "Brand guide",
    description: "Description of the project goes here.",
    buttonText: "Lees Meer",
    buttonLink: "/project1",
    brandingTitle: "Boris Schmidt",
    brandingImage: "#",
    fileColor: "#fff",
  },
  {
    title: "Project 2",
    subtitle: "Experience playground",
    description: "Description of the project goes here.",
    buttonText: "Lees Meer",
    buttonLink: "/project2",
    brandingTitle: "Cardan",
    brandingImage: "#",
    fileColor: "#333333",
  },
  {
    title: "Project 3",
    subtitle: "Pong",
    description: "Description of the project goes here.",
    buttonText: "Lees Meer",
    buttonLink: "/project3",
    brandingTitle: "Project X",
    brandingImage: "#",
    fileColor: "#654E6F",
  },
];

export default function VerticalScrollSection() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = scrollSectionRef.current;
    if (!section) return console.error("scrollSection ref not assigned.");

    const wrapper = section.querySelector(".wrapper");
    if (!wrapper) return console.error("No .wrapper found.");

    const items = wrapper.querySelectorAll(".item");
    if (!items.length) return console.warn("No .item elements found.");

    // Initial position setup
    items.forEach((item, i) => {
      if (i !== 0) gsap.set(item, { yPercent: 100 });
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: () => `+=${(items.length - 1) * 100}%`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
      defaults: { ease: "none" },
    });

    items.forEach((item, index) => {
      timeline.to(item, { scale: 0.9, borderRadius: "10px" });
      if (items[index + 1]) {
        timeline.to(
          items[index + 1],
          { yPercent: 0 },
          "<" // sync start
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      timeline.kill();
    };
  }, []);

  return (
    <div
      className="scroll-section vertical-section h-screen bg-[#F7EDE1]"
      ref={scrollSectionRef}
    >
      <div className="wrapper relative w-full h-full overflow-hidden">
        {cards.map((card, index) => (
          <div
            key={index}
            className="item absolute inset-0 flex justify-center items-center"
          >
            <CardStack
              title={card.title}
              subtitle={card.subtitle}
              description={card.description}
              buttonText={card.buttonText}
              buttonLink={card.buttonLink}
              brandingTitle={card.brandingTitle}
              brandingImage={card.brandingImage}
              fileColor={card.fileColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
