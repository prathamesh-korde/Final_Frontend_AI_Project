import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  { name: "Charlize Theron", role: "Athlete", text: "Customer service is accessible at all times and responds promptly to your requests and claims. They are kind and will guide you to your Representative and assist you in obtaining the funds you need. You can trust this company. I had a great experience.", image: "https://i.pravatar.cc/300?u=c" },
  { name: "Michael Johnson", role: "Consultant", text: "The support team is always available and handles my requests efficiently. Their professionalism and kindness made the entire process smooth and trustworthy. Highly recommended!", image: "https://i.pravatar.cc/300?u=michael" },
  { name: "Sarah Wilson", role: "Business Owner", text: "Exceptional service quality and attention to detail. The team went above and beyond to ensure our project was delivered on time and exceeded our expectations.", image: "https://i.pravatar.cc/300?u=sarah" },
  { name: "Amanda Bennett", role: "Head of Product", text: "Integrating our five disparate systems seemed impossible. They not only made it work but also created automated reports that save us 20 hours of manual work each week.", image: "https://i.pravatar.cc/300?u=u" },
  { name: "Chloe Wright", role: "Director", text: "The development team took our complex idea and turned it into an intuitive, powerful app that our clients now rave about. The entire process was collaborative and transparent.", image: "https://i.pravatar.cc/300?u=chloe" },
  { name: "J Foster", role: "CEO", text: "Their consultants understood our industry-specific challenges and designed a custom solution that gave us a significant competitive edge.", image: "https://i.pravatar.cc/300?u=l" },
  { name: "Isabelle Dubois", role: "VP of Sales", text: "They built a custom CRM that perfectly mirrors our unique sales process. It has reduced administrative work by 30% and increased lead conversion by giving our team the right data at the right time.", image: "https://i.pravatar.cc/300?u=d" },
  { name: "Derek C", role: "E-Commerce Director", text: "The API integration they developed connected our e-commerce, inventory, and shipping platforms into one cohesive system. It automated a chaotic process, eliminating errors and saving countless manual hours.", image: "https://i.pravatar.cc/300?u=derek" },
  { name: "Professor Aris T", role: "Dean of Informatics", text: "The new network infrastructure Netfotech team designed for our campus is bulletproof. Bandwidth issues during peak hours are history, directly enhancing the student and research experience.", image: "https://i.pravatar.cc/300?u=aris" },
  { name: "Karl Jorg", role: "Plant Superintendent", text: "In our manufacturing environment, downtime is lost revenue. The redundant network they installed has provided 99.99% uptime, keeping our production lines running seamlessly.", image: "https://i.pravatar.cc/300?u=karl" },
  { name: "A Sharma", role: "Chief Financial Officer", text: "The move to their managed services model was a strategic masterstroke. We have eliminated costly emergency IT expenses and gained predictable budgeting, all while our system performance has dramatically improved.", image: "https://i.pravatar.cc/300?u=sharma" },
  { name: "Ben Carter", role: "Chief Operations Officer", text: "Netfotech Solutions team have navigated the complexities of our legacy system migration with exceptional skill. Our transition to the cloud was on time, on budget, and our team adapted faster than we ever anticipated.", image: "https://i.pravatar.cc/300?u=p" },
];

export default function OurClients() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = testimonials[activeIndex];
  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="w-full bg-[#060d1f] py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="text-center mb-14">
          <p className="text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">Testimonials</p>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">Our Clients</h2>
          <p className="text-gray-400 text-lg">What the people we work with say about us</p>
        </div>

        {/* ── Main Testimonial ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">

          {/* Left: Avatar */}
          <div className="lg:col-span-2 flex flex-col items-center text-center">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/20 blur-xl" />
              <img
                src={current.image}
                alt={current.name}
                className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full object-cover border-4 border-white/10 shadow-2xl"
              />
              {/* Quote badge */}
              <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-emerald-500 p-2.5 rounded-full shadow-lg">
                <Quote size={16} className="text-white fill-white" />
              </div>
            </div>
            <h3 className="text-white text-xl font-bold mt-5">{current.name}</h3>
            <p className="text-emerald-400 text-sm font-medium mt-1">{current.role}</p>
            {/* Stars */}
            <div className="flex gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>

          {/* Right: Quote Card */}
          <div className="lg:col-span-3">
            {/* Large quote mark */}
            <div className="text-emerald-500/20 text-[7rem] leading-none font-serif select-none -mb-6 -ml-2">"</div>
            <blockquote className="bg-[#0d1f3c] border border-white/8 rounded-2xl p-8 sm:p-10 relative">
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed italic">
                {current.text}
              </p>

              {/* Counter */}
              <div className="absolute top-4 right-6 text-gray-600 text-xs font-mono tabular-nums">
                {String(activeIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </div>

              {/* Progress bar */}
              <div className="mt-8 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
                />
              </div>
            </blockquote>

            {/* Controls */}
            <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
              {/* Dots */}
              <div className="flex gap-1.5 flex-wrap">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-5 h-2.5 bg-emerald-400' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>

              {/* Arrow buttons */}
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all hover:scale-110"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="p-3 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 transition-all hover:scale-110"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Avatar Strip ── */}
        <div className="mt-14 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full border-2 transition-all duration-200 overflow-hidden ${
                i === activeIndex
                  ? 'border-emerald-400 scale-110 shadow-lg shadow-emerald-500/30'
                  : 'border-white/10 opacity-50 hover:opacity-80 hover:scale-105'
              }`}
              style={{ width: 40, height: 40, minWidth: 40 }}
              aria-label={t.name}
            >
              <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}