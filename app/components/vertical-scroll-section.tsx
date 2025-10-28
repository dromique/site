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
    description:
      "Voor dit project heb ik een branding gemaakt voor Boris Schmidt. Boris studeert aan de Rockacademie. Gedurende 4 weken heb ik samen met mijn groep verschillende producten gemaakt voor Boris. Denk aan een moodboard, stylescape, logo, brandguide en content strategie.",
    buttonText: "Lees Meer",
    buttonLink: "/projects/branding",
    brandingTitle: "Boris Schmidt",
    brandingImage: "/images/card1folderinside.svg",
    fileColor: "#fff",
  },
  {
    title: "Project 2",
    subtitle: "Experience playground",
    description:
      "Voor dit project heb ik samen met mijn groepsgenoten een UX-design gemaakt voor Cardan. Cardan is een bedrijf dat zich richt op het verbeteren van de toegankelijkheid van websites.",
    buttonText: "Lees Meer",
    buttonLink: "/projects/cardan",
    brandingTitle: "Cardan",
    brandingImage: "images/Cardanlogo.svg",
    fileColor: "#333333",
  },
  {
    title: "Project 3",
    subtitle: "Pong",
    description:
      "Dit project gaat over de development van project 2: Create That UX. In dit project heb ik samen met mijn groepsgenoten gewerkt aan het coderen en ontwikkelen van de ontworpen UX uit project 2.",
    buttonText: "Lees Meer",
    buttonLink: "/projects/development",
    brandingTitle: "Project X",
    brandingImage: "images/Cardanlogo.svg",
    fileColor: "#654E6F",
  },
  // {
  //   title: "Project 4",
  //   subtitle: "Portfolio",
  //   description:
  //     "Dit project draait om mijn portfolio. Hierin beschrijf ik hoe ik tot mijn portfolio ben gekomen, wat ik ervoor heb ontworpen en hoe ik mezelf beter heb leren kennen op het gebied van mijn waarden.",
  //   buttonText: "Lees Meer",
  //   buttonLink: "/projects/portfolio",
  //   brandingTitle: "Luuk Steijaert",
  //   fileColor: "#00c951",
  // },
  // {
  //   title: "Project 5",
  //   subtitle: "Project X",
  //   description:
  //     "Bij dit project mag ik zelf een project kiezen. Ik heb gekozen na wat nadenken en bespreken samen met mijn docent om een project te maken in Blender. Ik ga de boulder grepen namelijk maken in 3D om deze te kunnen plaatsen op mijn website.",
  //   buttonText: "Lees Meer",
  //   buttonLink: "/projects/project-x",
  //   brandingTitle: "Blender",
  //   brandingImage: "images/Blenderlogo.png",
  //   fileColor: "#eb7700",
  // },
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
