import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Wallets, columns } from "@/app/wallet/columns";
import { DataTable } from "@/app/wallet/data-table";
import AppBreadcrumb from "@/components/breadcrumb";
import PageTransition from "@/app/components/motion/PageTransition";
import { getServerSession } from "next-auth";

async function getData(): Promise<Wallets[]> {
    const session = await getServerSession(authOptions);

    if (!session) {
        return [];
    }

    const data = await prisma.wallets.findMany({
        where: {
            user: { email: session?.user?.email },
        },
    });

    return data.map((wallet) => ({
        ...wallet,
        address: wallet.address ?? "[No Address]",
    }));
}

export default async function Wallet() {
    const data = await getData();
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <main className="flex justify-center items-center mt-20">
                <h1>You need to be authenticated to view this page.</h1>
            </main>
        );
    }

    return (
        <PageTransition>
            <main className="container mx-auto py-5 px-5">
                <AppBreadcrumb />
                <DataTable columns={columns} data={data} />
            </main>
        </PageTransition>
    );
}
