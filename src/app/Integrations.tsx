"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { BlurReveal } from "./components/BlurReveal";

const FadeInSection = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

type Integration = {
  name: string;
  /** Brand domain used to fetch the logo. */
  domain: string;
};

type IntegrationCategory = {
  id: string;
  label: string;
  integrations: Integration[];
};

// Categories + ordering provided by the team. Within each category tools are
// ordered roughly most-common → least-common. Domains map to each tool's
// official site so the logo lookup resolves the correct brand mark.
const INTEGRATION_CATEGORIES: IntegrationCategory[] = [
  {
    id: "crm-sales",
    label: "CRM & Sales Platforms",
    integrations: [
      { name: "HubSpot", domain: "hubspot.com" },
      { name: "Salesforce", domain: "salesforce.com" },
      { name: "Zoho", domain: "zoho.com" },
      { name: "Monday.com", domain: "monday.com" },
      { name: "Pipedrive", domain: "pipedrive.com" },
      { name: "Keap", domain: "keap.com" },
      { name: "GoHighLevel", domain: "gohighlevel.com" },
      { name: "Insightly", domain: "insightly.com" },
      { name: "Podio", domain: "podio.com" },
      { name: "Follow Up Boss", domain: "followupboss.com" },
      { name: "AccuLynx", domain: "acculynx.com" },
      { name: "Enerflo", domain: "enerflo.com" },
      { name: "Sunbase", domain: "sunbasedata.com" },
      { name: "Leap", domain: "leaptodigital.com" },
      { name: "MarketSharp", domain: "marketsharp.com" },
      { name: "Rooflink", domain: "roof.link" },
      { name: "Bigin", domain: "bigin.com" },
      { name: "PipeSolar", domain: "pipe.solar" },
      { name: "Coperniq", domain: "coperniq.io" },
      { name: "Apruv", domain: "apruv.io" },
      { name: "RMRCloud", domain: "rmrcloud.com" },
    ],
  },
  {
    id: "field-service",
    label: "Field Service Management",
    integrations: [
      { name: "ServiceTitan", domain: "servicetitan.com" },
      { name: "Jobber", domain: "getjobber.com" },
      { name: "Housecall Pro", domain: "housecallpro.com" },
      { name: "Workiz", domain: "workiz.com" },
      { name: "Service Fusion", domain: "servicefusion.com" },
      { name: "Vagaro", domain: "vagaro.com" },
      { name: "FieldRoutes", domain: "fieldroutes.com" },
      { name: "PestPac", domain: "pestpac.com" },
      { name: "RealGreen", domain: "realgreen.com" },
      { name: "BrioStack", domain: "briostack.com" },
      { name: "ServSuite", domain: "live.theservicepro.net" },
      { name: "SuperMove", domain: "supermove.com" },
    ],
  },
  {
    id: "lead-comms",
    label: "Lead Generation & Communication",
    integrations: [
      { name: "CallRail", domain: "callrail.com" },
      { name: "LeadsPedia", domain: "leadspedia.com" },
      { name: "Retreaver", domain: "retreaver.com" },
      { name: "Total Lead Domination", domain: "tldcrm.com" },
      { name: "EnrollHere Dialer", domain: "enrollhere.com" },
      { name: "SparkEmp", domain: "sparkemp.io" },
    ],
  },
  {
    id: "data-pm",
    label: "Project Management & Databases",
    integrations: [
      { name: "Google Sheets", domain: "sheets.google.com" },
      { name: "Airtable", domain: "airtable.com" },
      { name: "Snowflake", domain: "snowflake.com" },
      { name: "BigQuery", domain: "cloud.google.com" },
      { name: "Smartsheet", domain: "smartsheet.com" },
      { name: "Quickbase", domain: "quickbase.com" },
    ],
  },
  {
    id: "erp-finance",
    label: "ERP, Finance & Ecommerce",
    integrations: [
      { name: "Shopify", domain: "shopify.com" },
      { name: "SAP", domain: "sap.com" },
      { name: "NetSuite", domain: "netsuite.com" },
      { name: "ShipHero", domain: "shiphero.com" },
    ],
  },
  {
    id: "fleet-other",
    label: "Fleet, Infrastructure & Other",
    integrations: [
      { name: "Zendesk", domain: "zendesk.com" },
      { name: "CloudFront", domain: "aws.amazon.com" },
      { name: "Motive", domain: "gomotive.com" },
      { name: "Geotab", domain: "geotab.com" },
      { name: "Linxup", domain: "linxup.com" },
      { name: "Subhub", domain: "subhub.io" },
      { name: "FastGem", domain: "fastgem.net" },
    ],
  },
];

const ALL_TAB = { id: "all", label: "All" };

