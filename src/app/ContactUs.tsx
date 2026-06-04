"use client";

import React, { useState } from "react";
import { ArrowRight, Phone, Mail, MapPin, Headset, Briefcase, Check } from "lucide-react";
import { motion } from "motion/react";
import { BlurReveal } from "./components/BlurReveal";

const CONTACT_PHONE_DISPLAY = "(855) 520-ENZY";
const CONTACT_PHONE_HREF = "tel:8555203699";
const SALES_EMAIL = "sales@enzy.ai";
const SUPPORT_EMAIL = "support@enzy.ai";

type Reason = "sales" | "support" | "other";

export function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    reason: "sales" as Reason,
    message: "",
  });

  const pageTitle = "text-black dark:text-[#f5f7fa]";
  const pageBody = "text-black/60 dark:text-white/60";
  const cardClass =
    "border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/[0.03]";
  const labelClass =
    "font-inter text-[13px] font-semibold text-black/70 dark:text-white/70";
  const inputClass =
    "mt-2 w-full rounded-xl border px-4 py-3 font-inter text-[15px] outline-none transition-colors focus:border-[#19ad7d] border-black/12 bg-white text-black placeholder:text-black/35 dark:border-white/12 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const to = form.reason === "support" ? SUPPORT_EMAIL : SALES_EMAIL;
    const subject = encodeURIComponent(
      `${form.reason === "support" ? "Support" : "Sales"} inquiry from ${
        form.name || "website visitor"
      }`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nReason: ${form.reason}\n\n${form.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const methods = [
    {
      icon: Briefcase,
      title: "Talk to Sales",
      desc: "Demos, pricing, and rollout questions.",
      email: SALES_EMAIL,
      phone: CONTACT_PHONE_DISPLAY,
    },
    {
      icon: Headset,
      title: "Get Support",
      desc: "Help with your account or the platform.",
      email: SUPPORT_EMAIL,
      phone: CONTACT_PHONE_DISPLAY,
    },
  ];

  return (
    <div className="relative w-full flex flex-col items-center justify-start pt-7 md:pt-10 pb-16 md:pb-24 z-20 transition-colors duration-500">
      <div className="w-full max-w-6xl px-5 sm:px-6 md:px-8">
        {/* Header */}
        <section className="enzy-hero-reveal pb-10 md:pb-14 text-center flex flex-col items-center">
          <BlurReveal
            as="h1"
            delay={0.1}
            className={`font-ivyora font-medium tracking-[-2px] leading-[1.05] text-[40px] sm:text-[50px] md:text-[64px] max-w-3xl ${pageTitle}`}
          >
            Let&apos;s talk
          </BlurReveal>
          <p
            className={`mt-6 font-inter text-[16px] md:text-[18px] leading-relaxed max-w-2xl ${pageBody}`}
          >
            Whether you&apos;re exploring Enzy or already on the platform, our
            team is here to help. Reach out and we&apos;ll get back to you fast.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: contact methods */}
          <div className="flex flex-col gap-5">
            {methods.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className={`rounded-[24px] border p-6 md:p-7 transition-colors liquid-glass ${cardClass}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#19ad7d]/12 border border-[#19ad7d]/30 text-[#19ad7d]">
                      <Icon size={20} strokeWidth={1.75} aria-hidden />
                    </span>
                    <div>
                      <h2 className="font-ivyora font-medium text-[22px] tracking-[-0.5px] text-black dark:text-white">
                        {m.title}
                      </h2>
                      <p className={`font-inter text-[13px] ${pageBody}`}>
                        {m.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href={`mailto:${m.email}`}
                      className="group inline-flex items-center gap-2.5 font-inter text-[15px] transition-colors text-black/80 dark:text-white/80 hover:text-[#19ad7d]"
                    >
                      <Mail size={16} className="text-[#19ad7d]" aria-hidden />
                      {m.email}
                    </a>
                    <a
                      href={CONTACT_PHONE_HREF}
                      className="group inline-flex items-center gap-2.5 font-inter text-[15px] transition-colors text-black/80 dark:text-white/80 hover:text-[#19ad7d]"
                    >
                      <Phone size={16} className="text-[#19ad7d]" aria-hidden />
                      {m.phone}
                    </a>
                  </div>
                </div>
              );
            })}

            {/* Address */}
            <div
              className={`rounded-[24px] border p-6 md:p-7 transition-colors liquid-glass ${cardClass}`}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#19ad7d]/12 border border-[#19ad7d]/30 text-[#19ad7d]">
                  <MapPin size={20} strokeWidth={1.75} aria-hidden />
                </span>
                <div className="font-inter text-[15px] leading-relaxed text-black/80 dark:text-white/80">
                  4100 N Chapel Ridge Rd, Suite 300
                  <br />
                  Lehi, Utah 84043
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className={`rounded-[28px] border p-6 md:p-8 ${cardClass}`}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center text-center h-full py-10"
              >
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#19ad7d]/15 border border-[#19ad7d]/30 text-[#19ad7d] mb-5">
                  <Check size={26} strokeWidth={2.5} aria-hidden />
                </span>
                <h2 className="font-ivyora font-medium text-[26px] tracking-[-0.5px] text-black dark:text-white">
                  Thanks for reaching out!
                </h2>
                <p className={`mt-3 font-inter text-[15px] max-w-sm ${pageBody}`}>
                  Your email client should have opened with your message. If it
                  didn&apos;t, email us directly at{" "}
                  <a href={`mailto:${SALES_EMAIL}`} className="text-[#19ad7d]">
                    {SALES_EMAIL}
                  </a>
                  .
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Work email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={inputClass}
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label htmlFor="reason" className={labelClass}>
                    How can we help?
                  </label>
                  <select
                    id="reason"
                    value={form.reason}
                    onChange={(e) =>
                      setForm({ ...form, reason: e.target.value as Reason })
                    }
                    className={inputClass}
                  >
                    <option value="sales">Talk to Sales</option>
                    <option value="support">Get Support</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us a bit about what you're looking for…"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2.5 w-full rounded-full px-7 py-4 font-inter font-semibold text-[15px] text-white border-[0.8px] border-[rgba(255,255,255,0.9)] bg-[linear-gradient(189.6deg,rgba(25,173,125,0.95)_25.1%,rgba(20,144,103,0.95)_64.2%)] shadow-[0_0_28px_rgba(25,173,125,0.3)] transition-transform hover:opacity-95 active:scale-[0.99]"
                >
                  Send message
                  <ArrowRight
                    size={17}
                    strokeWidth={2.25}
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
