"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RefreshButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return (
        <Button
            className="neoshadows bg-base3 hover:bg-base3 text-black"
            disabled={isPending}
            onClick={() => {
                startTransition(() => {
                    router.refresh();
                });
            }}
        >
            {isPending ? "Refreshing..." : <RefreshCcw />}
        </Button>
    );
}
