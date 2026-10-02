import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 left-6 z-40 p-3 rounded-2xl bg-white hover:bg-neutral-50 text-[#FF6B00] border border-[#E5E5E5] shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B00] hover:shadow-[#FF6B00]/20 cursor-pointer"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

export default ScrollToTop;
