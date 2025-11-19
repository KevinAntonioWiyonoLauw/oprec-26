import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 }
      );
    }

    // Call backend API
    const response = await fetch(`${backendUrl}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { error: (data as any).message || "Failed to reset password" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: (data as any).message || "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error (frontend route):", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}