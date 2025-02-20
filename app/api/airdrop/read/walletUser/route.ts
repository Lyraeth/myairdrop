import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const wallets = await prisma.wallets.findMany({
            select: {
                name: true,
                address: true,
            },
        });
        return NextResponse.json(wallets);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch wallets" },
            { status: 500 }
        );
    }
}
