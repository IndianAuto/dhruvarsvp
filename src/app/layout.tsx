import type { Metadata } from "next";
import { Bubblegum_Sans, Nunito } from "next/font/google";
import "./globals.css";

const bubblegumSans = Bubblegum_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dhruva Turns ONE! 🎂 | RSVP",
  description:
    "You're invited to celebrate Dhruva's 1st Birthday! Join us for a magical Mickey Mouse themed brunch on March 15th.",
  openGraph: {
    title: "Dhruva Turns ONE! 🎂",
    description:
      "Join us for a magical Mickey Mouse themed brunch celebrating Dhruva's 1st Birthday!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bubblegumSans.variable} ${nunito.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
