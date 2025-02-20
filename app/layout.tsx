import type { Metadata } from "next";
import { Overpass } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";
import LayoutSession from "@/app/components/LayoutSession";
import { Toaster } from "@/components/ui/sonner";

const overpass = Overpass({
    weight: ["400"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "MyAirdrop",
    description: "Manage your airdrop",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <LayoutSession>
                <body
                    className={`${overpass.className} top-0 bottom-0 right-0 left-0 h-full w-full bg-base2 text-black`}
                >
                    <Navbar />
                    {children}
                    <Toaster />
                </body>
            </LayoutSession>
        </html>
    );
}
