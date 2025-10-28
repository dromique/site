"use client";

import { useCallback } from 'react';

export default function Header() {
  const scrollToFooter = useCallback(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 h-[10vh] z-50">
      <h2 className="text-[40px] text-[#C26E4B] font-lora">DVW</h2>
      <button 
        onClick={scrollToFooter}
        className="text-[#C26E4B] hover:text-[#a85e41] transition-colors text-lg font-lora"
      >
        Contact
      </button>
    </header>
  );
}