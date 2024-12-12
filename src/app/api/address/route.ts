import { NextResponse } from "next/server";
import {
  retrieveDataById,
  retrieveData,
  userAddress,
} from "@/lib/firebase/addressService";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    // Ambil parameter id dari URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Validasi id
    if (id) {
      const userProfile = await userAddress("address", id);
      if (userProfile) {
        return NextResponse.json({
          status: 200,
          message: "success",
          data: userProfile,
        });
      }
    }
    return NextResponse.json({
      status: 404,
      message: "Not Found",
      data: null,
    });
  } catch (error) {
    // Tangani error
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching user profile" },
      { status: 500 } // Internal Server Error
    );
  }
};
