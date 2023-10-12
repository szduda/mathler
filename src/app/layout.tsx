import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mathler - find the hidden equation",
  description:
    "Be like Pythagoras, son of Legolas, and solve math riddles every day.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={[inter.className, "overflow-x-hidden min-h-[100dvh]"].join(
          " "
        )}
      >
        {children}
      </body>
    </html>
  );
}
