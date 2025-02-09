"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Wallets = {
    id: number;
    userId: string;
    name: string;
    address: string;
    check_extension: boolean;
    check_application: boolean;
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
            const rud = row.original;
            const router = useRouter();
            const [open, setOpen] = useState(false);
            const [showAlert, setShowAlert] = useState(false);

            const handleDelete = async () => {
                try {
                    const response = await fetch(
                        `/api/wallet/delete/${rud.id}`,
                        {
                            method: "DELETE",
                        }
                    );

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(
                            errorData.error || "Failed to delete wallet"
                        );
                    }

                    setOpen(false);
                    setShowAlert(true);
                    router.refresh();
                    setTimeout(() => setShowAlert(false), 3000);
                } catch (error) {
                    console.error("Error deleting wallet:", error);
                    alert("Failed to delete wallet");
                }
            };

            return (
                <>
                    {showAlert && (
                        <Alert
                            variant={"default"}
                            className="fixed bottom-5 left-5 w-[450px]"
                        >
                            <Trash2 />
                            <AlertTitle>Delete Successfully!</AlertTitle>
                            <AlertDescription>
                                Your wallet has been deleted. Please refresh the
                                page!
                            </AlertDescription>
                        </Alert>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open Menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(rud.address)
                                }
                            >
                                Copy wallet address
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex flex-row justify-between">
                                <Button className="neoshadows bg-sky-200/90 hover:bg-sky-400 text-black">
                                    <Eye />
                                </Button>
                                <Button className="neoshadows bg-yellow-200/90 hover:bg-yellow-400 text-black">
                                    <Pencil />
                                </Button>
                                <Button
                                    variant={"destructive"}
                                    className="neoshadows bg-red-200 text-black"
                                    onClick={() => setOpen(true)}
                                >
                                    <Trash2 />
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your wallet and remove
                                    your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            );
        },
    },
];
