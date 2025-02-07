"use client";

import { SessionProvider } from "next-auth/react";

export default function LayoutSession({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <SessionProvider>{children}</SessionProvider>;
}
