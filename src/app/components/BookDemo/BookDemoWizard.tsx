"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";

export type BookDemoSubmission = {
  firstName: string;
  lastName: string;
  email: string;
  companySize: string;
  phone: string;
  contactPreference: "email" | "text";
  salesEmployeesRange: "1-10" | "10-50" | "50-100" | "100+";
};

type StepKey = keyof BookDemoSubmission;

type Step = {
  key: StepKey;
  title: string;
  helper?: string;
};

const STEPS: Step[] = [
  { key: "firstName", title: "What’s your first name?" },
  { key: "lastName", title: "And your last name?" },
  { key: "email", title: "What email should we use?" },
  {
    key: "companySize",
    title: "How big is your company?",
    helper: "This helps us route you to the right demo.",
  },
  { key: "phone", title: "What’s the best phone number?" },
  { key: "contactPreference", title: "How should we contact you?" },
  {
    key: "salesEmployeesRange",
    title: "How many sales employees do you have?",
    helper: "Pick the closest range.",
  },
];

const SALES_RANGE_OPTIONS: Array<BookDemoSubmission["salesEmployeesRange"]> = [
  "1-10",
  "10-50",
  "50-100",
  "100+",
];

const COMPANY_SIZE_OPTIONS = [
  { value: "1-10", label: "1–10" },
  { value: "11-50", label: "11–50" },
  { value: "51-200", label: "51–200" },
  { value: "201-500", label: "201–500" },
  { value: "501-1000", label: "501–1,000" },
  { value: "1000+", label: "1,000+" },
  { value: "not-sure", label: "Not sure" },
];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function BookDemoWizard({
  onSubmitted,
}: {
  onSubmitted: (submission: BookDemoSubmission) => void;
}) {
  const { isLightMode } = useTheme();
  const [stepIdx, setStepIdx] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<BookDemoSubmission>({
    firstName: "",
    lastName: "",
    email: "",
    companySize: "",
    phone: "",
    contactPreference: "email",
    salesEmployeesRange: "10-50",
  });

  const step = STEPS[stepIdx];
  const progress = (stepIdx + 1) / STEPS.length;

  const canGoBack = stepIdx > 0 && !isSubmitting;

  const isStepValid = useMemo(() => {
    switch (step.key) {
      case "firstName":
      case "lastName":
        return data[step.key].trim().length >= 1;
      case "email":
        return emailRe.test(data.email.trim());
      case "companySize":
        return data.companySize.trim().length > 0;
      case "phone":
        // minimal validation; keep permissive
        return data.phone.trim().length >= 7;
      case "contactPreference":
        return data.contactPreference === "email" || data.contactPreference === "text";
      case "salesEmployeesRange":
        return SALES_RANGE_OPTIONS.includes(data.salesEmployeesRange);
      default:
        return false;
    }
  }, [data, step.key]);

  const goNext = async () => {
    if (isSubmitting) return;
    setError(null);
    if (!isStepValid) return;

    if (stepIdx < STEPS.length - 1) {
      setStepIdx((s) => s + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error(payload?.error ?? "Submission failed");
      }
      onSubmitted(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    if (!canGoBack) return;
    setError(null);
    setStepIdx((s) => Math.max(0, s - 1));
  };

  const labelColor = isLightMode ? "text-black/50" : "text-white/40";
  const titleColor = isLightMode ? "text-brand-dark" : "text-brand-light";
  const errorColor = "text-red-500";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3">
        <p className={`font-['Inter'] text-[11px] tracking-[0.14em] uppercase font-semibold ${labelColor}`}>
          Step {stepIdx + 1} of {STEPS.length}
        </p>
        <div className="flex items-center gap-1.5">
          {STEPS.map((s, i) => {
            const done = i < stepIdx;
            const active = i === stepIdx;
            return (
              <span
                key={s.key}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  done ? "bg-[#19ad7d]" : active ? (isLightMode ? "bg-black/35" : "bg-white/35") : (isLightMode ? "bg-black/10" : "bg-white/10")
                }`}
                aria-hidden
              />
            );
          })}
        </div>
      </div>

      <div className={`mt-3 h-1.5 w-full rounded-full ${isLightMode ? "bg-black/10" : "bg-white/10"}`} aria-hidden>
        <div
          className="h-full rounded-full bg-[#19ad7d] transition-[width] duration-300"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className={`font-['IvyOra_Text'] font-medium tracking-[-1px] ${titleColor} text-[26px] sm:text-[30px]`}>
              {step.title}
            </h2>
            {step.helper ? (
              <p className={`mt-2 font-['Inter'] text-[13px] ${isLightMode ? "text-black/60" : "text-white/55"}`}>
                {step.helper}
              </p>
            ) : null}

            <div className="mt-6">
              {step.key === "firstName" ? (
                <Input
                  autoFocus
                  value={data.firstName}
                  onChange={(e) => setData((d) => ({ ...d, firstName: e.target.value }))}
                  placeholder="First name"
                  className="h-11 rounded-xl"
                />
              ) : null}

              {step.key === "lastName" ? (
                <Input
                  autoFocus
                  value={data.lastName}
                  onChange={(e) => setData((d) => ({ ...d, lastName: e.target.value }))}
                  placeholder="Last name"
                  className="h-11 rounded-xl"
                />
              ) : null}

              {step.key === "email" ? (
                <Input
                  autoFocus
                  value={data.email}
                  onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                  placeholder="name@company.com"
                  type="email"
                  inputMode="email"
                  className="h-11 rounded-xl"
                />
              ) : null}

              {step.key === "companySize" ? (
                <Select
                  value={data.companySize}
                  onValueChange={(v) => setData((d) => ({ ...d, companySize: v }))}
                >
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select a range" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_SIZE_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : null}

              {step.key === "phone" ? (
                <Input
                  autoFocus
                  value={data.phone}
                  onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
                  placeholder="Phone number"
                  inputMode="tel"
                  className="h-11 rounded-xl"
                />
              ) : null}

              {step.key === "contactPreference" ? (
                <RadioGroup
                  value={data.contactPreference}
                  onValueChange={(v) =>
                    setData((d) => ({ ...d, contactPreference: v as BookDemoSubmission["contactPreference"] }))
                  }
                  className="grid gap-3"
                >
                  <label className={`flex items-center gap-3 rounded-2xl border p-4 cursor-pointer ${isLightMode ? "border-black/10 bg-black/[0.02]" : "border-white/10 bg-white/[0.03]"}`}>
                    <RadioGroupItem value="email" />
                    <div className="min-w-0">
                      <p className={`m-0 font-['Inter'] text-[14px] font-semibold ${titleColor}`}>Email</p>
                      <p className={`m-0 font-['Inter'] text-[12px] ${isLightMode ? "text-black/55" : "text-white/50"}`}>
                        We’ll follow up via email.
                      </p>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 rounded-2xl border p-4 cursor-pointer ${isLightMode ? "border-black/10 bg-black/[0.02]" : "border-white/10 bg-white/[0.03]"}`}>
                    <RadioGroupItem value="text" />
                    <div className="min-w-0">
                      <p className={`m-0 font-['Inter'] text-[14px] font-semibold ${titleColor}`}>Text</p>
                      <p className={`m-0 font-['Inter'] text-[12px] ${isLightMode ? "text-black/55" : "text-white/50"}`}>
                        We’ll follow up via SMS.
                      </p>
                    </div>
                  </label>
                </RadioGroup>
              ) : null}

              {step.key === "salesEmployeesRange" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SALES_RANGE_OPTIONS.map((range) => {
                    const selected = data.salesEmployeesRange === range;
                    return (
                      <button
                        key={range}
                        type="button"
                        onClick={() =>
                          setData((d) => ({ ...d, salesEmployeesRange: range }))
                        }
                        className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                          selected
                            ? "border-[#19ad7d]/55 bg-[#19ad7d]/[0.10]"
                            : isLightMode
                              ? "border-black/10 bg-black/[0.02] hover:bg-black/[0.04]"
                              : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                        }`}
                      >
                        <p className={`m-0 font-['Inter'] text-[14px] font-semibold ${titleColor}`}>
                          {range}
                        </p>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {error ? <p className={`mt-5 font-['Inter'] text-[13px] ${errorColor}`}>{error}</p> : null}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={!canGoBack}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-['Inter'] text-[13px] font-semibold transition-opacity ${
            canGoBack ? (isLightMode ? "text-black/70 hover:opacity-80" : "text-white/70 hover:opacity-80") : "opacity-30"
          }`}
        >
          <ArrowLeft size={14} strokeWidth={2.5} aria-hidden />
          Back
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!isStepValid || isSubmitting}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-['Inter'] text-[13px] font-semibold transition-opacity ${
            !isStepValid || isSubmitting ? "opacity-50" : "hover:opacity-95"
          } bg-[#19ad7d] text-white`}
        >
          {stepIdx === STEPS.length - 1 ? (
            <>
              {isSubmitting ? "Submitting..." : "Continue to calendar"}
              {isSubmitting ? null : <Check size={15} strokeWidth={2.5} aria-hidden />}
            </>
          ) : (
            <>
              Next
              <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

