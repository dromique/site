"use client";

import Image from "next/image";
import { withBasePath } from "@/app/lib/with-base-path";

const RETURN_ANCHOR_KEY = "home:return-anchor";
const RETURN_CARD_INDEX_KEY = "home:return-card-index";
const RETURN_MODE_KEY = "home:return-mode";

const handleCvClick = () => {
  window.sessionStorage.setItem(RETURN_MODE_KEY, "who-am-i");
  window.sessionStorage.setItem(RETURN_ANCHOR_KEY, "who-am-i");
  window.sessionStorage.removeItem(RETURN_CARD_INDEX_KEY);
};

export default function Whoami() {
  return (
    <section id="who-am-i" className="min-h-[50vh] bg-[#333333] px-6 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row md:items-start md:gap-12">
        <div className="flex-1">
          <h2 className="text-4xl text-[#C26E4B] font-lora">Wie ben ik</h2>
          <p className="mt-4 text-[#F7EDE1] font-inter text-justify leading-relaxed">
            Ik ben een student ICT & Media Design aan Fontys Hogescholen en momenteel bezig met mijn vijfde semester, waarin ik mij richt op Smart Mobile. Mijn interesse ligt in het ontwerpen en bouwen van digitale producten, van idee tot uitvoering. Ik heb daarbij een sterke interesse in front-end development en vind het leuk om interactieve en visueel aantrekkelijke user experiences te creëren. Het motiveert mij om te zien hoe een concept tot leven komt op het scherm, en ik kijk ernaar uit om mijn kennis en vaardigheden binnen dit vakgebied verder te ontwikkelen.
          </p>
          <a
            href={withBasePath("/cv")}
            onPointerDown={handleCvClick}
            className="mt-6 inline-flex items-center rounded-lg bg-[#C26E4B] px-6 py-3 font-lora text-[#F7EDE1] transition-colors hover:bg-[#a85e41]"
          >
            Bekijk mijn CV
          </a>
        </div>
        
        <div className="relative aspect-4/5 w-full max-w-[320px] overflow-hidden rounded-xl md:w-[320px] md:shrink-0">
          <Image
            src={withBasePath("/img/headshot.jpeg")}
            alt="Portretfoto"
            fill
            sizes="(min-width: 768px) 320px, 100vw"
            className="object-cover"
            loading="eager"
            priority
          />
        </div>
      </div>
    </section>
  );
} 