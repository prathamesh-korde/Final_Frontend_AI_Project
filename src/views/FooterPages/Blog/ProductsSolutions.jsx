import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
  {
    category: "SECURITY SOLUTION",
    title: "PaybizMFA",
    description: "An Innovative Multi-factor Authentication Solution by Netfotech Solutions",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=900&q=80",
    accent: "#22c55e",
  },
  {
    category: "PLATFORM SERVICE",
    title: "Digital Lending",
    description: "Designed to provide a seamless background experience that captures attention.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80",
    accent: "#38bdf8",
  },
  {
    category: "FINANCIAL TECHNOLOGY",
    title: "Access Control",
    description: "A comprehensive feature designed to ensure better control in projects.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=80",
    accent: "#a78bfa",
  },
  {
    category: "FINANCIAL TECHNOLOGY",
    title: "Fraud Risk Management (FRM)",
    description: "AI-powered detection & real-time risk assessment to stop fraudulent transactions before they happen.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    accent: "#f59e0b",
  },
  {
    category: "FINANCIAL TECHNOLOGY",
    title: "Anti-Money Laundering (AML)",
    description: "Real-time monitoring & regulatory compliance to detect suspicious activities and ensure AML adherence.",
    image: "https://financialcrimeacademy.org/wp-content/uploads/2022/04/2-145-1024x576.jpg",
    accent: "#f43f5e",
  },
  {
    category: "FINANCIAL TECHNOLOGY",
    title: "Cross-Border Remittance",
    description: "Fast, secure, and cost-effective global payments with blockchain transparency.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    accent: "#06b6d4",
  },
];

export default function ProductsSolutions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => handleNext(), 5500);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleChange = (idx) => {
    if (animating || idx === activeIndex) return;
    setAnimating(true);
    setTimeout(() => { setActiveIndex(idx); setAnimating(false); }, 350);
  };

  const handleNext = () => handleChange((activeIndex + 1) % products.length);
  const handlePrev = () => handleChange((activeIndex - 1 + products.length) % products.length);

  const p = products[activeIndex];

  return (
    <section className="w-full bg-[#060d1f] overflow-hidden">
      {/* ── Page Header ── */}
      <div className="border-b border-white/10 px-6 sm:px-12 py-8 bg-[#0b1530]">
        <p className="text-xs font-semibold tracking-[0.3em] text-emerald-400 uppercase mb-1">Solution Accelerators</p>
        <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
          Products &amp; <span className="text-emerald-400">Solutions</span>
        </h1>
      </div>

      {/* ── Hero Slider ── */}
      <div className="relative min-h-[520px] sm:min-h-[600px] flex items-center">
        {/* Background Image with overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: animating ? 0 : 1 }}
        >
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060d1f] via-[#060d1f]/85 to-[#060d1f]/40" />
        </div>

        {/* Content */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.35s ease' }}
        >
          <div>
            <span
              className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-6 tracking-[0.2em] uppercase border"
              style={{ color: p.accent, borderColor: p.accent + '55', background: p.accent + '15' }}
            >
              {p.category}
            </span>
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">{p.title}</h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">{p.description}</p>
            <button
              className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3 rounded-lg transition-all hover:scale-105 shadow-lg"
              style={{ background: p.accent, color: '#060d1f' }}
            >
              Learn More <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Arrow Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/10 transition-all hover:scale-110"
          aria-label="Previous"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/10 transition-all hover:scale-110"
          aria-label="Next"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* ── Tabs Row ── */}
      <div className="bg-[#0b1530] border-t border-white/10 px-6 sm:px-12 py-4">
        <div className="flex flex-wrap gap-2 sm:gap-3 max-w-7xl mx-auto">
          {products.map((prod, idx) => (
            <button
              key={idx}
              onClick={() => handleChange(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all border ${
                activeIndex === idx
                  ? 'text-white border-white/20 bg-white/10'
                  : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: activeIndex === idx ? prod.accent : '#4b5563' }}
              />
              {prod.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}