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

type WalletViewActionsProps = {
    walletId: number;
    openViewWallet: boolean;
    onOpenChange: (openViewWallet: boolean) => void;
};

type Wallet = {
    id: number;
    userId: string;
    name: string;
    address: string;
    check_extension: boolean;
    check_application: boolean;
};

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

    return (
        <Dialog open={openViewWallet} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        View Wallet Details
                    </DialogTitle>
                    <Separator className="my-4" />
                </DialogHeader>
                {walletData ? (
                    <div className="space-y-4">
                        <Card className="border-none shadow-none">
                            <CardContent className="space-y-4 p-0">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-500">
                                        Wallet Name
                                    </label>
                                    <div className="text-base font-medium">
                                        {walletData.name}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-500">
                                        Wallet Address
                                    </label>
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                        <div className="text-sm font-mono truncate flex-1">
                                            {walletData.address}
                                        </div>
                                        <button
                                            onClick={handleCopyAddress}
                                            className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                                        >
                                            <Copy className="h-4 w-4 text-gray-500" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-500">
                                            Extension
                                        </label>
                                        <div className="flex items-center">
                                            <div
                                                className={`w-2 h-2 rounded-full mr-2 ${
                                                    walletData.check_extension
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            />
                                            <span className="text-sm">
                                                {walletData.check_extension
                                                    ? "Enabled"
                                                    : "Disabled"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-500">
                                            Application
                                        </label>
                                        <div className="flex items-center">
                                            <div
                                                className={`w-2 h-2 rounded-full mr-2 ${
                                                    walletData.check_application
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            />
                                            <span className="text-sm">
                                                {walletData.check_application
                                                    ? "Enabled"
                                                    : "Disabled"}
                                            </span>
                                        </div>
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
