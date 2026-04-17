"use client";

import React from "react";
import { useTheme } from "./components/ThemeProvider";

export function Privacy() {
  const { isLightMode } = useTheme();

  return (
    <main className={`w-full pt-8 md:pt-16 lg:pt-24 pb-16 px-4 md:px-12 lg:px-20 max-w-4xl mx-auto ${isLightMode ? 'text-[#0b0f14]' : 'text-[#f5f7fa]'}`}>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-['Inter']">Privacy Policy</h1>
        <p className="opacity-70 mb-8 font-['Inter'] text-sm">Effective Date: August 09, 2024</p>
        
        <div className={`prose max-w-none ${isLightMode ? 'prose-slate' : 'prose-invert'} prose-headings:font-['Inter'] prose-p:font-['Inter'] prose-a:text-[#19ad7d]`}>
          <p className="mb-4">Thank you for doing business with Enzy Technologies, LLC (“Enzy,” “Company,” “we,” “our,” or “us”). We welcome you and hope you find our websites, web applications, mobile application, and our other services and tools (collectively, the “Services”) helpful and useful. We have adopted this privacy policy (“Privacy Policy”) to help our website visitors, contractors, employees, current and potential customers, end users, and other business partners (“you” or “your,”) understand what Data we process, how and why we do so, and what your rights are regarding that Data.</p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4 uppercase tracking-tight">Description of Services</h2>
          <p className="mb-4">We provide access to our unique mobile and web application “Enzy” that allows organizations to manage and build their operations in a positive and holistic manner. In this Privacy Policy, all tools and services made available in connection with our operations, including our website, web applications, mobile application, tools, and any other services that we provide directly to you, whether now known or developed later, are included in the term “Services.”</p>

          <h2 className="text-2xl font-bold mt-10 mb-4 uppercase tracking-tight">Lawful Basis for Processing</h2>
          <p className="mb-4">Many jurisdictions require that we disclose to you the lawful basis for our processing of your Data. In general, our lawful basis for processing your Data is based on your specific consent or your contract with us.</p>
          <p className="mb-4">By accessing or using any of the Services or by otherwise interacting with us online, you consent to our processing of your Data as described in this Privacy Policy. If our processing of your Data is based on your consent, you may withdraw your consent at any time, and we will cease processing your Data.</p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4 uppercase tracking-tight">Intended Users</h2>
          <p className="mb-4">Other than for Data processed for the specific purpose of providing the Services to users, we do not knowingly process Data from users who are under 13. If we become aware that we have processed Data from a person under 13, except to provide the Services to such person, and except to the extent allowed or required by law, then we will attempt to delete such Data as soon as possible.</p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4 uppercase tracking-tight">Data We Process and How We Use It</h2>
          
          <h3 className="text-xl font-bold mt-8 mb-2">A. Registration Data</h3>
          <p className="mb-4"><strong>Data Description:</strong> Registration Data may consist of the name, email address, street address, other contact information, and other information you provide us using the Services.</p>
          <p className="mb-4"><strong>Lawful Basis for Processing:</strong> Our lawful basis for processing Registration Data is our contract with you and your consent.</p>
          <p className="mb-4"><strong>How We Use It and Who We Share It With:</strong> Registration Data is accessible generally only to us and to you. We use it to provide the Services to you and may share it with our service providers to help us provide the Services.</p>

          <h3 className="text-xl font-bold mt-8 mb-2">B. Engagement Data</h3>
          <p className="mb-4"><strong>Data Description:</strong> Engagement Data consists of all the information you input or record using the Services.</p>
          <p className="mb-4"><strong>Lawful Basis for Processing:</strong> Our lawful basis for processing Engagement Data is (1) our contract with you, (2) our obligation to provide you with the Services, and (3) our legitimate interest in improving our Services.</p>
          
          <div className="mt-16 pt-8 border-t border-current/10">
            <p className="text-sm opacity-70">For privacy inquiries or to exercise your rights, please contact us at info@enzy.co</p>
          </div>
        </div>
      </main>
  );
}