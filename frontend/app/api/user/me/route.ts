import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return NextResponse.json(
            { message: "Unauthorized - silakan login terlebih dahulu" },
            { status: 401 }
        );
    }  

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: `accessToken=${accessToken}`,
                },
                credentials: "include",
            }
        );
        const data = await res.json().catch(() => ({}));

        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Get user me error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}