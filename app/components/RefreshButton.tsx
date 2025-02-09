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
            className="neoshadows bg-teal-200 hover:bg-teal-400 text-black"
            variant={"default"}
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
