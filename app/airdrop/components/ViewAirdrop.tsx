import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Airdrops } from "@/lib/type/Airdrops";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import ViewAirdropSkeleton from "@/app/airdrop/components/skeleton/ViewAirdropSkeleton";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type AirdropViewActionsProps = {
    airdropId: string;
    openViewAirdrop: boolean;
    onOpenViewChange: (openViewAirdrop: boolean) => void;
};

const ViewAirdrop: React.FC<AirdropViewActionsProps> = ({
    airdropId,
    openViewAirdrop,
    onOpenViewChange,
}) => {
    const [airdropData, setAirdropData] = useState<Airdrops | null>(null);

    useEffect(() => {
        if (openViewAirdrop) {
            const handleView = async () => {
                try {
                    const response = await fetch(
                        `/api/airdrop/read/${airdropId}`,
                        {
                            method: "GET",
                        }
                    );
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(
                            errorData.error || "Failed to view airdrop"
                        );
                    }
                    const data = await response.json();
                    setAirdropData(data);
                } catch (error) {
                    console.error("Error viewing airdrop:", error);
                }
            };
            handleView();
        }
    }, [openViewAirdrop, airdropId]);

    return (
        <Dialog open={openViewAirdrop} onOpenChange={onOpenViewChange}>
            <DialogContent className="sm:max-w-[425px] md:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        View Airdrop Details
                    </DialogTitle>
                    <Separator className="my-4" />
                </DialogHeader>
                {airdropData ? (
                    <div className="space-y-4">
                        <Card className="border-none shadow-none">
                            <CardContent className="space-y-4 p-0">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-500">
                                        Airdrop Name
                                    </label>
                                    <div className="text-sm">
                                        {airdropData.nameProject}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-500">
                                        Wallet Address
                                    </label>
                                    <div className="text-sm">
                                        {airdropData.wallet.address}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-500">
                                        Wallet Name
                                    </label>
                                    <div className="text-sm">
                                        {airdropData.wallet.name}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-500">
                                        Link Website
                                    </label>
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                        {airdropData.linkProject ? (
                                            <>
                                                <div className="text-sm flex-1">
                                                    {airdropData.linkProject}
                                                </div>
                                                <Link
                                                    href={
                                                        airdropData.linkProject
                                                    }
                                                    target="_blank"
                                                    className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                                                >
                                                    <ArrowRight className="h-4 w-4 text-gray-500" />
                                                </Link>
                                            </>
                                        ) : (
                                            "???"
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-500">
                                        Link Airdrop
                                    </label>
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                        {airdropData.linkAirdrop ? (
                                            <>
                                                <div className="text-sm flex-1">
                                                    {airdropData.linkAirdrop}
                                                </div>
                                                <Link
                                                    href={
                                                        airdropData.linkAirdrop
                                                    }
                                                    target="_blank"
                                                    className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                                                >
                                                    <ArrowRight className="h-4 w-4 text-gray-500" />
                                                </Link>
                                            </>
                                        ) : (
                                            "???"
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-500">
                                        Tags
                                    </label>
                                    <div className="flex gap-1 text-sm">
                                        {airdropData.tags.map((tag) => (
                                            <Badge
                                                key={tag.id}
                                                className="bg-gray-400 text-black"
                                            >
                                                {tag.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-500">
                                        Description
                                    </label>
                                    <div className="text-sm">
                                        {airdropData.descAirdrop}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <ViewAirdropSkeleton />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ViewAirdrop;
