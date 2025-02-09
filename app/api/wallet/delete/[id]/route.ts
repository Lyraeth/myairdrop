import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        );
    }

    try {
        const result = await prisma.wallets.delete({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { error: "Wallet not found or already deleted" },
            { status: 404 }
        );
    }
};

