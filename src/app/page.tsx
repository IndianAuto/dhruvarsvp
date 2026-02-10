import HeroSection from "@/components/HeroSection";
import PhotoGallery from "@/components/PhotoGallery";
import RSVPForm from "@/components/RSVPForm";
import SectionWave from "@/components/SectionWave";
import {
  Confetti,
  FloatingMickeys,
  MickeyEars,
} from "@/components/MickeyDecorations";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      <Confetti />
      <FloatingMickeys />

      {/* Hero */}
      <HeroSection />

      {/* Wave Transition to Gallery */}
      <div className="relative z-10">
        <SectionWave color="#FEF2F2" position="bottom" /> {/* FEF2F2 is close to mickey-red/5 */}
      </div>

      {/* Photo Gallery */}
      <PhotoGallery />

      {/* Wave Transition to RSVP */}
      <div className="relative z-10">
        <SectionWave color="#FFFFFF" position="top" />
      </div>

      {/* RSVP Section - White Background */}
      <section id="rsvp" className="py-20 mickey-dots">
        <div className="max-w-lg mx-auto px-4">
          <div className="text-center mb-10">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-mickey-black">RSVP</span>{" "}
              <span className="text-mickey-red">Now!</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Let us know if you can join the celebration
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border-4 border-mickey-red/10 relative overflow-hidden">
            {/* Decorative Corner Ears */}
            <div className="absolute -top-6 -left-6 opacity-5">
              <MickeyEars size={100} color="#000000" />
            </div>

            <RSVPForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mickey-black text-white py-12 relative">
        {/* Top Wave for Footer */}
        <div className="absolute top-0 left-0 w-full transform -translate-y-full">
          <svg
            className="block w-full h-[40px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V56.44Z"
              fill="#1A1A1A"
            />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <MickeyEars size={40} color="#E31837" />
          </div>
          <p
            className="text-xl font-bold mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Dhruva&apos;s 1st Birthday
          </p>
          <p className="text-gray-400 text-sm">
            March 15, 2026 &bull; Celebration Gardens &bull; Winter Park, FL
          </p>
          <div className="flex justify-center gap-2 mt-4">
            {["#E31837", "#FFC72C", "#E31837", "#FFC72C", "#E31837"].map(
              (color, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
              )
            )}
          </div>
        </div>
      </footer>
    </main>
  );
}
