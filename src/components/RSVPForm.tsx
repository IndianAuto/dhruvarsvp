"use client";

import { useState } from "react";
import { MickeyEars } from "./MickeyDecorations";
import ThankYou from "./ThankYou";

const DIETARY_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Halal",
  "Nut allergy",
  "None",
];

interface FormData {
  fullName: string;
  email: string;
  attending: boolean | null;
  guestCount: number;
  dietaryPreferences: string[];
  dietaryOther: string;
  arrivingByAir: boolean;
  airport: string;
  arrivalDatetime: string;
  needAccommodation: boolean;
  checkInDate: string;
  checkOutDate: string;
  notes: string;
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    attending: null,
    guestCount: 1,
    dietaryPreferences: [],
    dietaryOther: "",
    arrivingByAir: false,
    airport: "",
    arrivalDatetime: "",
    needAccommodation: false,
    checkInDate: "",
    checkOutDate: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleDietaryChange = (option: string) => {
    setFormData((prev) => {
      if (option === "None") {
        return { ...prev, dietaryPreferences: ["None"], dietaryOther: "" };
      }
      const filtered = prev.dietaryPreferences.filter((p) => p !== "None");
      if (filtered.includes(option)) {
        return {
          ...prev,
          dietaryPreferences: filtered.filter((p) => p !== option),
        };
      }
      return { ...prev, dietaryPreferences: [...filtered, option] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <ThankYou
        name={formData.fullName}
        attending={formData.attending ?? false}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-bold text-mickey-black mb-1">
          Full Name <span className="text-mickey-red">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.fullName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, fullName: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-mickey-red focus:outline-none transition-colors text-mickey-black"
          placeholder="Your full name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-bold text-mickey-black mb-1">
          Email <span className="text-mickey-red">*</span>
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-mickey-red focus:outline-none transition-colors text-mickey-black"
          placeholder="your@email.com"
        />
      </div>

      {/* Attending */}
      <div>
        <label className="block text-sm font-bold text-mickey-black mb-2">
          Will you be attending? <span className="text-mickey-red">*</span>
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, attending: true }))
            }
            className={`flex-1 py-3 px-6 rounded-xl border-2 font-bold transition-all ${
              formData.attending === true
                ? "border-mickey-red bg-mickey-red text-white shadow-lg"
                : "border-gray-200 hover:border-mickey-red/50 text-gray-600"
            }`}
          >
            Yes, count me in!
          </button>
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                attending: false,
                guestCount: 1,
                arrivingByAir: false,
                needAccommodation: false,
              }))
            }
            className={`flex-1 py-3 px-6 rounded-xl border-2 font-bold transition-all ${
              formData.attending === false
                ? "border-gray-400 bg-gray-400 text-white shadow-lg"
                : "border-gray-200 hover:border-gray-400 text-gray-600"
            }`}
          >
            Sorry, can&apos;t make it
          </button>
        </div>
      </div>

      {/* Conditional fields shown only if attending */}
      {formData.attending === true && (
        <>
          {/* Guest count */}
          <div>
            <label className="block text-sm font-bold text-mickey-black mb-1">
              Number of Guests (including yourself)
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    guestCount: Math.max(1, prev.guestCount - 1),
                  }))
                }
                className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-mickey-red flex items-center justify-center font-bold text-lg transition-colors"
              >
                -
              </button>
              <span className="text-2xl font-bold text-mickey-red w-12 text-center">
                {formData.guestCount}
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    guestCount: Math.min(10, prev.guestCount + 1),
                  }))
                }
                className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-mickey-red flex items-center justify-center font-bold text-lg transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Dietary Preferences */}
          <div>
            <label className="block text-sm font-bold text-mickey-black mb-2">
              Dietary Preferences
            </label>
            <div className="flex flex-wrap gap-2">
              {DIETARY_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleDietaryChange(option)}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all ${
                    formData.dietaryPreferences.includes(option)
                      ? "border-mickey-red bg-mickey-red text-white"
                      : "border-gray-200 hover:border-mickey-red/50 text-gray-600"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {formData.dietaryPreferences.some((p) => p !== "None") && (
              <input
                type="text"
                value={formData.dietaryOther}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dietaryOther: e.target.value,
                  }))
                }
                className="w-full mt-3 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-mickey-red focus:outline-none transition-colors text-mickey-black"
                placeholder="Any other dietary requirements..."
              />
            )}
          </div>

          {/* Arriving by air */}
          <div>
            <label className="block text-sm font-bold text-mickey-black mb-2">
              Are you arriving by air?
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, arrivingByAir: true }))
                }
                className={`px-6 py-2 rounded-xl border-2 font-semibold transition-all ${
                  formData.arrivingByAir
                    ? "border-mickey-yellow bg-mickey-yellow text-mickey-black shadow-md"
                    : "border-gray-200 hover:border-mickey-yellow/50 text-gray-600"
                }`}
              >
                Yes, flying in
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    arrivingByAir: false,
                    airport: "",
                    arrivalDatetime: "",
                    needAccommodation: false,
                    checkInDate: "",
                    checkOutDate: "",
                  }))
                }
                className={`px-6 py-2 rounded-xl border-2 font-semibold transition-all ${
                  !formData.arrivingByAir
                    ? "border-gray-300 bg-gray-100 text-mickey-black"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                No, driving/local
              </button>
            </div>
          </div>

          {/* Airport & Arrival details */}
          {formData.arrivingByAir && (
            <>
              <div className="pl-4 border-l-4 border-mickey-yellow space-y-4">
                <div>
                  <label className="block text-sm font-bold text-mickey-black mb-1">
                    Which airport?
                  </label>
                  <input
                    type="text"
                    value={formData.airport}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        airport: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-mickey-yellow focus:outline-none transition-colors text-mickey-black"
                    placeholder="e.g., MCO (Orlando International)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-mickey-black mb-1">
                    Arrival Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.arrivalDatetime}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        arrivalDatetime: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-mickey-yellow focus:outline-none transition-colors text-mickey-black"
                  />
                </div>

                {/* Need accommodation */}
                <div>
                  <label className="block text-sm font-bold text-mickey-black mb-2">
                    Need help with accommodation?
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          needAccommodation: true,
                        }))
                      }
                      className={`px-6 py-2 rounded-xl border-2 font-semibold transition-all ${
                        formData.needAccommodation
                          ? "border-mickey-yellow bg-mickey-yellow text-mickey-black shadow-md"
                          : "border-gray-200 hover:border-mickey-yellow/50 text-gray-600"
                      }`}
                    >
                      Yes, please!
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          needAccommodation: false,
                          checkInDate: "",
                          checkOutDate: "",
                        }))
                      }
                      className={`px-6 py-2 rounded-xl border-2 font-semibold transition-all ${
                        !formData.needAccommodation
                          ? "border-gray-300 bg-gray-100 text-mickey-black"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      No, I&apos;m all set
                    </button>
                  </div>
                </div>

                {/* Accommodation dates */}
                {formData.needAccommodation && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-mickey-black mb-1">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        value={formData.checkInDate}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            checkInDate: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-mickey-yellow focus:outline-none transition-colors text-mickey-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-mickey-black mb-1">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        value={formData.checkOutDate}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            checkOutDate: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-mickey-yellow focus:outline-none transition-colors text-mickey-black"
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-bold text-mickey-black mb-1">
              Any special notes or messages?
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-mickey-red focus:outline-none transition-colors resize-none text-mickey-black"
              placeholder="Birthday wishes, special requests..."
            />
          </div>
        </>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Submit */}
      {formData.attending !== null && (
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 rounded-xl font-bold text-lg text-white bg-mickey-red hover:bg-mickey-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          style={{
            animation: !submitting ? "pulse-ring 2s infinite" : "none",
          }}
        >
          {submitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Sending...
            </>
          ) : (
            <>
              <MickeyEars size={20} color="#FFFFFF" />
              {formData.attending
                ? "RSVP - See You There!"
                : "Send My Regrets"}
            </>
          )}
        </button>
      )}
    </form>
  );
}
