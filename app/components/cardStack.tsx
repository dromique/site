"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

interface CardStackProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
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
  brandingTitle = "",
  brandingImage,
}) => {
  return (
    <div className="mx-auto flex h-184 w-full max-w-7xl flex-col gap-6 overflow-hidden rounded-2xl bg-[#333333] p-5 sm:h-176 sm:p-6 md:h-128 md:flex-row md:p-10">
      {/* Left Side */}
      <div className="flex min-h-0 min-w-0 flex-[1.45] flex-col gap-4 md:h-full">
        <h1 className="max-w-full wrap-break-word font-lora text-3xl text-[#C26E4B] sm:text-4xl md:text-5xl">{title}</h1>
        <h2 className="wrap-break-word font-lora text-xl text-[#C26E4B] sm:text-2xl md:text-[1.85rem]">
          {subtitle}
        </h2>
        <p className="min-h-0 flex-1 text-sm leading-relaxed text-[#F7EDE1] font-inter sm:text-base md:text-lg lg:text-xl">
          {description}
        </p>
        <Link
          href={buttonLink}
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
              src={brandingImage}
              alt={`${title} branding image`}
              width={480}
              height={280}
              className="h-auto w-full max-w-[320px] rounded-lg object-contain sm:max-w-[360px] md:max-w-[340px] lg:max-w-[420px]"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardStack;