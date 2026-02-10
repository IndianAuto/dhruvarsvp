"use client";

import { MickeyEars } from "./MickeyDecorations";

interface ThankYouProps {
  name: string;
  attending: boolean;
}

export default function ThankYou({ name, attending }: ThankYouProps) {
  return (
    <div className="text-center py-12 px-4">
      {/* Success checkmark */}
      <div className="mb-6">
        <svg
          className="check-animation w-20 h-20 mx-auto"
          viewBox="0 0 52 52"
        >
          <circle
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke={attending ? "#E31837" : "#6B7280"}
            strokeWidth="2"
          />
          <path
            fill="none"
            stroke={attending ? "#E31837" : "#6B7280"}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 27l8 8 16-16"
          />
        </svg>
      </div>

      <div className="flex justify-center mb-4">
        <MickeyEars size={40} color={attending ? "#E31837" : "#6B7280"} />
      </div>

      {attending ? (
        <>
          <h3
            className="text-3xl md:text-4xl font-bold text-mickey-red mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Yay! See you there!
          </h3>
          <p className="text-lg text-gray-600 mb-2">
            Thank you, <span className="font-bold">{name}</span>! We can&apos;t
            wait to celebrate with you!
          </p>
          <p className="text-gray-400">
            We&apos;ll send a reminder closer to the date.
          </p>
        </>
      ) : (
        <>
          <h3
            className="text-3xl md:text-4xl font-bold text-gray-600 mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            We&apos;ll miss you!
          </h3>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for letting us know, <span className="font-bold">{name}</span>.
          </p>
          <p className="text-gray-400">
            We hope to see you at the next celebration!
          </p>
        </>
      )}
    </div>
  );
}
