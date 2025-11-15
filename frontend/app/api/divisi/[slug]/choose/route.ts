import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/divisi/${params.slug}/choose`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );

    const data = await res.json().catch(() => ({}));

    // Forward cookies from backend to frontend
    const response = NextResponse.json(data, { status: res.status });
    
    // Get Set-Cookie headers from backend response
    const setCookieHeaders = res.headers.getSetCookie();
    
    // Forward each cookie to the client
    setCookieHeaders.forEach((cookie) => {
      response.headers.append("Set-Cookie", cookie);
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
