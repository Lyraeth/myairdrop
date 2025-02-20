"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import WalletActions from "@/app/wallet/components/WalletActions";
import { Wallets } from "@/lib/type/Wallets";

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
        id: "action",
        cell: ({ row }) => {
            const crud = row.original;
            return <WalletActions walletId={crud.id} address={crud.address} />;
        },
    },
];