function IntegrationCard({
  integration,
  index,
}: {
  integration: Integration;
  index: number;
}) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <FadeInSection delay={Math.min(index, 14) * 0.025} className="flex">
      <div className="group flex w-full flex-col items-center gap-3 text-center">
        <span
          className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl transition-all duration-300 group-hover:scale-110 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.35)] ring-1 ring-black/5 dark:ring-white/10"
        >
          {logoFailed ? (
            <span className="font-inter text-lg font-bold text-[#19ad7d]">
              {integration.name.charAt(0)}
            </span>
          ) : (
            // Plain <img> (not next/image) so a missing logo degrades to the
            // monogram fallback via onError — no broken-image icon and no
            // next.config remote-host setup required.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://www.google.com/s2/favicons?domain=${integration.domain}&sz=128`}
              alt={`${integration.name} logo`}
              width={32}
              height={32}
              loading="lazy"
              className="h-8 w-8 object-contain"
              onError={() => setLogoFailed(true)}
            />
          )}
        </span>
        <span
          className="font-inter text-[13px] font-medium leading-tight text-black/75 dark:text-white/75"
        >
          {integration.name}
        </span>
      </div>
    </FadeInSection>
  );
}

export function Integrations() {
  const [activeTab, setActiveTab] = useState<string>(ALL_TAB.id);

  const tabs = useMemo(
    () => [ALL_TAB, ...INTEGRATION_CATEGORIES.map((c) => ({ id: c.id, label: c.label }))],
    []
  );

  // For "all" we flatten every category in order; otherwise the active one.
  const visibleIntegrations = useMemo(() => {
    if (activeTab === ALL_TAB.id) {
      return INTEGRATION_CATEGORIES.flatMap((c) => c.integrations);
    }
    return (
      INTEGRATION_CATEGORIES.find((c) => c.id === activeTab)?.integrations ?? []
    );
  }, [activeTab]);

  return (
    <main className="relative w-full pb-24 md:pb-32">
      {/* Hero — padding matches the other directory-style pages so it sits
          the same distance below the fixed nav. */}
      <section className="relative w-full px-4 pt-7 md:pt-10 pb-12 md:pb-16 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <motion.div className="enzy-hero-reveal flex flex-col items-center max-w-4xl">
            <BlurReveal
              as="h1"
              className="font-ivyora font-medium text-[40px] sm:text-[50px] md:text-[64px] leading-[1.05] tracking-[-2px] text-center transition-colors duration-500 text-brand-dark dark:text-brand-light"
            >
              Integrated with the tools you use
            </BlurReveal>

            <p
              className="font-inter text-lg md:text-xl mt-8 max-w-2xl text-center leading-relaxed transition-colors duration-500 text-black/60 dark:text-white/60"
            >
              Connect Enzy to your existing tech stack to automatically track
              activities, update records, and trigger actions across 50+
              integrations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category tabs + integration directory */}
      <section id="directory" className="relative w-full px-4 max-w-7xl mx-auto">
        {/* `overflow-x-auto` makes overflow-y compute to `auto`, which clips
            the active pill's drop shadow. The generous `pt-2 pb-7` gives the
            shadow room to render inside the scroll box; `-my-2`/`-mb-3`-style
            spacing is avoided so we instead trim the outer margin to keep the
            overall rhythm. */}
        <div
          className="flex gap-2 overflow-x-auto pt-2 pb-7 mb-9 md:mb-12 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          role="tablist"
          aria-label="Integration categories"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 font-inter text-[13px] font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[#19ad7d] border-[#19ad7d] text-white shadow-[0_6px_18px_rgba(25,173,125,0.30)]"
                    : "border-black/10 bg-white/90 dark:bg-white/[0.18] backdrop-blur-md text-black/65 dark:text-white/65 hover:text-black hover:border-black/20 dark:border-white/10 dark:hover:text-white dark:hover:border-white/25"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          key={activeTab}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-x-4 gap-y-8 md:gap-y-10"
        >
          {visibleIntegrations.map((integration, i) => (
            <IntegrationCard
              key={`${activeTab}-${integration.name}`}
              integration={integration}
              index={i}
            />
          ))}
        </div>

        <FadeInSection delay={0.2} className="mt-16 text-center">
          <p className="font-inter text-sm md:text-base mx-auto max-w-2xl leading-relaxed text-black/60 dark:text-white/60">
            Don&apos;t see your tool? We&apos;re adding new integrations
            constantly, and we&apos;ll build custom ones when a customer needs
            them.{" "}
            <Link href="/book-a-demo" className="text-[#19ad7d] hover:underline font-semibold">
              Book a demo
            </Link>{" "}
            and let&apos;s map Enzy to your stack.
          </p>
        </FadeInSection>
      </section>
    </main>
  );
}
