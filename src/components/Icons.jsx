import React from 'react';

export const Icons = {
  Photoshop: () => (
    <svg className="software-icon ps" viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="4" fill="#001E36" />
      <text x="12" y="15" fill="#31A8FF" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">Ps</text>
    </svg>
  ),
  Illustrator: () => (
    <svg className="software-icon ai" viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="4" fill="#261300" />
      <text x="12" y="15" fill="#FF9A00" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">Ai</text>
    </svg>
  ),
  Premiere: () => (
    <svg className="software-icon pr" viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="4" fill="#140026" />
      <text x="12" y="15" fill="#EA77FF" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">Pr</text>
    </svg>
  ),
  AfterEffects: () => (
    <svg className="software-icon ae" viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="4" fill="#14002B" />
      <text x="12" y="15" fill="#D291FF" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">Ae</text>
    </svg>
  ),
  Davinci: () => (
    <svg className="software-icon dr" viewBox="0 0 24 24">
      <defs>
        {/* Droplet path pointing UP with tip at (12, 4.2) and base at (12, 11.5) */}
        <path id="drDroplet" d="M12,4.2 C11,5.5 9.5,7.8 9.5,9.5 C9.5,10.8 10.6,11.5 12,11.5 C13.4,11.5 14.5,10.8 14.5,9.5 C14.5,7.8 13,5.5 12,4.2 Z" />
        
        {/* Gradients */}
        <linearGradient id="drBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3ac5ec" />
          <stop offset="100%" stopColor="#0b52c0" />
        </linearGradient>
        <linearGradient id="drRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec3a7b" />
          <stop offset="100%" stopColor="#c00b0b" />
        </linearGradient>
        <linearGradient id="drGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ecde3a" />
          <stop offset="100%" stopColor="#1bc00b" />
        </linearGradient>
        <linearGradient id="drBorder" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00e676" />
          <stop offset="35%" stopColor="#00f0ff" />
          <stop offset="70%" stopColor="#ff416c" />
          <stop offset="100%" stopColor="#ff8a00" />
        </linearGradient>
      </defs>
      
      {/* Outer Dark rounded card background to match other Adobe icons */}
      <rect width="24" height="24" rx="4" fill="#0E121A" />
      
      {/* Outer Border Ring */}
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="url(#drBorder)" strokeWidth="1" />
      
      {/* Inner circular background */}
      <circle cx="12" cy="12" r="8.2" fill="#121622" />
      
      {/* The Three Droplets rotated at 120-degree intervals */}
      {/* Blue droplet (pointing up / 0 deg) */}
      <use href="#drDroplet" fill="url(#drBlue)" transform="rotate(0 12 12)" />
      
      {/* Red/Pink droplet (pointing bottom-right / 120 deg) */}
      <use href="#drDroplet" fill="url(#drRed)" transform="rotate(120 12 12)" />
      
      {/* Yellow/Green droplet (pointing bottom-left / 240 deg) */}
      <use href="#drDroplet" fill="url(#drGreen)" transform="rotate(240 12 12)" />
    </svg>
  ),
  Canva: () => (
    <svg className="software-icon cv" viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="4" fill="#00C4CC" />
      <text x="12" y="15" fill="#FFFFFF" fontSize="8" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">Canva</text>
    </svg>
  ),
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.92 9.92 0 004.93 1.314h.005c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.04-5.176-2.927-7.067A9.917 9.917 0 0012.012 2zm5.79 14.218c-.318.893-1.854 1.635-2.548 1.706-.63.065-1.442.087-2.31-.2-3.486-1.154-5.748-4.707-5.922-4.939-.174-.23-1.4-1.857-1.4-3.543 0-1.687.876-2.518 1.189-2.856.314-.338.69-.422.922-.422h.658c.209 0 .49-.079.76.571.272.656.927 2.27.994 2.413.072.143.12.308.024.492-.096.184-.144.298-.288.468-.144.17-.303.38-.432.51-.143.143-.293.298-.12.593.173.296.767 1.258 1.644 2.032.858.756 1.577.99 1.879 1.144.302.155.48.13.658-.078.18-.208.769-.894.975-1.2.206-.306.41-.255.69-.153.282.102 1.785.84 2.094.994.308.153.514.23.587.357.072.127.072.74-.246 1.633z"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Target: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Instagram: () => (
    <svg className="software-icon ig" viewBox="0 0 24 24">
      <defs>
        <radialGradient id="igGrad" cx="30%" cy="107%" r="130%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="4" fill="url(#igGrad)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="16" cy="8" r="0.75" fill="#FFFFFF" />
    </svg>
  ),
  Youtube: () => (
    <svg className="software-icon yt" viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="4" fill="#FF0000" />
      <path d="M12 8.5c-4 0-4.5.3-4.5 3.5s.5 3.5 4.5 3.5 4.5-.3 4.5-3.5-.5-3.5-4.5-3.5zm-1.5 5.2v-3.4l3 1.7-3 1.7z" fill="#FFFFFF" />
    </svg>
  ),
  Facebook: () => (
    <svg className="software-icon fb" viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="4" fill="#1877F2" />
      <path d="M16.5 12h-2.2v7h-2.9v-7H9.7V9.3h1.7V7.6c0-2.4 1.4-3.7 3.6-3.7.8 0 1.6.1 1.8.1v2.5h-1.5c-1.2 0-1.4.6-1.4 1.4v1.4h2.7l-.4 2.7z" fill="#FFFFFF" />
    </svg>
  ),
  Google: () => (
    <svg className="software-icon gg" viewBox="0 0 24 24">
      <rect width="24" height="24" rx="4" fill="#FFFFFF" />
      <path d="M19.6 12.3c0-.6 0-1.1-.1-1.6H12v3.1h4.3c-.2.9-.7 1.7-1.5 2.2v1.8h2.4c1.4-1.3 2.4-3.2 2.4-5.5z" fill="#4285F4" />
      <path d="M12 20c2.2 0 4-.7 5.3-1.9l-2.4-1.8c-.7.5-1.6.8-2.9.8-2.2 0-4.1-1.5-4.8-3.5H4.8v1.9C6.2 18 8.9 20 12 20z" fill="#34A853" />
      <path d="M7.2 13.6c-.2-.5-.3-1.1-.3-1.6s.1-1.1.3-1.6V8.5H4.8c-.5 1-0.8 2.2-0.8 3.5s.3 2.5.8 3.5l2.4-1.9z" fill="#FBBC05" />
      <path d="M12 7.2c1.2 0 2.3.4 3.1 1.2l2.3-2.3C16 4.9 14.2 4 12 4 8.9 4 6.2 6 4.8 8.5l2.4 1.9c.7-2 2.6-3.2 4.8-3.2z" fill="#EA4335" />
    </svg>
  ),
  Meta: () => (
    <svg className="software-icon mt" viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="4" fill="#0064E0" />
      <path d="M16.9 8.2c-.8 0-1.6.4-2.2 1-.5.6-1.1 1.5-1.9 2.5-.5.6-.9 1.2-1.3 1.7-.5.7-1 1.2-1.5 1.5-.5.3-1 .5-1.5.5-.9 0-1.6-.3-2.1-.9-.5-.6-.7-1.4-.7-2.3 0-1 .3-1.8.8-2.4.5-.6 1.2-.9 2-.9.8 0 1.5.4 2.1 1.2l2.3-2.1c-1.1-1.3-2.6-2-4.4-2C6.3 4.8 4.7 5.7 3.7 7.1c-1 1.4-1.5 3.1-1.5 5.1s.5 3.8 1.5 5.2c1 1.4 2.6 2.3 4.5 2.3 1.4 0 2.6-.5 3.6-1.4.6-.6 1.2-1.4 1.9-2.3.5-.6.9-1.2 1.3-1.7.5-.7 1-1.2 1.5-1.5.5-.3 1-.5 1.5-.5.9 0 1.6.3 2.1.9.5.6.7 1.4.7 2.3 0 1-.3 1.8-.8 2.4-.5.6-1.2.9-2 .9-.8 0-1.5-.4-2.1-1.2l-2.3 2.1c1.1 1.3 2.6 2 4.4 2 2.3 0 3.9-.9 4.9-2.3 1-1.4 1.5-3.1 1.5-5.1s-.5-3.8-1.5-5.2c-1-1.4-2.6-2.3-4.5-2.3z" fill="#FFFFFF" />
    </svg>
  )
};

export default Icons;
