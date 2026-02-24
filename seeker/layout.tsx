import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI DOOMER | Daily AI News",
  description: "Superintelligence is months away. The world is changing fast. Don't blink.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-gray-100 font-mono">
        <header className="bg-gray-900 p-4 text-center text-red-500 glow-red text-4xl font-bold">AI DOOMER</header>
        {children}
      </body>
    </html>
  );
}
