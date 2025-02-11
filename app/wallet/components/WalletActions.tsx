"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
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

type WalletActionsProps = {
    walletId: number;
    address: string;
};

const WalletActions: React.FC<WalletActionsProps> = ({ walletId, address }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/wallet/delete/${walletId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete wallet");
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
                    className="fixed bottom-5 left-5 w-[400px] shadow-xl"
                >
                    <Trash2 className="h-4 w-4" />
                    <AlertTitle>Delete Successfully!</AlertTitle>
                    <AlertDescription>
                        Your wallet has been deleted
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
                        onClick={() => navigator.clipboard.writeText(address)}
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
                            This action cannot be undone. This will permanently
                            delete your wallet and remove your data from our
                            servers.
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
};

export default WalletActions;
