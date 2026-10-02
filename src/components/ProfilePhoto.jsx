import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * ProfilePhoto component
 * Displays Mahir Arman Suvro's real professional photograph.
 * White (#FAFAFA) + Black (#0A0A0A) + Cards (#F3F3F3) + Signature Orange (#FF6B00) styling.
 */
export function ProfilePhoto({ className = '', size = 'lg', priority = false }) {
  const { developerInfo } = usePortfolio();
  const activeImage = developerInfo?.profileImage || '/profile.jpg';

  const [srcAttempt, setSrcAttempt] = useState(activeImage);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
    setSrcAttempt(developerInfo?.profileImage || '/profile.jpg');
  }, [developerInfo?.profileImage]);

  const handleImageError = () => {
    setImageError(true);
  };

  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28',
    md: 'w-48 h-48 sm:w-56 sm:h-56',
    lg: 'w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96',
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Background subtle orange glow */}
      <div 
        className="absolute -inset-1.5 bg-gradient-to-r from-[#FF6B00]/20 to-[#FF8533]/10 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition duration-500"
        aria-hidden="true"
      />

      {/* Outer frame */}
      <div className={`relative ${sizeClasses[size] || sizeClasses.lg} rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-br from-[#FF6B00]/50 via-[#E5E5E5] to-[#D4D4D4] shadow-lg transition-transform duration-500 group-hover:scale-[1.01]`}>
        <div className="w-full h-full rounded-[14px] sm:rounded-[22px] overflow-hidden bg-[#F3F3F3] flex items-center justify-center relative border border-[#E5E5E5]">
          {!imageError ? (
            <img
              src={srcAttempt}
              alt={`${developerInfo?.name || 'Mahir Arman Suvro'} - Full-Stack Web Developer`}
              loading={priority ? 'eager' : 'lazy'}
              onError={handleImageError}
              className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
            />
          ) : (
            /* Fallback developer avatar badge */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F3F3F3] relative overflow-hidden">
              <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-[#E5E5E5] flex items-center justify-center mb-3 shadow-xs">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-wider text-[#0A0A0A]">
                  {developerInfo?.initials || 'MAS'}
                  <span className="text-[#FF6B00]">.</span>
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="text-lg font-bold text-[#0A0A0A] tracking-tight">
                  {developerInfo?.name || 'Mahir Arman Suvro'}
                </h3>
                <p className="text-xs text-[#FF6B00] font-mono mt-0.5">
                  {developerInfo?.title || 'Full-Stack Developer'}
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-emerald-500/30 text-emerald-600 text-[11px] font-medium mt-3 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {developerInfo?.availability || 'Available for Hire'}
                </div>
              </div>
            </div>
          )}

          {/* Quick badge in corner */}
          <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E5E5E5] shadow-md">
            <Terminal className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span className="text-[11px] font-mono font-medium text-[#0A0A0A]">
              Backend • Node.js
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePhoto;
