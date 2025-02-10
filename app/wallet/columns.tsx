"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import WalletActions from "./components/WalletActions";

export type Wallets = {
    id: number;
    userId: string;
    name: string | null;
    address: string;
    check_extension: boolean | null;
    check_application: boolean | null;
};

export const columns: ColumnDef<Wallets>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "check_extension",
        header: "Extension?",
    },
    {
        accessorKey: "check_application",
        header: "Application?",
    },
    {
        id: "action",
        cell: ({ row }) => {
            return (
                <WalletActions
                    walletId={row.original.id}
                    address={row.original.address}
                />
            );
        },
    },
];
