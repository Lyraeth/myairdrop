import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
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
        const result = await prisma.wallets.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { error: "Wallet not found" },
            { status: 404 }
        );
    }
}
