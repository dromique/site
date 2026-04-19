"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardStack from "./cardStack";

gsap.registerPlugin(ScrollTrigger);

const cards = [
          {
    title: "Mystery project",
    subtitle: "R3F - Semester 4",
    description: "Een opkomend project waar ik gebruik maak van R3F.",
    buttonText: "Coming soon",
    buttonLink: "#",
    brandingImage: "/img/projectCoverImages/r3fS4.png",
    fileColor: "#fff",
  },
        {
    title: "Flight Of The Silverbird",
    subtitle: "Interactive visuals - Semester 4",
    description: "Een huidig project waarbij ik in groepsverband interactieve visuals maak voor het opkomende optreden van Harmonie L'Union Fraternelle, met behulp van DaVinci Resolve en Vertex.",
    buttonText: "Kom naar het optreden op 31 mei",
    buttonLink: "https://www.deschalm.com/nl/programma/harmonie-slagwerkgroep-l-union-fraternelle-j3ts",
    brandingImage: "/img/projectCoverImages/flightOfTheSilverbirdS4.png",
    fileColor: "#fff",
  },
        {
    title: "Calyx Media",
    subtitle: "Brand guide - Semester 4",
    description: "Samen met vier andere studenten heb ik een brand guide gemaakt voor Calyx Media, een media agency die wij hebben opgericht als onderdeel van onze opleiding. Ik heb mij voornamelijk gericht op het onderzoeken en onderbouwen van het merk.",
    buttonText: "Ontdek Calyx Media",
    buttonLink: "/brandguideS4",
    brandingImage: "/img/projectCoverImages/brandguideS4.png",
    fileColor: "#fff",
  },
      {
    title: "Tamafishy",
    subtitle: "Flipdot display - Semester 3",
    description: "Een Tamagotchi gemaakt in groepsverband voor een flipdot display. Tamafishy is gemaakt om de werknemers in het kantoor van OWOW te stimuleren om taken te voltooien op een interactieve manier.",
    buttonText: "Zeg hallo tegen Tamafishy",
    buttonLink: "#",
    brandingImage: "/img/projectCoverImages/tamafishyS3.png",
    fileColor: "#fff",
  },
    {
    title: "City at night",
    subtitle: "School portfolio - Semester 2",
    description: "Een portfolio om bewijsstukken te leveren voor school. Ik heb gekozen voor het thema 'City at night' omdat ik de sfeer van een stad 's nachts  sereen vind en dit aansluit bij mij als persoon. Op deze manier kan ik een school portfolio maken dat ook echt iets over mij vertelt.",
    buttonText: "Bekijk Portfolio",
    buttonLink: "https://i538263.hera.fontysict.net/portfolio/",
    brandingImage: "/img/projectCoverImages/portfolioS2.png",
    fileColor: "#fff",
  },
  {
    title: "Pong",
    subtitle: "Project X - Semester 2",
    description: "Als project X heb ik een astetische versie van Pong gemaakt. Ik wilde meer ervaring met JavaScript en daarnaast vond ik het leuk om een klassiek spel een nieuwe look te geven.",
    buttonText: "Speel Pong",
    buttonLink: "https://i538263.hera.fontysict.net/pong/",
    brandingImage: "/img/projectCoverImages/pongS2.png",
    fileColor: "#fff",
  },
  {
    title: "Verfwereld",
    subtitle: "Experience playground - Semester 2",
    description: "Voor stakeholder Cardan heb ik in groepsverband een experience playground gemaakt, genaamd Verfwereld. Waar de gebruiker met filters een simulatie kan starten waarin naarvoren komt hoe een gebruikers onvriendelijke website wordt ervaren door mensen met een visuele beperking.",
    buttonText: "Ervaar Verfwereld",
    buttonLink: "https://i538263.hera.fontysict.net/cardan-dev/",
    brandingImage: "/img/projectCoverImages/verfwereldS2.png",
    fileColor: "#333333",
  },
  {
    title: "Boris Schmidt",
    subtitle: "Brand guide - Semester 2",
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
      className="scroll-section vertical-section min-h-[100svh] bg-[#F7EDE1]"
      ref={scrollSectionRef}
    >
      <div className="wrapper relative h-full min-h-[100svh] w-full overflow-hidden">
        {cards.map((card, index) => (
          <div
            key={index}
            className="item absolute inset-0 flex items-center justify-center px-4 py-20 sm:px-6 md:px-8"
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
