import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const body = await req.json();
    const { name, address, check_extension, check_application } = body;
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?.email) {
        return NextResponse.json(
            { error: "Not Authenticated" },
            { status: 401 }
        );
    }

    const result = await prisma.wallets.create({
        data: {
            name: name,
            address: address,
            check_extension: check_extension,
            check_application: check_application,
            user: { connect: { email: session.user.email } },
        },
    });

    return NextResponse.json(result);
};
