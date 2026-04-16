"use client";

import React from "react";
import { useTheme } from "./components/ThemeProvider";

export function Terms() {
  const { isLightMode } = useTheme();

  return (
    <main className={`w-full pt-8 md:pt-16 lg:pt-24 pb-16 px-4 md:px-12 lg:px-20 max-w-4xl mx-auto ${isLightMode ? 'text-[#0b0f14]' : 'text-[#f5f7fa]'}`}>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 font-['Inter']">Terms and Conditions</h1>
        <div className={`prose max-w-none ${isLightMode ? 'prose-slate' : 'prose-invert'} prose-headings:font-['Inter'] prose-p:font-['Inter'] prose-a:text-[#19ad7d]`}>
          <p className="mb-4">These Terms and Conditions (“Terms”) sets forth the terms and conditions that apply to access and use of the Services of Enzy Technologies, LLC (“Provider”) by the customer set forth on an Order Form submitted to Provider (“Customer”). These Terms, together with any Order Form, SOW, and Privacy Policy constitute the “Agreement.”</p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">1. Definitions</h2>
          <p className="mb-4"><strong>1.1. “Access Credentials”</strong> means any username, identification number, password, or security code used to access and use the Services.</p>
          <p className="mb-4"><strong>1.2. “Authorized Users”</strong> means Customer’s employees, consultants, and agents authorized to use the Services.</p>
          <p className="mb-4"><strong>1.3. “Customer Data”</strong> means information, data, and content processed by Customer through the Services.</p>
          <p className="mb-4"><strong>1.4. “Data Protection Laws”</strong> mean applicable privacy laws related to Personal Information.</p>
          <p className="mb-4"><strong>1.5. “Services”</strong> means Provider’s services identified on the Order Form and each SOW.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">2. Services</h2>
          <p className="mb-4"><strong>2.1. License and Use.</strong> Subject to compliance with the Agreement, Provider grants Customer a non-exclusive, limited, revocable, non-transferable right to access and use the Services during the Term.</p>
          <p className="mb-4"><strong>2.2. Use Restrictions.</strong> Customer shall not copy, modify, adapt, reverse engineer, or otherwise attempt to discover the source code of the Services.</p>
          <p className="mb-4"><strong>2.3. Community Guidelines.</strong> Users must not harass, disrupt, impersonate, or share harmful/inappropriate material on the Services.</p>
          <p className="mb-4"><strong>2.4. Changes.</strong> Provider reserves the right to make changes to the Services to maintain quality, competitive strength, or comply with Law.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">3. Fees and Payment</h2>
          <p className="mb-4">Customer shall pay Provider the fees set forth in the Order Form or any applicable SOW. Any amount not paid when due is subject to finance charges.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">4. Confidentiality</h2>
          <p className="mb-4">Each Party shall protect the Confidential Information of the other Party from unauthorized use, access, or disclosure using at least the degree of care it uses for its own sensitive information.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">5. Intellectual Property Rights</h2>
          <p className="mb-4">Provider retains sole and exclusive ownership of all right, title, and interest in and to the Services and underlying data. Customer retains ownership of Customer Data.</p>
          
          <div className="mt-16 pt-8 border-t border-current/10">
            <p className="text-sm opacity-70">For the complete Terms and Conditions, please contact us at info@enzy.co</p>
          </div>
        </div>
      </main>
  );
}