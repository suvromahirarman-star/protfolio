import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * ProfilePhoto component
 * Displays Mahir Arman Suvro's professional photograph.
 * Dynamically reactive to in-browser photo updates with an automatic fallback badge.
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
      {/* Background ambient glow */}
      <div 
        className="absolute -inset-1.5 bg-gradient-to-r from-electric-500/30 to-indigoAcc-500/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500 group-hover:duration-200"
        aria-hidden="true"
      />

      {/* Outer frame */}
      <div className={`relative ${sizeClasses[size] || sizeClasses.lg} rounded-2xl sm:rounded-3xl p-1.5 bg-gradient-to-br from-electric-400/40 via-dark-800 to-indigoAcc-500/40 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]`}>
        <div className="w-full h-full rounded-[14px] sm:rounded-[22px] overflow-hidden bg-dark-900 flex items-center justify-center relative border border-white/10">
          {!imageError ? (
            <img
              src={srcAttempt}
              alt={`${developerInfo?.name || 'Mahir Arman Suvro'} - Full-Stack Web Developer`}
              loading={priority ? 'eager' : 'lazy'}
              onError={handleImageError}
              className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
            />
          ) : (
            /* Fallback sleek developer avatar badge if local image file isn't loaded yet */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-dark-850 to-dark-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />
              
              <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-electric-500/20 to-indigoAcc-500/20 border border-electric-400/30 flex items-center justify-center mb-3 shadow-inner">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-wider text-gradient">
                  {developerInfo?.initials || 'MAS'}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="text-lg font-bold text-slate-100 tracking-tight">
                  {developerInfo?.name || 'Mahir Arman Suvro'}
                </h3>
                <p className="text-xs text-electric-400 font-mono mt-0.5">
                  {developerInfo?.title || 'Full-Stack Developer'}
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium mt-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {developerInfo?.availability || 'Available for Hire'}
                </div>
              </div>
            </div>
          )}

          {/* Quick badge in corner */}
          <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-1.5 bg-dark-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-electric-400/30 shadow-lg">
            <Terminal className="w-3.5 h-3.5 text-electric-400" />
            <span className="text-[11px] font-mono font-medium text-slate-200">
              Backend • Node.js
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePhoto;
