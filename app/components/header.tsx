"use client";

import { useCallback } from 'react';
import Image from "next/image";
import { withBasePath } from "@/app/lib/with-base-path";

export default function Header() {
  const scrollToFooter = useCallback(() => {
    const footer = document.querySelector('#site-footer') || document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-4 sm:h-[10vh] sm:px-8">
      <a href={withBasePath("/")} className="inline-flex h-full items-center">
        <Image
          src={withBasePath("/img/logo.svg")}
          alt="Homepage"
          width={140}
          height={56}
          className="h-9 w-auto sm:h-[70%]"
          priority
        />
      </a>
      {/* <button 
        onClick={scrollToFooter}
        className="text-[#C26E4B] hover:text-[#a85e41] transition-colors text-lg font-lora"
      >
        Contact
      </button> */}
    </header>
  );
}