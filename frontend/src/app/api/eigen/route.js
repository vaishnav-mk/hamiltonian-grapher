import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { terms } = await req.json();
    const iterations = req.nextUrl.searchParams.get("iterations");

    const response = await fetch(
      `http://127.0.0.1:8000/eigen?iterations=${iterations}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ terms }),
      }
    );

    const res = await response.json();

    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
  }
}
