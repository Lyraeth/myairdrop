"use client";

import { motion } from "motion/react";

export default function PageTransition({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { ease: ["easeIn", "easeOut"], duration: 1 },
            }}
        >
            {children}
        </motion.div>
    );
}
