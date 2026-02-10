"use client";

import Image from "next/image";

const photos = [
  { src: "/photos/70CBFE0B-5D12-4667-8A07-EA518022D638.jpg", alt: "Dhruva photo 1", rotate: "rotate-2" },
  { src: "/photos/IMG_4176.jpg", alt: "Dhruva photo 2", rotate: "-rotate-3" },
  { src: "/photos/IMG_4253.jpg", alt: "Dhruva photo 3", rotate: "rotate-1" },
  { src: "/photos/IMG_4320.jpg", alt: "Dhruva photo 4", rotate: "-rotate-2" },
  { src: "/photos/IMG_4771.jpg", alt: "Dhruva photo 5", rotate: "rotate-3" },
  { src: "/photos/IMG_4790.jpg", alt: "Dhruva photo 6", rotate: "-rotate-1" },
  { src: "/photos/IMG_4850.jpg", alt: "Dhruva photo 7", rotate: "rotate-2" },
  { src: "/photos/IMG_5042.jpg", alt: "Dhruva photo 8", rotate: "-rotate-3" },
  { src: "/photos/IMG_5150.jpg", alt: "Dhruva photo 9", rotate: "rotate-1" },
  { src: "/photos/IMG_5224.jpg", alt: "Dhruva photo 10", rotate: "-rotate-2" },
];

export default function PhotoGallery() {
  return (
    <section id="gallery" className="relative py-20 bg-mickey-red/5">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="text-mickey-red">Precious</span>{" "}
          <span className="text-mickey-black">Moments</span>
        </h2>
        <p className="text-gray-500 text-center mb-16 text-lg">
          A look at Dhruva&apos;s amazing first year
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 px-4 md:px-8">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`group relative bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-lg transition-all duration-500 hover:z-20 hover:scale-110 hover:shadow-2xl ${photo.rotate} hover:rotate-0`}
            >
              {/* Tape Effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/30 backdrop-blur-sm border border-white/40 shadow-sm rotate-1 z-10 opacity-70" />

              <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>

              {/* Mickey Head watermark/decoration on polaroid */}
              <div className="absolute bottom-4 right-4 opacity-10">
                <div className="relative w-8 h-8">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-mickey-black rounded-full" />
                  <div className="absolute -top-2 -left-2 w-5 h-5 bg-mickey-black rounded-full" />
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-mickey-black rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
