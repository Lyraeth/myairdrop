import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const {
        walletId,
        nameProject,
        linkProject,
        linkAirdrop,
        descAirdrop,
        tags,
    } = body;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json(
            { error: "Not Authenticated" },
            { status: 401 }
        );
    }

    const tagArray = Array.isArray(tags)
        ? tags
        : tags.split(",").map((tag: string) => tag.trim());

    try {
        await prisma.airdrops.create({
            data: {
                nameProject: nameProject,
                linkProject: linkProject,
                linkAirdrop: linkAirdrop,
                descAirdrop: descAirdrop,
                user: {
                    connect: {
                        email: session.user.email,
                    },
                },
                wallet: {
                    connect: {
                        id: walletId,
                    },
                },
                tags: {
                    create: tagArray.map((tagName: string) => ({
                        tag: {
                            connectOrCreate: {
                                where: { name: tagName },
                                create: { name: tagName },
                            },
                        },
                    })),
                },
            },
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            { error: "Failed to create airdrop", details: errorMessage },
            { status: 500 }
        );
    }
    return NextResponse.json({ message: "Create wallet success!" });
}
