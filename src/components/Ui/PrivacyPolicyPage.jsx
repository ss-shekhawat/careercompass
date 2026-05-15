import React from "react";
import Buttons from "./Buttons";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-5xl w-full white-background shadow-2xl rounded-2xl border border-gray-200 overflow-hidden animate-fadeIn">
        <header className="flex items-center gap-4 p-6 border-b border-gray-200 bg-gradient-to-r from-[#c3e0e0]  to-[#c3e0e0]">
          <div className="flex-shrink-0">
            <Buttons
              onClick={() => window.history.back()}
              aria-label="Go back"
              className="flex items-center gap-2 px-4 py-2 rounded-lg primary-background white-text transition text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </Buttons>
          </div>
          <div className="flex-grow flex justify-center">
            <h1 className="text-xl md:text-2xl text-center font-bold primary-color ml-2 tracking-tight">
              Your Privacy at Career Mitra
            </h1>
          </div>
        </header>

        <main className="p-8 md:p-10 text-slate-700 leading-relaxed">
          <div className="prose prose-slate max-w-none">
            <p className="text-lg font-medium text-gray-700">
              At Career Mitra (Lohagarh Software Solutions Pvt Ltd.), we take
              your privacy seriously. Here’s a quick summary of how we handle
              your data:
            </p>

            <p className="mt-6 font-semibold primary-color">What we collect</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Basic details (like name, age, contact info)</li>
              <li>Education and assessment information</li>
              <li>
                Psychometric test answers &amp; reports (with your consent)
              </li>
              <li>Platform usage data (for improvements and security)</li>
            </ul>

            <p className="mt-6 font-semibold primary-color">How we use it</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>To give you personalized career and education guidance</li>
              <li>To connect you with expert counsellors</li>
              <li>To improve our platform and services</li>
              <li>To ensure your safety and comply with the law</li>
            </ul>

            <p className="mt-6 font-semibold primary-color">
              Who we share it with
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Only with your counsellors, psychologists, or schools (if you
                agree)
              </li>
              <li>
                Service providers who help us run the platform (under strict
                agreements)
              </li>
              <li>Authorities, only if required by law</li>
            </ul>

            <p className="mt-6 font-semibold primary-color">
              Your choices &amp; rights
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access and download your own data</li>
              <li>Correct or delete information</li>
              <li>Withdraw consent at any time</li>
              <li>Request us to stop using your data</li>
            </ul>

            <p className="mt-6 font-semibold primary-color">Data protection</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>We use strong encryption and secure servers</li>
              <li>Access is strictly controlled</li>
              <li>Parents’ consent is needed for students under 18</li>
            </ul>

            <p className="mt-6 font-semibold primary-color"> Questions?</p>

            <p>
              Write to us at{" "}
              <a
                href="mailto:contactus@career-mitra.com"
                className="primary-color font-medium cursor-pointer hover:underline"
              >
                contactus@career-mitra.com
              </a>{" "}
              – our team will be happy to help.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
