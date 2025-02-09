import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { Wallets, columns } from "./columns";
import { DataTable } from "./data-table";
import AppBreadcrumb from "@/components/breadcrumb";

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

    return data;
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
        <main className="container mx-auto py-5 px-5">
            <AppBreadcrumb />
            <DataTable columns={columns} data={data} />
        </main>
    );
}
