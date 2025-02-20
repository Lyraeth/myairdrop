"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import AirdropsActions from "@/app/airdrop/components/AirdropsActions";
import { Badge } from "@/components/ui/badge";
import { Airdrops } from "@/lib/type/Airdrops";

export const columns: ColumnDef<Airdrops>[] = [
    {
        accessorKey: "nameProject",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name Project
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "wallet.address",
        header: "Wallet Address",
    },
    {
        accessorKey: "wallet.name",
        header: "Wallet Name",
    },
    {
        accessorKey: "tags",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Tags
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const tags = row.original.tags;

            return tags.length === 0 ? (
                <span>No Tags</span>
            ) : (
                <div className="flex gap-1">
                    {tags.map((tag) => (
                        <Badge key={tag.id} className="bg-gray-400 text-black">
                            {tag.name}
                        </Badge>
                    ))}
                </div>
            );
        },
    },
    {
        id: "action",
        cell: ({ row }) => {
            const crud = row.original;
            return <AirdropsActions airdropId={crud.id} />;
        },
    },
];
