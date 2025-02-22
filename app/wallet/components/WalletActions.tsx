import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import ViewWallet from "@/app/wallet/components/ViewWallet";
import EditWallet from "@/app/wallet/components/EditWallet";
import DeleteWallet from "@/app/wallet/components/DeleteWallet";
import { Eye, Copy, Edit, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type WalletActionsProps = {
    walletId: string;
    address: string;
};

const WalletActions: React.FC<WalletActionsProps> = ({ walletId, address }) => {
    const [viewWalletOpen, setViewWalletOpen] = useState(false);
    const [openDeleteWallet, setOpenDeleteWallet] = useState(false);
    const [openEditViewWallet, setopenEditViewWallet] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(address)}
                    >
                        <Copy className="w-2 h-2" />
                        Copy address wallet
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setViewWalletOpen(true)}>
                        <Eye className="w-2 h-2" />
                        View wallet
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setopenEditViewWallet(true)}
                    >
                        <Edit className="w-2 h-2" />
                        Edit wallet
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpenDeleteWallet(true)}>
                        <Trash2 className="w-2 h-2" />
                        Delete wallet
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {viewWalletOpen && (
                <ViewWallet
                    walletId={walletId}
                    openViewWallet={viewWalletOpen}
                    onOpenChange={setViewWalletOpen}
                />
            )}

            {openDeleteWallet && (
                <DeleteWallet
                    walletId={walletId}
                    openDeleteWallet={openDeleteWallet}
                    onOpenChange={setOpenDeleteWallet}
                />
            )}

            {openEditViewWallet && (
                <EditWallet
                    walletId={walletId}
                    openEditWallet={openEditViewWallet}
                    onOpenEditChange={setopenEditViewWallet}
                />
            )}
        </>
    );
};

export default WalletActions;
