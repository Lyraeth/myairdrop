import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
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
                id: id,
            },
        });
        return NextResponse.json({
            message: "Delete wallet success!",
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Wallet not found or already deleted" },
            { status: 404 }
        );
    }
}
