import React from 'react';

const partners = [
  "Softomotive", "UiPath", "Kentico", "KOFAX", "Adobe", "Appian",
  "Automation Anywhere", "AWS", "BluePrism", "BlueYonder",
  "Magento", "NICE", "OpenCart", "SAP", "Shopify",
  "Microsoft", "Acquia", "PEGA",
];

export default function OurPartners() {
  // Triplicate for seamless infinite scroll
  const loop = [...partners, ...partners, ...partners];

  return (
    <section className="w-full bg-[#0b1530] py-20 overflow-hidden">
      {/* ── Header ── */}
      <div className="text-center mb-14 px-4">
        <p className="text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">Trusted By</p>
        <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">Our Partners</h2>
        <p className="text-gray-400 text-lg">Global technology alliances powering our solutions</p>
      </div>

      {/* ── Marquee Track ── */}
      <div className="relative w-full">
        {/* Gradient fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#0b1530] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#0b1530] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max" style={{ animation: 'marquee 45s linear infinite' }}>
          {loop.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-8 sm:px-12 h-16"
            >
              <span className="text-gray-400 text-base sm:text-lg font-bold tracking-wide whitespace-nowrap uppercase hover:text-white transition-colors cursor-default border-r border-white/10 pr-8 sm:pr-12 last:border-0">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Second Row (reversed) ── */}
      <div className="relative w-full mt-6">
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#0b1530] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#0b1530] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max" style={{ animation: 'marquee-reverse 40s linear infinite' }}>
          {[...loop].reverse().map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-8 sm:px-12 h-16"
            >
              <span className="text-gray-500 text-sm sm:text-base font-semibold tracking-wide whitespace-nowrap uppercase hover:text-gray-300 transition-colors cursor-default border-r border-white/8 pr-8 sm:pr-12 last:border-0">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Partner Count ── */}
      <div className="text-center mt-14 px-4">
        <p className="text-gray-500 text-sm">
          Partnering with <span className="text-emerald-400 font-bold">{partners.length}+ technology leaders</span> worldwide
        </p>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}