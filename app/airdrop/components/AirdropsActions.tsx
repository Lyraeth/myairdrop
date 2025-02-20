import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import ViewAirdrop from "@/app/airdrop/components/ViewAirdrop";
// import DeleteAirdrop from "@/app/airdrop/components/DeleteAirdrop";
import { Eye, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AirdropActionsProps = {
    airdropId: string;
};

const AirdropsActions: React.FC<AirdropActionsProps> = ({ airdropId }) => {
    // const [deleteAirdropOpen, setDeleteAirdropOpen] = useState(false);
    const [viewAirdropOpen, setViewAirdropOpen] = useState(false);

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
                    <DropdownMenuItem onClick={() => setViewAirdropOpen(true)}>
                        <Eye className="w-2 h-2" />
                        View airdrop
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem
                        onClick={() => setDeleteAirdropOpen(true)}
                    >
                        <Trash2 className="w-2 h-2" />
                        Delete airdrop
                    </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>

            {viewAirdropOpen && (
                <ViewAirdrop
                    airdropId={airdropId}
                    openViewAirdrop={viewAirdropOpen}
                    onOpenChange={setViewAirdropOpen}
                />
            )}

            {/* {deleteAirdropOpen && (
                <DeleteAirdrop
                    airdropId={airdropId}
                    openDeleteAirdrop={deleteAirdropOpen}
                    onOpenChange={setDeleteAirdropOpen}
                />
            )} */}
        </>
    );
};

export default AirdropsActions;
