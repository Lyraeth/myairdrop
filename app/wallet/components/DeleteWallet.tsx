import { toast } from "sonner";
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

type WalletDeleteActionsProps = {
    walletId: number;
    openDeleteWallet: boolean;
    onOpenChange: (open: boolean) => void;
};

const DeleteWallet: React.FC<WalletDeleteActionsProps> = ({
    walletId,
    openDeleteWallet,
    onOpenChange,
}) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/wallet/delete/${walletId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete wallet");
            }
            onOpenChange(false);
            toast("Delete wallet successfully!");
        } catch (error) {
            console.error("Error deleting wallet:", error);
            alert("Failed to delete wallet");
        }
    };

    return (
        <AlertDialog open={openDeleteWallet} onOpenChange={onOpenChange}>
            <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-semibold">
                        Delete Wallet
                    </AlertDialogTitle>
                    <AlertDialogDescription className="mt-4 text-gray-600">
                        Are you absolutely sure you want to delete this wallet?
                        This action cannot be undone and will permanently remove
                        your wallet data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-6">
                    <AlertDialogCancel className="neoshadows bg-base3">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="neoshadows bg-base4 hover:bg-base4 text-black"
                    >
                        Delete Wallet
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteWallet;
