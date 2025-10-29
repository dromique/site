"use client";

import Link from "next/link";
import React from "react";

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
  description = "Voor dit project heb ik een branding gemaakt voor Boris Schmidt...",
  buttonText = "Lees Meer",
  buttonLink = "/",
  brandingTitle = "Branding",
}) => {
  return (
    <div className="w-full max-w-7xl h-[450px] justify-center flex flex-col md:flex-row bg-[#333333] rounded-2xl p-6 md:p-10 mx-auto gap-8">
      {/* Left Side /}
      <div className="flex-1 flex flex-col gap-4 min-w-[300px]">
        <h1 className="font-lora md:text-5xl text-4xl w-max text-[#C26E4B]">{title}</h1>
        <h2 className="font-lora text-2xl text-[#C26E4B]">{subtitle}</h2>
        <p className="text-[#F7EDE1] text-base md:text-lg mb-6 leading-relaxed font-inter">
          {description}
        </p>
        <Link
          href={buttonLink}
          className="bg-[#C26E4B] text-[#F7EDE1] cursor-pointer rounded-lg text-xl font-lora flex justify-center items-center w-max px-10 py-3 mt-auto hover:bg-[#a85e41] transition-colors"
        >
          {buttonText}
        </Link>
      </div>

      {/ Right Side */}
      <div className="flex flex-col gap-4 basis-1/2 min-w-[320px]">
        <h1 className="md:text-5xl sm:text-4xl text-3xl font-lora wrap-break-word min-w-[250px] md:min-w-[320px] text-[#C26E4B]">
          {brandingTitle}
        </h1>
        <div className="w-full flex justify-center items-center"></div>
      </div>
    </div>
  );
};

export default CardStack;