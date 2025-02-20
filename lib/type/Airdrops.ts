import { Wallets } from "@/lib/type/Wallets";
import { Tag } from "@/lib/type/Tags";
export interface Airdrops {
    id: string;
    userId: string;
    walletId: string;
    wallet: Wallets;
    nameProject: string;
    linkProject: string | null;
    linkAirdrop: string | null;
    descAirdrop: string | null;
    created_at: Date;
    updated_at: Date;
    tags: Tag[];
}
