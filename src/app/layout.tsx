import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "./utils/ReactQueryClientProvider";
import { UserProvider } from "./utils/UserProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Var",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </body>
      </UserProvider>
    </html>
  );
}