"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardStack from "./cardStack";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const RETURN_CARD_INDEX_KEY = "home:return-card-index";
const RETURN_ANCHOR_KEY = "home:return-anchor";
const RETURN_MODE_KEY = "home:return-mode";
const RETURN_APPLIED_KEY = "home:return-applied";

const cards = [
  {
    title: "Mystery project",
    subtitle: "R3F - Semester 4",
    description: "Een opkomend project waarbij ik gebruik maak van R3F.",
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
    buttonLink: "https://i538263.hera.fontysict.net/s3/tamafishy/",
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
    description: "Als project X heb ik een esthetische versie van Pong gemaakt. Ik wilde meer ervaring met JavaScript en daarnaast vond ik het leuk om een klassiek spel een nieuwe look te geven.",
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
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

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
      if (items[index + 1]) {
        timeline.to(item, { scale: 0.9, borderRadius: "10px" });
        timeline.to(
          items[index + 1],
          { yPercent: 0 },
          "<" // sync start
        );
      }
    });

    const restoreWhoAmI = () => {
      const returnMode = window.sessionStorage.getItem(RETURN_MODE_KEY);
      if (returnMode !== "who-am-i") return false;

      const savedAnchor = window.sessionStorage.getItem(RETURN_ANCHOR_KEY);
      if (savedAnchor !== "who-am-i") return false;

      window.sessionStorage.removeItem(RETURN_MODE_KEY);
      window.sessionStorage.removeItem(RETURN_ANCHOR_KEY);
      window.sessionStorage.removeItem(RETURN_CARD_INDEX_KEY);
      window.sessionStorage.setItem(RETURN_APPLIED_KEY, "1");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const whoAmISection = document.getElementById("who-am-i");
          if (!whoAmISection) return;

          const offsetTop = whoAmISection.getBoundingClientRect().top + window.scrollY - 16;
          window.scrollTo({
            top: Math.max(0, offsetTop),
            behavior: "auto",
          });
          ScrollTrigger.refresh();
        });
      });

      return true;
    };

    const restoreSavedCardIndex = () => {
      const returnMode = window.sessionStorage.getItem(RETURN_MODE_KEY);
      if (returnMode !== "card") return false;

      const rawIndex = window.sessionStorage.getItem(RETURN_CARD_INDEX_KEY);
      const savedIndex = rawIndex === null ? NaN : Number(rawIndex);
      if (!Number.isInteger(savedIndex) || savedIndex < 0 || savedIndex >= items.length) {
        window.sessionStorage.removeItem(RETURN_MODE_KEY);
        return false;
      }

      window.sessionStorage.removeItem(RETURN_MODE_KEY);
      window.sessionStorage.removeItem(RETURN_CARD_INDEX_KEY);
      window.sessionStorage.setItem(RETURN_APPLIED_KEY, "1");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          const sectionTrigger = ScrollTrigger.getAll().find((trigger) => trigger.trigger === section);

          let targetTop = sectionTop;
          if (sectionTrigger && items.length > 1) {
            const progress = savedIndex / (items.length - 1);
            targetTop = sectionTrigger.start + (sectionTrigger.end - sectionTrigger.start) * progress;
          } else {
            const stepHeight = section.clientHeight || window.innerHeight;
            targetTop = sectionTop + savedIndex * stepHeight;
          }

          window.scrollTo({
            top: targetTop,
            behavior: "auto",
          });
          ScrollTrigger.refresh();
        });
      });

      return true;
    };

    const clearReturnState = () => {
      window.sessionStorage.removeItem(RETURN_MODE_KEY);
      window.sessionStorage.removeItem(RETURN_ANCHOR_KEY);
      window.sessionStorage.removeItem(RETURN_CARD_INDEX_KEY);
      window.sessionStorage.removeItem(RETURN_APPLIED_KEY);
    };

    const scrollToTop = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "auto" });
          ScrollTrigger.refresh();
        });
      });
    };

    const handlePageShow = () => {
      if (restoreWhoAmI()) return;
      if (restoreSavedCardIndex()) return;
      const restoreWasApplied = window.sessionStorage.getItem(RETURN_APPLIED_KEY) === "1";
      if (restoreWasApplied) {
        window.sessionStorage.removeItem(RETURN_APPLIED_KEY);
        return;
      }
      clearReturnState();
      scrollToTop();
    };
    window.addEventListener("pageshow", handlePageShow);

    const cleanup = () => {
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener("pageshow", handlePageShow);
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };

    if (restoreWhoAmI()) {
      return cleanup;
    }

    if (!restoreSavedCardIndex()) {
      const restoreWasApplied = window.sessionStorage.getItem(RETURN_APPLIED_KEY) === "1";
      if (restoreWasApplied) {
        window.sessionStorage.removeItem(RETURN_APPLIED_KEY);
      } else {
        clearReturnState();
        scrollToTop();
      }
    }

    return cleanup;
  }, []);

  return (
    <div
      className="scroll-section vertical-section h-lvh overflow-hidden bg-[#F7EDE1]"
      ref={scrollSectionRef}
    >
      <div className="wrapper relative h-full w-full overflow-hidden bg-[#F7EDE1]">
        {cards.map((card, index) => (
          <div
            key={index}
            className="item absolute inset-0 flex items-center justify-center px-3 py-2 sm:px-6 sm:py-10 md:px-8 pointer-events-none"
          >
            <CardStack
              title={card.title}
              subtitle={card.subtitle}
              description={card.description}
              buttonText={card.buttonText}
              buttonLink={card.buttonLink}
              returnCardIndex={index}
              brandingImage={card.brandingImage}
              fileColor={card.fileColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
}