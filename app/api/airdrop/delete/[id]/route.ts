import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?.email) {
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 404 }
        );
    }

    try {
        await prisma.airdrops.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json({ message: "Delete airdrop success" });
    } catch (error) {
        return NextResponse.json({ message: `Error ${error}` });
    }
}
