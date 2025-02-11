"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const titles: { [key: string]: string } = {
    "/": "Home",
    "/dashboard": "Dashboard",
    "/airdrop": "Airdrop",
    "/wallet": "Wallet",
};
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

export default function AppBreadcrumb() {
    const path = usePathname();
    const title = titles[path];
    return (
        <div className="mb-2">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link href={"/"}>Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <ChevronRight />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>{title}</BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
