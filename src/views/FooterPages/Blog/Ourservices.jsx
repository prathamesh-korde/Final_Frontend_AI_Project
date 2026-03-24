import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const serviceData = [
  {
    title: "Digital Transformation Services",
    subtitle: "Protect what matters with intelligent defense",
    description: "Empowering enterprises to evolve into intelligent, agile, and sustainable digital businesses.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    accent: "#22c55e",
    tags: [
      "AI-First Enterprise Modernization",
      "Business process reengineering with Intelligent Automation (RPA + AI)",
      "CX/UX strategy powered by GenAI",
      "ESG tech enablement and sustainability analytics",
      "Agile transformation and change management",
    ],
  },
  {
    title: "Cloud & Infrastructure Services",
    subtitle: "Build resilient, scalable, and cloud-native foundations",
    description: "Accelerating cloud-native journeys with scalable, secure, and cost-efficient infrastructure.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    accent: "#38bdf8",
    tags: [
      "Cloud migration & modernization (Azure, AWS, GCP)",
      "Cloud-Native Application Development",
      "Kubernetes orchestration & containerization",
      "Edge Computing & Serverless Architecture",
      "Infrastructure as Code (IaC) & DevOps Automation",
      "DevSecOps pipelines and SRE enablement",
    ],
  },
  {
    title: "Cybersecurity & Risk Management",
    subtitle: "Protect what matters with intelligent defense",
    description: "Safeguarding digital assets with proactive, AI-driven security frameworks.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    accent: "#f43f5e",
    tags: [
      "Zero-Trust Security Architecture",
      "SOC-as-a-Service with AI threat detection",
      "Identity & Access Management (IAM)",
      "Compliance Automation (GDPR, HIPAA, ISO)",
      "Penetration Testing & Vulnerability Management",
    ],
  },
];

export default function OurServices() {
  const [expanded, setExpanded] = useState(0);

  return (
    <section className="w-full bg-[#060d1f] py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="mb-14">
          <p className="text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">What We Do</p>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">Our Services</h2>
        </div>

        {/* ── Service Cards ── */}
        <div className="flex flex-col gap-4">
          {serviceData.map((service, index) => {
            const isOpen = expanded === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-white/20 bg-[#0d1f3c]' : 'border-white/8 bg-[#0b1530] hover:border-white/15'
                }`}
              >
                {/* Card Header / Toggle */}
                <button
                  onClick={() => setExpanded(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 sm:px-8 py-6 text-left"
                >
                  <div className="flex items-center gap-5 min-w-0">
                    {/* Number */}
                    <span
                      className="text-3xl font-extrabold tabular-nums shrink-0"
                      style={{ color: isOpen ? service.accent : '#374151' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-white font-bold text-lg sm:text-xl truncate">{service.title}</h3>
                      <p className="text-gray-400 text-sm mt-0.5 hidden sm:block">{service.subtitle}</p>
                    </div>
                  </div>
                  <div
                    className="shrink-0 p-2 rounded-full border transition-colors"
                    style={{
                      borderColor: isOpen ? service.accent + '60' : '#374151',
                      color: isOpen ? service.accent : '#9ca3af',
                    }}
                  >
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {/* Expanded Content */}
                {isOpen && (
                  <div className="px-6 sm:px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/8">
                    {/* Image */}
                    <div className="mt-6 overflow-hidden rounded-xl aspect-video border border-white/10">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="mt-6 flex flex-col">
                      <p className="text-gray-300 text-base leading-relaxed mb-6">{service.description}</p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg border"
                            style={{
                              color: service.accent,
                              borderColor: service.accent + '40',
                              background: service.accent + '12',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button
                        className="mt-auto inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
                        style={{ color: service.accent }}
                      >
                        Explore Service <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}