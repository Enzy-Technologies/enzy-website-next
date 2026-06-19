"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { BlurReveal } from "./components/BlurReveal";
import { CTAButton } from "./components/CTAButton";
import { BOOK_DEMO_HREF, BOOK_DEMO_CTA_STYLE } from "./lib/booking";
import {
  CATEGORIES,
  formatPostDate,
  pillLabel,
  type Category,
  type PostSummary,
} from "./lib/insights";

const FILTERS: ("All" | Category)[] = ["All", ...CATEGORIES];

// Branded placeholder shown until a self-hosted coverImage is supplied in a
// post's frontmatter. We never source/hotlink external images — an empty
// coverImage renders this on-brand gradient instead.
function Cover({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  /** Set only on the above-the-fold featured cover (its LCP image). Never on
   *  the grid covers — priority-loading off-screen images competes with the LCP. */
  priority?: boolean;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    );
  }
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(135deg,rgba(25,173,125,0.16),rgba(25,173,125,0.03))] transition-transform duration-700 group-hover:scale-105"
    />
  );
}

export function Insights({ posts }: { posts: PostSummary[] }) {
  const [activeCategory, setActiveCategory] = useState<"All" | Category>("All");

  // Newest post (posts arrive pre-sorted newest-first) headlines the "All" view.
  const featured = posts[0];
  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          !(activeCategory === "All" && featured && p.slug === featured.slug) &&
          (activeCategory === "All" || p.category === activeCategory)
      ),
    [activeCategory, featured, posts]
  );

  const pageBody = "text-black/60 dark:text-white/60";

  return (
    <div className="relative w-full flex flex-col items-center justify-start pt-7 md:pt-10 pb-16 md:pb-24 z-20 transition-colors duration-500">
      <div className="w-full max-w-7xl px-5 sm:px-6 md:px-8">
        {/* Header */}
        <section className="pb-12 md:pb-16">
          <div className="flex flex-col items-center justify-center text-center relative z-10">
            <motion.div className="enzy-hero-reveal flex flex-col items-center max-w-4xl">
              <h1 className="font-ivyora font-medium text-[40px] sm:text-[50px] md:text-[64px] leading-[1.05] tracking-[-2px] text-center transition-colors duration-500 text-brand-dark dark:text-brand-light">
                <BlurReveal as="span" delay={0.1}>Ideas that drive </BlurReveal>
                <BlurReveal as="span" delay={0.49} className="italic">performance.</BlurReveal>
              </h1>

              <p
                className="font-inter text-lg md:text-xl mt-8 max-w-2xl text-center leading-relaxed transition-colors duration-500 text-black/60 dark:text-white/60"
              >
                What makes high-performance sales teams win — straight from the
                people building Enzy.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category filters */}
        <div
          className="flex gap-2 overflow-x-auto pt-2 pb-7 mb-9 md:mb-12 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          role="tablist"
          aria-label="Insights categories"
        >
          {FILTERS.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 font-inter text-[13px] font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[#19ad7d] border-[#19ad7d] text-white shadow-[0_6px_18px_rgba(25,173,125,0.30)]"
                    : "border-black/10 bg-white/90 dark:bg-white/[0.18] backdrop-blur-md text-black/65 dark:text-white/65 hover:text-black hover:border-black/20 dark:border-white/10 dark:hover:text-white dark:hover:border-white/25"
                }`}
              >
                {cat === "All" ? "All" : pillLabel(cat)}
              </button>
            );
          })}
        </div>

        {/* Featured post */}
        {activeCategory === "All" && featured && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mb-14 md:mb-20"
          >
            <Link
              href={`/insights/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 rounded-[28px] border overflow-hidden p-4 md:p-5 transition-colors border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#12161b]/95 hover:border-black/20 dark:hover:border-white/25"
            >
              <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden">
                <Cover
                  src={featured.coverImage}
                  alt={featured.title}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center py-2 md:py-6 pr-2 md:pr-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center rounded-full bg-[#19ad7d]/12 text-[#19ad7d] border border-[#19ad7d]/25 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">
                    {featured.category}
                  </span>
                  <span className={`font-inter text-[12px] ${pageBody}`}>
                    {[formatPostDate(featured.date), featured.readTime]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </div>
                <h2
                  className="font-ivyora font-medium text-[28px] sm:text-[36px] md:text-[40px] leading-[1.1] tracking-[-1px] text-black dark:text-white"
                >
                  {featured.title}
                </h2>
                {featured.description ? (
                  <p
                    className="mt-4 font-inter text-[15px] md:text-[17px] leading-relaxed text-black/70 dark:text-white/70"
                  >
                    {featured.description}
                  </p>
                ) : null}
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
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: (i % 3) * 0.05 }}
            >
              <Link
                href={`/insights/${post.slug}`}
                className="group flex flex-col h-full rounded-[24px] border overflow-hidden transition-colors border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#12161b]/95 hover:border-black/20 dark:hover:border-white/25"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Cover
                    src={post.coverImage}
                    alt={post.title}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-black/55 backdrop-blur-md text-white border border-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <span className={`font-inter text-[12px] ${pageBody}`}>
                    {[formatPostDate(post.date), post.readTime]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                  <h3
                    className="mt-3 font-ivyora font-medium text-[21px] md:text-[23px] leading-[1.15] tracking-[-0.5px] text-black dark:text-white"
                  >
                    {post.title}
                  </h3>
                  {post.description ? (
                    <p
                      className="mt-3 font-inter text-[14px] leading-relaxed line-clamp-3 text-black/65 dark:text-white/65"
                    >
                      {post.description}
                    </p>
                  ) : null}
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
            {activeCategory === "All"
              ? "More posts coming soon."
              : `${pillLabel(activeCategory)} coming soon.`}
          </p>
        )}

        {/* CTA */}
        <div
          className="mt-16 md:mt-24 relative rounded-[32px] p-10 md:p-14 text-center flex flex-col items-center overflow-hidden liquid-glass border-[#19ad7d]/20 dark:border-[#19ad7d]/30 bg-[#19ad7d]/5 dark:bg-[linear-gradient(189.6deg,rgba(25,173,125,0.15)_25.1%,rgba(20,144,103,0.05)_64.2%)]"
        >
          <h2
            className="relative z-10 font-ivyora font-medium tracking-[-2px] leading-[1.05] text-3xl md:text-5xl max-w-2xl text-black dark:text-white"
          >
            See what Enzy can do for your team.
          </h2>
          <div className="relative z-10 mt-9">
            <CTAButton
              href={BOOK_DEMO_HREF}
              variant="primary"
              className={`book-demo-cta-marker px-8 py-4 gap-3 text-[15px] ${BOOK_DEMO_CTA_STYLE}`}
            >
              Book a Demo <ArrowRight size={18} strokeWidth={2.25} aria-hidden />
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
