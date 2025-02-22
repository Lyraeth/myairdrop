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

type AirdropDeleteActionsProps = {
    airdropId: string;
    openDeleteAirdrop: boolean;
    onOpenChange: (open: boolean) => void;
};

const DeleteAirdrop: React.FC<AirdropDeleteActionsProps> = ({
    airdropId,
    openDeleteAirdrop,
    onOpenChange,
}) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/airdrop/delete/${airdropId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete Airdrop");
            }
            onOpenChange(false);
            toast("Delete Airdrop successfully!");
        } catch (error) {
            console.error("Error deleting Airdrop:", error);
            alert("Failed to delete Airdrop");
        }
    };

    return (
        <AlertDialog open={openDeleteAirdrop} onOpenChange={onOpenChange}>
            <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-semibold">
                        Delete Airdrop
                    </AlertDialogTitle>
                    <AlertDialogDescription className="mt-4 text-gray-600">
                        Are you absolutely sure you want to delete this airdrop?
                        This action cannot be undone and will permanently remove
                        your airdrop data from our servers.
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
                        Delete Airdrop
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAirdrop;
