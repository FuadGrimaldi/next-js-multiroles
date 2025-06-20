import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "http://172.20.10.2/lampu";

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  // Ambil parameter query string dari URL
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");

  // Validasi parameter
  if (!state) {
    return NextResponse.json(
      { message: "Missing parameters" },
      { status: 400 }
    );
  }

  try {
    const ESP32_URL = `${BASE_URL}/${params.productId}`;

    const response = await axios.get(ESP32_URL, {
      params: { state },
    });

    // Kirim respons sukses menggunakan NextResponse
    return NextResponse.json({ message: response.data }, { status: 200 });
  } catch (error: any) {
    // Kirim respons gagal menggunakan NextResponse
    return NextResponse.json(
      { message: `Error controling lamp  ${error}` },
      { status: 500 }
    );
  }
}
