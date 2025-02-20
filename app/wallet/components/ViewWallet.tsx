import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ViewWalletSkeleton } from "./skeleton/ViewWalletSkeleton";
import { Copy } from "lucide-react";
import { Wallets } from "@/lib/type/Wallets";

type WalletViewActionsProps = {
    walletId: string;
    openViewWallet: boolean;
    onOpenChange: (openViewWallet: boolean) => void;
};

interface Wallet extends Wallets {
    wallet: {
        name: string;
        address: string;
    };
}

const ViewWallet: React.FC<WalletViewActionsProps> = ({
    walletId,
    openViewWallet,
    onOpenChange,
}) => {
    const [walletData, setWalletData] = useState<Wallet | null>(null);

    useEffect(() => {
        if (openViewWallet) {
            const handleView = async () => {
                try {
                    const response = await fetch(
                        `/api/wallet/read/${walletId}`,
                        {
                            method: "GET",
                        }
                    );
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(
                            errorData.error || "Failed to view wallet"
                        );
                    }
                    const data = await response.json();
                    setWalletData(data);
                } catch (error) {
                    console.error("Error viewing wallet:", error);
                }
            };
            handleView();
        }
    }, [openViewWallet, walletId]);

    const handleCopyAddress = async () => {
        if (walletData?.address) {
            await navigator.clipboard.writeText(walletData.address);
        }
    };

    const wallet = walletData?.wallet;

    return (
        <Dialog open={openViewWallet} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        View Wallet Details
                    </DialogTitle>
                    <Separator className="my-4" />
                </DialogHeader>
                {wallet ? (
                    <div className="space-y-4">
                        <Card className="border-none shadow-none">
                            <CardContent className="space-y-4 p-0">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-500">
                                        Wallet Name
                                    </label>
                                    <div className="text-base font-medium">
                                        {wallet.name}
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-500">
                                        Wallet Address
                                    </label>
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                        <div className="text-sm font-mono truncate flex-1">
                                            {wallet.address}
                                        </div>
                                        <button
                                            onClick={handleCopyAddress}
                                            className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                                        >
                                            <Copy className="h-4 w-4 text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <ViewWalletSkeleton />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ViewWallet;
