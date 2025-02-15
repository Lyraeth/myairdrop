import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    const body = await request.json();
    const { name, address, check_extension, check_application } = body;
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        );
    }

    try {
        const result = await prisma.wallets.update({
            where: {
                id: Number(id),
            },
            data: {
                name: name,
                address: address,
                check_extension: check_extension,
                check_application: check_application,
            },
        });
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error updating wallet:", error);
        return NextResponse.json(
            { error: "Wallet not found" },
            { status: 404 }
        );
    }
}
