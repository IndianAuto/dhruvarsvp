"use client";

import Image from "next/image";
import { MickeyEars } from "./MickeyDecorations";
import CountdownTimer from "./CountdownTimer";

export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-0 min-h-[90vh] flex flex-col items-center justify-center mickey-dots overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-mickey-yellow/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-mickey-red/20 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">
        {/* Mickey ears above photo */}
        <div className="flex justify-center mb-4 float-animation">
          <MickeyEars size={70} color="#E31837" />
        </div>

        {/* Dhruva's photo in a Mickey-themed frame */}
        <div className="relative inline-block mb-6">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-mickey-red shadow-2xl mx-auto relative z-10">
            <Image
              src="/photos/IMG_5042.jpg"
              alt="Baby Dhruva"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 192px, 256px"
            />
          </div>
          {/* Decorative ears for the frame */}
          <div className="absolute -top-6 -left-6 z-0">
            <div className="w-24 h-24 bg-mickey-black rounded-full opacity-10" />
          </div>
          <div className="absolute -top-6 -right-6 z-0">
            <div className="w-24 h-24 bg-mickey-black rounded-full opacity-10" />
          </div>

          {/* Decorative dots around frame */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-mickey-yellow rounded-full z-20" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-mickey-red rounded-full z-20" />
        </div>

        {/* Title */}
        <h1
          className="text-5xl md:text-7xl font-bold mb-2 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="text-mickey-red">Dhruva</span>{" "}
          <span className="text-mickey-black">Turns</span>{" "}
          <span className="text-mickey-yellow drop-shadow-md">ONE!</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-6 font-semibold">
          You&apos;re invited to a magical birthday brunch!
        </p>

        {/* Countdown Timer */}
        <CountdownTimer targetDate="2026-03-15T10:00:00" />

        {/* Ticket Style Party Details */}
        <div className="max-w-2xl mx-auto mt-8 relative group cursor-default">
          {/* Ticket Body */}
          <div className="bg-white relative z-10 rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100 transform transition-transform hover:scale-105 duration-300">
            {/* Top Red Strip */}
            <div className="bg-mickey-red h-4 w-full" />

            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-0 items-center">

              {/* Left Side: Date */}
              <div className="flex-1 flex flex-col items-center justify-center text-center md:border-r-2 md:border-dashed md:border-gray-200 md:pr-6 relative">
                {/* Cutout circles for ticket effect */}
                <div className="absolute -top-[34px] -right-[34px] md:-top-[42px] md:-right-[13px] w-6 h-6 bg-transparent rounded-full md:hidden" />

                <svg className="w-10 h-10 mb-1" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="8" width="32" height="28" rx="4" stroke="#E31837" strokeWidth="2.5" />
                  <path d="M4 16h32" stroke="#E31837" strokeWidth="2.5" />
                  <rect x="4" y="8" width="32" height="8" rx="4" fill="#E31837" />
                  <line x1="12" y1="4" x2="12" y2="12" stroke="#E31837" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="28" y1="4" x2="28" y2="12" stroke="#E31837" strokeWidth="2.5" strokeLinecap="round" />
                  <text x="20" y="30" textAnchor="middle" fill="#E31837" fontSize="12" fontWeight="bold" fontFamily="var(--font-heading)">15</text>
                </svg>
                <p className="font-bold text-xl text-mickey-black" style={{ fontFamily: "var(--font-heading)" }}>
                  MARCH 15
                </p>
                <p className="text-gray-500 font-bold">Sunday</p>
                <p className="text-sm text-gray-400 mt-1">10:00 AM - 2:00 PM</p>
              </div>

              {/* Divider for Mobile */}
              <div className="w-full h-px border-t-2 border-dashed border-gray-200 md:hidden relative">
                <div className="absolute -left-8 -top-3 w-6 h-6 bg-[#f8fafc] rounded-full" />
                <div className="absolute -right-8 -top-3 w-6 h-6 bg-[#f8fafc] rounded-full" />
              </div>

              {/* Right Side: Location */}
              <div className="flex-1 flex flex-col items-center justify-center text-center md:pl-6">
                <span className="text-4xl mb-1">📍</span>
                <p className="font-bold text-xl text-mickey-black" style={{ fontFamily: "var(--font-heading)" }}>
                  Celebration Gardens
                </p>
                <p className="text-gray-500 text-sm max-w-[200px]">
                  1871 Minnesota Ave<br />Winter Park, FL 32789
                </p>
                <a
                  href="https://maps.google.com/?q=Celebration+Gardens+Winter+Park+FL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-xs text-mickey-red underline font-bold hover:text-mickey-black"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Bottom Yellow Strip */}
            <div className="bg-mickey-yellow h-4 w-full" />
          </div>

          {/* Ticket Shadow/Stack Effect */}
          <div className="absolute top-2 left-2 w-full h-full bg-gray-900/5 rounded-3xl -z-10 rotate-1" />
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 animate-bounce">
          <a
            href="#gallery"
            className="inline-block text-mickey-red hover:text-mickey-red/80 transition-colors"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
