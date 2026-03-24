import React from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Importance of Resource Forecasting",
    excerpt: "From blockchain technology to digital advisors, bank customers demand new technology to manage and access their money.",
    image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=800&q=80",
    readTime: "5 min read",
    tag: "Finance",
  },
  {
    id: 2,
    title: "Importance of Resource Forecasting",
    excerpt: "From blockchain technology to digital advisors, bank customers demand new technology to manage and access their money.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    readTime: "4 min read",
    tag: "Technology",
  },
  {
    id: 3,
    title: "Importance of Resource Forecasting",
    excerpt: "From blockchain technology to digital advisors, bank customers demand new technology to manage and access their money.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    readTime: "6 min read",
    tag: "Strategy",
  },
];

export default function OurBlogs() {
  return (
    <section className="w-full bg-[#0b1530] py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">Latest Insights</p>
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">Our Blogs</h2>
          </div>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-emerald-500/20 text-sm self-start sm:self-auto">
            View All <ArrowUpRight size={16} />
          </button>
        </div>

        {/* ── Blog Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-[#060d1f] border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Tag Badge */}
                <span className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                  {post.tag}
                </span>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d1f] via-transparent to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                  <Clock size={12} />
                  {post.readTime}
                </div>

                <h3 className="text-white text-lg font-bold leading-snug mb-3 group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                {/* CTA */}
                <div className="mt-6 pt-5 border-t border-white/8 flex items-center justify-between">
                  <span className="text-emerald-400 text-sm font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                    Read Article <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}