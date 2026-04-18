"use client";

import { useCallback } from 'react';
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const scrollToFooter = useCallback(() => {
    const footer = document.querySelector('#site-footer') || document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 h-[10vh] z-50">
      <Link href="/" className="inline-flex h-full items-center">
        <Image
          src="/img/logo.svg"
          alt="Homepage"
          width={140}
          height={56}
          className="h-[70%] w-auto"
          priority
        />
      </Link>
      {/* <button 
        onClick={scrollToFooter}
        className="text-[#C26E4B] hover:text-[#a85e41] transition-colors text-lg font-lora"
      >
        Contact
      </button> */}
    </header>
  );
}