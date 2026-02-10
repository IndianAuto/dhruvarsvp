import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
