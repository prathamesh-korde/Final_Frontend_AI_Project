import React, { useState } from 'react';
import {
  ChevronLeft, ChevronRight, ShieldCheck, PlusCircle, Globe,
  Settings, Film, Users, ShoppingCart, Radio, BookOpen, ArrowRight
} from 'lucide-react';

const industryData = [
  { title: "Banking, Finance & Insurance", desc: "From blockchain technology to digital advisors, bank customers demand new technology to manage and access their money.", icon: ShieldCheck, color: "from-blue-500 to-cyan-500" },
  { title: "Healthcare", desc: "The healthcare industry requires technology that supports patient care, efficiency, and scalability. We offer digital transformation.", icon: PlusCircle, color: "from-rose-500 to-pink-500" },
  { title: "Energy & Utilities", desc: "We help energy and utility companies optimize operations, improve sustainability, and implement smart grid solutions.", icon: Globe, color: "from-emerald-500 to-green-500" },
  { title: "Manufacturing", desc: "Manufacturing is at the core of industry. We specialize in creating solutions that optimize production and enhance efficiency.", icon: Settings, color: "from-orange-500 to-amber-500" },
  { title: "Media & Entertainment", desc: "From content creation to distribution, we provide end-to-end solutions to entertainment businesses to drive innovation.", icon: Film, color: "from-purple-500 to-violet-500" },
  { title: "Public Sector", desc: "We work with public sector organizations to modernize services, improve citizen engagement, and streamline government operations.", icon: Users, color: "from-sky-500 to-blue-500" },
  { title: "Retail", desc: "In the retail sector, we offer solutions to improve customer experience, inventory management, and operational efficiency.", icon: ShoppingCart, color: "from-yellow-500 to-orange-500" },
  { title: "Telecom", desc: "Telecommunications companies rely on our solutions to improve network reliability, scalability, and customer satisfaction.", icon: Radio, color: "from-teal-500 to-cyan-500" },
  { title: "Education", desc: "We provide digital learning platforms and administrative solutions to educational institutions to enhance learning experiences.", icon: BookOpen, color: "from-indigo-500 to-purple-500" },
];

const VISIBLE = 3;

export default function Industries() {
  const [startIndex, setStartIndex] = useState(0);

  const next = () => setStartIndex((prev) => (prev + 1) % industryData.length);
  const prev = () => setStartIndex((prev) => (prev - 1 + industryData.length) % industryData.length);

  const visibleItems = Array.from({ length: VISIBLE }, (_, i) => industryData[(startIndex + i) % industryData.length]);

  return (
    <section className="w-full bg-[#060d1f] py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="text-center mb-14">
          <p className="text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">What We Cover</p>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">Industries</h2>
          <p className="text-gray-400 text-lg">Sectors we serve across the globe</p>
        </div>

        {/* ── Cards Carousel ── */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${startIndex}-${index}`}
                  className="group relative bg-[#0d1f3c] border border-white/8 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} mb-6 shadow-lg`}>
                    <Icon size={26} className="text-white" />
                  </div>

                  <h3 className="text-white text-xl font-bold mb-3 leading-snug">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow">{item.desc}</p>

                  {/* CTA */}
                  <button className="mt-6 inline-flex items-center gap-2 text-emerald-400 text-sm font-semibold hover:gap-3 transition-all group-hover:text-emerald-300">
                    Learn more <ArrowRight size={15} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Nav Arrows */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all hover:scale-110"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {industryData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setStartIndex(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    startIndex === idx ? 'w-6 h-2.5 bg-emerald-400' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all hover:scale-110"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}