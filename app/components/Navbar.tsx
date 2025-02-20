"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, List } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navItems = [
    {
        title: "Home",
        url: "/",
    },
    {
        title: "Dashboard",
        url: "/dashboard",
    },
    {
        title: "Airdrop",
        url: "/airdrop",
    },
    {
        title: "Wallet",
        url: "/wallet",
    },
];

export default function Navbar() {
    const router = useRouter();
    const path = usePathname();
    const { data: session } = useSession();

    return (
        <nav className="flex flex-row justify-center items-center p-4 border-b-4 border-black shadow-md bg-base1">
            <div className="flex flex-row justify-between items-center w-full">
                <DropdownMenu>
                    <DropdownMenuTrigger className="neoshadows px-2 py-1 bg-base3">
                        <div className="hidden md:block">MyAirdrop</div>
                        <List className="block md:hidden" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="block md:hidden my-2">
                        {navItems
                            .filter((item) => session || item.title === "Home")
                            .map((item) => (
                                <DropdownMenuItem key={item.url}>
                                    <Link href={item.url}>
                                        <span>{item.title}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="hidden md:block">
                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-row">
                            {navItems
                                .filter(() => session)
                                .map((item) => (
                                    <NavigationMenuItem
                                        key={item.url}
                                        className="flex"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.2 }}
                                            className="inline-block"
                                        >
                                            <Link
                                                href={item.url}
                                                className={cn(
                                                    "p-2",
                                                    path === item.url
                                                        ? "neoshadows bg-[#B9B28A]"
                                                        : ""
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        </motion.div>
                                    </NavigationMenuItem>
                                ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                {!session ? (
                    <Link
                        href="/api/auth/signin"
                        className="neoshadows px-2 py-1 bg-base3"
                    >
                        Login
                    </Link>
                ) : (
                    <>
                        <DropdownMenu>
                            <motion.div
                                whileTap={{ scale: 1.2 }}
                                transition={{ type: "spring" }}
                            >
                                <DropdownMenuTrigger className="px-4 py-1 neoshadows bg-[#B9B28A]">
                                    <motion.div whileTap={{ rotate: 180 }}>
                                        <Settings />
                                    </motion.div>
                                    <motion.div
                                        initial={{
                                            scale: 0,
                                        }}
                                        animate={{
                                            scale: 1,
                                        }}
                                        transition={{
                                            duration: 1,
                                        }}
                                    >
                                        <DropdownMenuContent className="my-2">
                                            {!session ? null : (
                                                <>
                                                    <DropdownMenuLabel>
                                                        Welcome!
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuItem>
                                                        {session?.user?.name}
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                            <DropdownMenuSeparator />
                                            <DropdownMenuLabel>
                                                My Account
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link
                                                    href={"/profile"}
                                                    className="w-full text-left"
                                                >
                                                    Profile
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <button
                                                    onClick={() =>
                                                        signOut({
                                                            callbackUrl: "/",
                                                        })
                                                    }
                                                    className="w-full text-left"
                                                >
                                                    Log out
                                                </button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </motion.div>
                                </DropdownMenuTrigger>
                            </motion.div>
                        </DropdownMenu>
                    </>
                )}
            </div>
        </nav>
    );
}
