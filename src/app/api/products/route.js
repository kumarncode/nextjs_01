import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { Product } from "@/app/lib/model/product";
//import { Product } from "@/app/lib/model/product";

export async function GET(request) {
  try {
    await mongoose.connect(connectionStr);
    const data = await Product.find().lean();
    console.log("GET /api/products data:", data);
    return NextResponse.json({ result: data,message:"Products retrieved successfully" }, { status: 200 });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to connect to database" },
      { status: 500 }
    );
  }
}