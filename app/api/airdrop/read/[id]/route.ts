import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?.email) {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        );
    }

    try {
        const result = await prisma.airdrops.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                nameProject: true,
                linkProject: true, 
                linkAirdrop: true,
                descAirdrop: true,
                created_at: true,
                updated_at: true,
                wallet: {
                    select: {
                        name: true,
                        address: true,
                    },
                },
                tags: {
                    include: {
                        tag: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json({
            ...result,
            tags: result?.tags.map((t) => ({
                id: t.tag.id,
                name: t.tag.name,
            })),
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Airdrop not found" },
            { status: 404 }
        );
    }
}
