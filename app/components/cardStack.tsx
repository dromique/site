"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { withBasePath } from "@/app/lib/with-base-path";

interface CardStackProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  returnCardIndex?: number;
  brandingTitle?: string;
  brandingImage?: string;
  fileColor?: string;
}

const CardStack: React.FC<CardStackProps> = ({
  title = "Project 1",
  subtitle = "Boris Schmidt",
  description = "Description of the project goes here.",
  buttonText = "Lees Meer",
  buttonLink = "/project1",
  returnCardIndex,
  brandingTitle = "",
  brandingImage,
}) => {
  const opensInNewTab = /^https?:\/\//i.test(buttonLink);
  const isBrandGuideLink = /^\/brandguide/i.test(buttonLink);

  const handleCardClick = () => {
    if (!isBrandGuideLink || typeof returnCardIndex !== "number") return;
    window.sessionStorage.setItem("home:return-mode", "card");
    window.sessionStorage.setItem("home:return-card-index", String(returnCardIndex));
    window.sessionStorage.removeItem("home:return-anchor");
  };

  return (
    <div className="mx-auto flex h-[90svh] w-full max-w-7xl flex-col gap-3 overflow-y-auto rounded-2xl bg-[#333333] p-4 sm:h-176 sm:gap-6 sm:p-6 md:h-128 md:flex-row md:overflow-hidden md:p-10">
      {/* Left Side */}
      <div className="flex min-h-0 min-w-0 flex-[1.45] flex-col gap-4 md:h-full">
        <h1 className="max-w-full wrap-break-word font-lora text-2xl text-[#C26E4B] sm:text-4xl md:text-5xl">{title}</h1>
        <h2 className="wrap-break-word font-lora text-lg text-[#C26E4B] sm:text-2xl md:text-[1.85rem]">
          {subtitle}
        </h2>
        <p className="min-h-0 flex-1 text-[0.82rem] leading-relaxed text-[#F7EDE1] font-inter sm:text-base md:text-lg lg:text-xl">
          {description}
        </p>
        <Link
          href={buttonLink}
          onPointerDown={handleCardClick}
          onClick={handleCardClick}
          target={opensInNewTab ? "_blank" : undefined}
          rel={opensInNewTab ? "noopener noreferrer" : undefined}
          className="mt-auto inline-flex w-full max-w-full items-center justify-center rounded-lg bg-[#C26E4B] px-4 py-3 text-center font-lora text-sm leading-tight text-[#F7EDE1] transition-colors hover:bg-[#a85e41] sm:w-fit sm:px-5 sm:text-base"
        >
          {buttonText}
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex min-h-0 min-w-0 flex-[1.15] flex-col gap-4 md:h-full">
        <h1 className="wrap-break-word font-lora text-2xl text-[#C26E4B] sm:text-3xl md:text-4xl">
          {brandingTitle}
        </h1>
        <div className="flex min-h-0 flex-1 w-full items-center justify-center">
          {brandingImage && brandingImage !== "#" ? (
            <Image
              src={withBasePath(brandingImage)}
              alt={`${title} branding image`}
              width={480}
              height={280}
              className="h-auto max-h-[23svh] w-full max-w-[230px] rounded-lg object-contain sm:max-h-none sm:max-w-[360px] md:max-w-[340px] lg:max-w-[420px]"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardStack;