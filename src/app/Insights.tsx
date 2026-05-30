"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "./components/ThemeProvider";
import { BlurReveal } from "./components/BlurReveal";
import { CTAButton } from "./components/CTAButton";
import { BOOK_DEMO_HREF } from "./lib/booking";

type Category = "Blog" | "Case Study" | "Playbook" | "Guide";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
  image: string;
  href: string;
  featured?: boolean;
};

const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Blog",
  "Case Study",
  "Playbook",
  "Guide",
];

const POSTS: Post[] = [
  {
    id: "kpis-that-predict",
    title: "The 5 KPIs that actually predict rep performance",
    excerpt:
      "Most teams track activity. The best teams track the leading indicators that tell you what's about to happen—before it does.",
    category: "Blog",
    date: "May 21, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    href: "#",
    featured: true,
  },
  {
    id: "solar-case-study",
    title: "How a 400-rep solar team lifted sales per rep 23% in one quarter",
    excerpt:
      "A look at the rollout: connected data, public leaderboards, and AI-curated competitions that compounded week over week.",
    category: "Case Study",
    date: "May 14, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    href: "#",
  },
  {
    id: "launch-a-competition",
    title: "Playbook: Launch a competition that actually changes behavior",
    excerpt:
      "Pick the right KPI, set the format, and structure the reward. A step-by-step setup you can run this week.",
    category: "Playbook",
    date: "May 9, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    href: "#",
  },
  {
    id: "connect-your-crm",
    title: "Guide: Connecting your CRM and data sources to Enzy",
    excerpt:
      "Everything you need to pull your team's activity into one real-time feed—mappings, permissions, and automations.",
    category: "Guide",
    date: "May 2, 2026",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1702479743967-3dcccd4a671d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    href: "#",
  },
  {
    id: "momentum-culture",
    title: "Why momentum—not motivation—builds high-performance cultures",
    excerpt:
      "Motivation fades. Momentum compounds. Here's how visibility and social dynamics keep teams moving.",
    category: "Blog",
    date: "Apr 24, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    href: "#",
  },
  {
    id: "roofing-case-study",
    title: "Case study: A roofing team turns field effort into revenue",
    excerpt:
      "Canvassing, lead management, and incentives—how one team operationalized daily execution across the field.",
    category: "Case Study",
    date: "Apr 17, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1632759145351-1d592919f522?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    href: "#",
  },
];

export function Insights() {
  const { isLightMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState<"All" | Category>("All");

  const featured = useMemo(() => POSTS.find((p) => p.featured) ?? POSTS[0], []);
  const filtered = useMemo(
    () =>
      POSTS.filter(
        (p) =>
          p.id !== featured.id &&
          (activeCategory === "All" || p.category === activeCategory)
      ),
    [activeCategory, featured.id]
  );

  const pageTitle = isLightMode ? "text-black" : "text-[#f5f7fa]";
  const pageBody = isLightMode ? "text-black/60" : "text-white/60";
  const cardBorder = isLightMode ? "border-black/10" : "border-white/10";

  return (
    <div className="relative w-full flex flex-col items-center justify-start pt-4 md:pt-8 lg:pt-12 pb-16 md:pb-24 z-20 transition-colors duration-500">
      <div className="w-full max-w-7xl px-5 sm:px-6 md:px-8">
        {/* Header */}
        <section className="pt-2 pb-10 md:pb-14 text-center flex flex-col items-center">
          <p className="font-inter text-[12px] md:text-[13px] tracking-[0.2em] uppercase font-bold text-[#19ad7d] mb-5">
            Insights
          </p>
          <BlurReveal
            as="h1"
            delay={0.1}
            className={`font-ivyora font-medium tracking-[-2px] leading-[1.05] text-[44px] sm:text-[56px] md:text-[72px] max-w-3xl ${pageTitle}`}
          >
            Ideas that drive performance
          </BlurReveal>
          <p
            className={`mt-6 font-inter text-[16px] md:text-[18px] leading-relaxed max-w-2xl ${pageBody}`}
          >
            Articles, playbooks, and customer stories on building
            high-performance sales teams—straight from the people building Enzy.
          </p>
        </section>

        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 md:mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`font-inter text-[13px] font-semibold px-4 py-2 rounded-full border transition-colors ${
                  isActive
                    ? "bg-[#19ad7d] border-[#19ad7d] text-white"
                    : isLightMode
                      ? "border-black/12 text-black/60 hover:text-black hover:border-black/30"
                      : "border-white/12 text-white/60 hover:text-white hover:border-white/30"
                }`}
              >
                {cat === "All" ? "All" : `${cat}s`}
              </button>
            );
          })}
        </div>

        {/* Featured post */}
        {activeCategory === "All" && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mb-14 md:mb-20"
          >
            <Link
              href={featured.href}
              className={`group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 rounded-[28px] border overflow-hidden p-4 md:p-5 transition-colors ${
                isLightMode
                  ? "border-black/10 bg-white/70 hover:border-black/20"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25"
              }`}
            >
              <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center py-2 md:py-6 pr-2 md:pr-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center rounded-full bg-[#19ad7d]/12 text-[#19ad7d] border border-[#19ad7d]/25 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">
                    {featured.category}
                  </span>
                  <span className={`font-inter text-[12px] ${pageBody}`}>
                    {featured.date} · {featured.readTime}
                  </span>
                </div>
                <h2
                  className={`font-ivyora font-medium text-[28px] sm:text-[36px] md:text-[40px] leading-[1.1] tracking-[-1px] ${
                    isLightMode ? "text-black" : "text-white"
                  }`}
                >
                  {featured.title}
                </h2>
                <p
                  className={`mt-4 font-inter text-[15px] md:text-[17px] leading-relaxed ${
                    isLightMode ? "text-black/70" : "text-white/70"
                  }`}
                >
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-inter text-[14px] font-semibold text-[#19ad7d]">
                  Read article
                  <ArrowRight
                    size={15}
                    strokeWidth={2.5}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: (i % 3) * 0.05 }}
            >
              <Link
                href={post.href}
                className={`group flex flex-col h-full rounded-[24px] border overflow-hidden transition-colors ${
                  isLightMode
                    ? "border-black/10 bg-white/70 hover:border-black/20"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25"
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-black/55 backdrop-blur-md text-white border border-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <span className={`font-inter text-[12px] ${pageBody}`}>
                    {post.date} · {post.readTime}
                  </span>
                  <h3
                    className={`mt-3 font-ivyora font-medium text-[21px] md:text-[23px] leading-[1.15] tracking-[-0.5px] ${
                      isLightMode ? "text-black" : "text-white"
                    }`}
                  >
                    {post.title}
                  </h3>
                  <p
                    className={`mt-3 font-inter text-[14px] leading-relaxed line-clamp-3 ${
                      isLightMode ? "text-black/65" : "text-white/65"
                    }`}
                  >
                    {post.excerpt}
                  </p>
                  <span className="mt-auto pt-5 inline-flex items-center gap-1 font-inter text-[13px] font-semibold text-[#19ad7d]">
                    Read more
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2.5}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={`text-center font-inter text-[15px] py-16 ${pageBody}`}>
            More {activeCategory.toLowerCase()}s coming soon.
          </p>
        )}

        {/* CTA */}
        <div
          className={`mt-16 md:mt-24 relative rounded-[32px] p-10 md:p-14 text-center flex flex-col items-center overflow-hidden liquid-glass ${
            isLightMode
              ? "border-[#19ad7d]/20 bg-[#19ad7d]/5"
              : "border-[#19ad7d]/30 bg-[linear-gradient(189.6deg,rgba(25,173,125,0.15)_25.1%,rgba(20,144,103,0.05)_64.2%)]"
          }`}
        >
          <h2
            className={`relative z-10 font-ivyora font-medium tracking-[-2px] leading-[1.05] text-3xl md:text-5xl max-w-2xl ${
              isLightMode ? "text-black" : "text-white"
            }`}
          >
            See what Enzy can do for your team.
          </h2>
          <div className="relative z-10 mt-9">
            <CTAButton
              href={BOOK_DEMO_HREF}
              variant="primary"
              className="book-demo-cta-marker px-8 py-4 gap-3 font-semibold text-[15px] tracking-tight shadow-[0_0_28px_rgba(25,173,125,0.35)]"
            >
              Book a Demo <ArrowRight size={18} aria-hidden />
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
