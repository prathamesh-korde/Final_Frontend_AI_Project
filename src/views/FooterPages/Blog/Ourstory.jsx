import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const stats = [
  { value: '25+', label: 'Years Combined Experience' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '50+', label: 'Enterprise Clients' },
  { value: '99%', label: 'Client Satisfaction' },
];

export default function OurStory() {
  return (
    <section className="w-full bg-[#0b1530] py-20 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <div>
            <p className="text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Our Story</p>
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Netfotech Solutions
              </span>
            </h2>

            <div className="space-y-5 text-gray-400 text-base sm:text-lg leading-relaxed">
              <p>
                Netfotech Solutions is a privately-owned company located at Pune, India.
                Netfotech Solution's founders have over 25 years combined experience in
                industry both inside and outside of India.
              </p>
              <p>
                Our experience has allowed us to develop and maintain our own code of
                best practice that is benefited by our valued customers. Netfotech
                Solutions provides services to companies of all sizes. Each of our customers
                is treated with the same respect and commitment to quality.
              </p>
            </div>

            {/* Checklist */}
            <ul className="mt-8 space-y-3">
              {['25+ Years of industry expertise', 'Serving clients across 15+ countries', 'End-to-end digital transformation'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-300 text-sm sm:text-base">
                  <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button className="mt-10 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-emerald-500/20">
              Learn More <ArrowRight size={16} />
            </button>
          </div>

          {/* ── Right: Image + Stats ── */}
          <div className="flex flex-col gap-6">
            {/* Image Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Team working in Pune office"
                className="w-full aspect-[4/3] object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1530]/60 to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 bg-[#0b1530]/90 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl">
                <p className="text-emerald-400 text-2xl font-bold leading-none">25+</p>
                <p className="text-gray-300 text-xs mt-1">Years of Excellence</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-[#0d1f3c] border border-white/8 rounded-xl px-4 py-5 text-center hover:border-emerald-500/30 transition-colors"
                >
                  <p className="text-emerald-400 text-2xl font-extrabold">{s.value}</p>
                  <p className="text-gray-400 text-xs mt-1 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}