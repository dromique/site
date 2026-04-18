"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardStack from "./cardStack";

gsap.registerPlugin(ScrollTrigger);

const cards = [
        {
    title: "Flight Of The Silverbird",
    subtitle: "Interactive visuals",
    description: "Een huidig project waarbij ik in groepsverband interactieve visuals maak voor het opkomende optreden van Harmonie L'Union Fraternelle. De visuals worden gemaakt met DaVinci Resolve en Vertex",
    buttonText: "Coming soon",
    buttonLink: "#",
    brandingImage: "/img/projectCoverImages/tamafishyS3.png",
    fileColor: "#fff",
  },
        {
    title: "Calyx Media",
    subtitle: "Brand guide",
description: "Samen met vier andere studenten hebben wij een brand guide gemaakt voor Calyx Media, een media agency dat wij hebben opgericht als onderdeel van onze opleiding.",
    buttonText: "Wat is Calyx Media?",
    buttonLink: "#",
    brandingImage: "/img/projectCoverImages/tamafishyS3.png",
    fileColor: "#fff",
  },
      {
    title: "Tamafishy",
    subtitle: "Flipdot display",
    description: "Een Tamagotchi gemaakt voor een flipdot display. Tamafishy is gemaakt om de werknemers in het kantoor van OWOW te stimuleren om taken te voltooien op een interactieve manier.",
    buttonText: "Zeg hallo tegen Tamafishy",
    buttonLink: "#",
    brandingImage: "/img/projectCoverImages/tamafishyS3.png",
    fileColor: "#fff",
  },
    {
    title: "City at night",
    subtitle: "School portfolio",
    description: "Een portfolio om bewijsstukken te leveren voor school, gemaakt voor mijn 2e semester.",
    buttonText: "Bekijk Portfolio",
    buttonLink: "https://i538263.hera.fontysict.net/portfolio/",
    brandingImage: "/img/projectCoverImages/portfolioS2.png",
    fileColor: "#fff",
  },
  {
    title: "Pong",
    subtitle: "Project X",
    description: "Als project X in semester 2 heb ik een astetische versie van Pong gemaakt.",
    buttonText: "Speel Pong",
    buttonLink: "https://i538263.hera.fontysict.net/pong/",
    brandingImage: "/img/projectCoverImages/pongS2.png",
    fileColor: "#fff",
  },
  {
    title: "Verfwereld",
    subtitle: "Experience playground",
    description: "Voor stakeholder Cardan heb ik in groepsverband een experience playground gemaakt, genaamd Verfwereld. Waar de gebruiker met filters een simulatie kan starten waarin naarvoren komt hoe een gebruikers onvriendelijke website is voor mensen met een visuele beperking.",
    buttonText: "Ervaar Verfwereld",
    buttonLink: "https://i538263.hera.fontysict.net/cardan-dev/",
    brandingImage: "/img/projectCoverImages/verfwereldS2.png",
    fileColor: "#333333",
  },
  {
    title: "Brand guide",
    subtitle: "Boris Schmidt",
    description: "Een brand guide gemaakt in groepsverband voor de artiest Boris Schmidt.",
    buttonText: "Bekijk Brand Guide",
    buttonLink: "/brandguideS2",
    brandingImage: "/img/projectCoverImages/brandguideS2.png",
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
              // brandingTitle={card.brandingTitle}
              brandingImage={card.brandingImage}
              fileColor={card.fileColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
